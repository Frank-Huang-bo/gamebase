<template>
    <div>
        <loading :active.sync="isLoading" ></loading>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <router-link to="/admin/dashboard">首頁</router-link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">產品列表</li>
            </ol>
        </nav>
        <div class="text-right">
            <button class="btn btn-primary" @click="openModal(true)">建立新的產品</button>
        </div>
        <table class="table mt-4">
            <thead>
                <tr>
                    <th width="120">分類</th>
                    <th>產品名稱</th>
                    <th width="120">原價</th>
                    <th width="120">售價</th>
                    <th width="100">是否啟用</th>
                    <th width="80">編輯</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in products" :key="item.id">
                    <td>{{ item.category }}</td>
                    <td> {{ item.title }} </td>
                    <td class="text-right"> {{ item.origin_price | currency }} </td>
                    <td class="text-right"> {{ item.price | currency }} </td>
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
        <Pagination :pagination="pagination" v-on:acceptGetProducts="getProducts"/>
        
        <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content border-0">
                    <div class="modal-header bg-dark text-white">
                        <h5 class="modal-title" id="exampleModalLabel">
                            <span v-if="isNew">新增產品</span>
                            <span v-else>編輯產品 - {{ tempProduct.title }}</span>
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <label for="image">輸入圖片網址</label>
                                    <input type="text" class="form-control" id="image" placeholder="請輸入圖片連結" v-model="tempProduct.imageUrl">
                                </div>
                                <div class="form-group">
                                    <label for="customFile">或 上傳圖片
                                        <i class="fas fa-spinner fa-spin" v-if="status.fileUploading"></i>
                                    </label>
                                    <div class="custom-file">
                                        <input type="file" class="custom-file-input" id="customFile" ref="files" @change="uploadFile">
                                        <label class="custom-file-label" for="inputGroupFile01" >Choose file</label>
                                    </div>
                                    <!-- <input type="file" id="customFile" class="form-control" ref="files" @change="uploadFile"> -->
                                </div>
                                <img :src="tempProduct.imageUrl"
                                    class="img-fluid" alt="" v-model="tempProduct.imageUrl">
                            </div>
                            <div class="col-sm-8">
                                <div class="form-group">
                                    <label for="title">標題</label>
                                    <input type="text" class="form-control" name="title" id="title" v-validate="'required'" :class="{'is-invalid': errors.has('title')}" placeholder="請輸入標題" v-model="tempProduct.title">
                                    <span class="text-danger" v-if="errors.has('title')">
                                        請輸入標題
                                    </span>
                                </div>
        
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="category">分類</label>
                                        <input type="text" class="form-control" name="category" id="category" placeholder="請輸入分類" v-model="tempProduct.category" v-validate="'required'" :class="{'is-invalid': errors.has('category')}">
                                        <span class="text-danger" v-if="errors.has('category')">
                                            請輸入分類
                                        </span>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="unit">單位</label>
                                        <input type="text" class="form-control" name="unit" id="unit" placeholder="請輸入單位" v-model="tempProduct.unit" v-validate="'required'" :class="{'is-invalid': errors.has('unit')}">
                                        <span class="text-danger" v-if="errors.has('unit')">
                                            請輸入單位
                                        </span>
                                    </div>
                                </div>
        
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        
                                        <label for="origin_price">原價</label>
                                        <input type="number" class="form-control" name="origin_price" id="origin_price" placeholder="請輸入原價" v-model="tempProduct.origin_price" v-validate="'required'" :class="{'is-invalid': errors.has('origin_price')}">
                                        <span class="text-danger" v-if="errors.has('origin_price')">
                                            請輸入原價
                                        </span>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="price">售價</label>
                                        <input type="number" class="form-control" name="price" id="price" placeholder="請輸入售價" v-model="tempProduct.price" v-validate="'required'" :class="{'is-invalid': errors.has('price')}">
                                        <span class="text-danger" v-if="errors.has('price')">
                                            請輸入售價
                                        </span>

                                    </div>
                                </div>
                                <hr>
        
                                <div class="form-group">
                                    <label for="description">產品描述</label>
                                    <textarea type="text" class="form-control" name="description" id="description" placeholder="請輸入產品描述" v-model="tempProduct.description" v-validate="'required'" :class="{'is-invalid': errors.has('description')}"></textarea>
                                    <span class="text-danger" v-if="errors.has('description')">
                                        請輸入產品描述
                                    </span>
                                </div>
                                <div class="form-group">
                                    <label for="content">說明內容</label>
                                    <textarea type="text" class="form-control" name="content" id="content" placeholder="請輸入產品說明內容" v-model="tempProduct.content" v-validate="'required'" :class="{'is-invalid': errors.has('content')}"></textarea>
                                    <span class="text-danger" v-if="errors.has('content')">
                                        請輸入說明內容
                                    </span>
                                </div>
                                <div class="form-group">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="is_enabled" v-model="tempProduct.is_enabled" :true-value="1" :false-value="0">
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
                        <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="delProductModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content border-0">
                    <div class="modal-header bg-danger text-white">
                        <h5 class="modal-title" id="exampleModalLabel">
                            <span>刪除產品 - {{ tempProduct.title }} </span>
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        是否刪除 <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
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
    export default {
        data() {
            return {
                products: [],
                tempProduct: {},
                pagination: {},
                isNew: false,
                isLoading: false,
                status: {
                    fileUploading: false
                }
            }
        },
        components: {
            Pagination
        },
        methods: {
            getProducts(page = 1) {
                const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/admin/products?page=${page}`;
                const vm = this;
                vm.isLoading = true;
                this.$http.get(api).then((response) => {
                    console.log(response.data);
                    vm.isLoading = false;
                    vm.products = response.data.products;
                    vm.pagination = response.data.pagination;
                })
            },
            openModal(isNew, item) {
                if (isNew) {
                    this.tempProduct = {};
                    this.isNew = true;
                } else {
                    this.tempProduct = Object.assign({}, item);
                    this.isNew = false;
                }
                $('#productModal').modal('show');
            },
            openDeleteModal(item) {
                this.tempProduct = item;
                $('#delProductModal').modal('show');
            },
            updateProduct() {
                let api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/admin/product`;
                let httpMethod = 'post';
                const vm = this;
                if (!vm.isNew) {
                    httpMethod = 'put';
                    api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/admin/product/${vm.tempProduct.id}`;
                }
                this.$validator.validate().then((result) => {
                    if (result) {
                        this.$http[httpMethod](api, { data: vm.tempProduct}).then((response) => {
                            if (response.data.success) {
                                $('#productModal').modal('hide');
                                vm.getProducts();
                            }
                            else 
                            {
                                console.log('新增失敗');
                            }
                        })
                    } else {

                    }
                });
                    


                
            },
            deleteProduct() {
                const vm = this;
                const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/admin/product/${vm.tempProduct.id}`;
                this.$http.delete(api).then((response) => {
                    $('#delProductModal').modal('hide');
                    vm.getProducts();
                })
            },
            uploadFile() {
                const uploadFile = this.$refs.files.files[0];
                const vm = this;
                const formData = new FormData();
                formData.append('file-to-upload', uploadFile);
                const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/admin/upload`;
                vm.status.fileUploading = true;
                this.$http.post(api, formData, {
                    headers: {
                        'Content-type': 'multipart/form-data'
                    }
                }).then((response) => {
                    console.log(response.data);
                    vm.status.fileUploading = false;
                    if (response.data.success) {
                        // vm.tempProduct.imageUrl = response.data.imageUrl;
                        vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl);
                    } else {
                        this.$bus.$emit('message:push', response.data.message, 'danger');
                    }
                    console.log(response.data);
                })

            }
        },
        created() {
            this.getProducts();
        }
    }
</script>