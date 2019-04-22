<template>
    <div>
        <loading :active.sync="isLoading" ></loading>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <router-link to="/admin/dashboard">首頁</router-link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">優惠券管理</li>
            </ol>
        </nav>
        <div class="text-right">
            <button class="btn btn-primary" @click="openModal(true)">建立新的優惠券</button>
        </div>
        <table class="table mt-4">
            <thead>
                <tr>
                    <th>名稱</th>
                    <th width="120">折扣百分比</th>
                    <th width="120">到期日</th>
                    <th width="120">是否啟用</th>
                    <th width="80">編輯</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in coupons" :key="item.id">
                    <td>{{ item.title }}</td>
                    <td>{{ item.percent }}</td>
                    <td>
                        {{ dateFormat(item.due_date) }}
                    </td>
                    <td>
                        <span class="text-success" v-if="item.is_enabled">啟用</span>
                        <span v-else>未啟用</span>
                    </td>
                    <td>
                        <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
                            <button class="btn btn-outline-primary" @click="openModal(false, item)">編輯</button>
                            <button type="button" class="btn btn-danger" @click="openDeleteModal(item)">刪除</button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item" :class="{'disabled': !pagination.has_pre}"><a class="page-link" href="#" @click.prevent="getCoupons(pagination.current_page - 1)">Previous</a></li>
                <li class="page-item" v-for="page in pagination.total_pages" :class="{'active': page === pagination.current_page}" :key="page">
                    <a class="page-link" href="#" @click.prevent="getCoupons(page)">{{ page }}</a>
                </li>
                <li class="page-item" :class="{'disabled': !pagination.has_next}">
                    <a class="page-link" href="#" @click.prevent="getCoupons(pagination.current_page + 1)">Next</a>
                </li>
            </ul>
        </nav>

        <div class="modal fade" id="couponModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content border-0">
                    <div class="modal-header bg-dark text-white">
                        <h5 class="modal-title" id="exampleModalLabel">
                            <span v-if="isNew">新增優惠券</span>
                            <span v-else>編輯優惠券 - {{ tempCoupon.title }}</span>
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <label for="title">標題</label>
                                    <input type="text" class="form-control" name="title" id="title" placeholder="請輸入標題" v-model="tempCoupon.title" v-validate="'required'" :class="{'is-invalid': errors.has('title')}">
                                    <span class="text-danger" v-if="errors.has('title')">
                                        請輸入標題
                                    </span>

                                </div>
                                <div class="form-group">
                                    <label for="title">優惠碼</label>
                                    <input type="text" class="form-control" name="code" id="title" v-validate="'required'" :class="{'is-invalid': errors.has('code')}" placeholder="請輸入優惠碼" v-model="tempCoupon.code">
                                    <span class="text-danger" v-if="errors.has('code')">
                                        請輸入優惠碼
                                    </span>
                                </div>
                                <div class="form-group">
                                    <label for="due_date">到期日</label>
                                    <Datepicker :bootstrap-styling="true" :language="zh" :format="format" v-model="tempCoupon.tempDate"  > -->
                                    </Datepicker>
                                    <!-- <input type="date" class="form-control" id="due_date" placeholder="請輸入到期日" v-model="tempCoupon.due_date" > -->
                                </div>
                                <div class="form-group">
                                    <label for="percent">折扣百分比</label>
                                    <input type="number" class="form-control" name="percent" id="percent" placeholder="" v-model="tempCoupon.percent" v-validate="'required'" :class="{'is-invalid': errors.has('percent')}" placeholder="請輸入優惠碼">
                                    <span class="text-danger" v-if="errors.has('percent')">
                                        請輸入折扣百分比
                                    </span>
                                </div>
                                <div class="form-group">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="is_enabled" v-model="tempCoupon.is_enabled" :true-value="1" :false-value="0">
                                        <label class="form-check-label" for="is_enabled">
                                            是否啟用
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click="updateCoupon">確認</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="delCouponModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content border-0">
                    <div class="modal-header bg-danger text-white">
                        <h5 class="modal-title" id="exampleModalLabel">
                            <span>刪除優惠券 - {{ tempCoupon.title }} </span>
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        是否刪除 <strong class="text-danger">{{ tempCoupon.title }}</strong> 商品(刪除後將無法恢復)。
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-danger" @click.prevent="deleteProduct">確認刪除</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery';
    import Pagination from './Pagination';
    import Datepicker from 'vuejs-datepicker';
    import { zh } from 'vuejs-datepicker/dist/locale'
    // import moment from 'moment';
    const moment = require('moment');

    export default {
        data() {
            return {
                coupons: [],
                tempCoupon: {},
                pagination: {},
                isNew: false,
                isLoading: false,
                zh: zh,
                format: 'yyyy/MM/dd',
                date: new Date(2015, 6, 12)
            }
        },
        components: {
            Pagination,
            Datepicker
        },
        
        methods: {
            dateFormat(timestamp) {
                var date = new Date(timestamp * 1000);
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var day = date.getDate();
                return year + '/' + (month) + '/' + day;
            },

            getDateByTimestamp(timestamp) {
                if (timestamp == null) {
                    return '';
                } else {
                    var date = new Date(timestamp * 1000);
                    var year = date.getFullYear();
                    var month = date.getMonth();
                    var day = date.getDate();
                    return new Date(year, month, day);
                }
            },
            getDate() {
                return new Date(2016, 9, 16);
            },
            getCoupons(page = 1) {
                const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/admin/coupons?page=${page}`;
                const vm = this;
                vm.isLoading = true;
                this.$http.get(api).then((response) => {
                    vm.isLoading = false;
                    vm.coupons = response.data.coupons;
                    vm.pagination = response.data.pagination;
                })
            },
            openModal(isNew, item) {
                const vm = this;
                if (isNew) {
                    this.tempCoupon = {};
                    this.isNew = true;
                } else {
                    this.tempCoupon = Object.assign({}, item);
                    this.tempCoupon.tempDate = vm.getDateByTimestamp(vm.tempCoupon.due_date);
                    this.isNew = false;
                }
                $('#couponModal').modal('show');
            },
            openDeleteModal(item) {
                this.tempCoupon = item;
                $('#delCouponModal').modal('show');
            },
            updateCoupon() {
                let api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/admin/coupon`;
                let httpMethod = 'post';
                const vm = this;
                if (!vm.isNew) {
                    httpMethod = 'put';
                    api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/admin/coupon/${vm.tempCoupon.id}`;
                }
                // console.log(typeof(vm.tempCoupon.due_date));
                vm.tempCoupon.due_date = new Date(vm.tempCoupon.tempDate).getTime() / 1000;
                console.log(vm.tempCoupon.due_date);
                this.$validator.validate().then((result) => {
                    if (result) {
                        this.$http[httpMethod](api, { data: vm.tempCoupon}).then((response) => {
                            console.log(response.data);
                            if (response.data.success) {

                                $('#couponModal').modal('hide');
                                vm.getCoupons();
                            }
                            else 
                            {
                                console.log('新增失敗');
                            }
                        })
                    }
                });

                
            },
            deleteProduct() {
                const vm = this;
                const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/admin/coupon/${vm.tempCoupon.id}`;
                this.$http.delete(api).then((response) => {
                    $('#delCouponModal').modal('hide');
                    vm.getCoupons();
                })
            },
            customFormatter(date) {
                return moment(date).format('MMMM Do YYYY, h:mm:ss a');
            }
        },
        created() {
            this.getCoupons();
        }
    }
</script>