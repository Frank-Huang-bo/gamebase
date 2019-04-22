<template>
    <div>

        <div class="products my-5">
            <loading :active.sync="isLoading" ></loading>
            <div class="container">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb custom-breadcrumb">
                        <li class="breadcrumb-item">
                            <router-link to="/">首頁</router-link>
                        </li>
                        <li class="breadcrumb-item">
                            產品列表
                        </li>
                    </ol>
                </nav>
                <div class="row">
                    <div class="col-md-10">
                        
                        <div class="row">
                            
                            <div class="col-md-4" v-for="item in filterdProducts" :key="item.id">
                                <div class="product">
                                    <div :style="`background-image: url(${item.imageUrl})`" class="product-body"></div>
                                    <div class="product-info">
                                        
                                        <router-link class="product-info-title" :to="{ name: 'ProductDetail', params: {id: item.id}}">
                                            {{ item.title }}
                                        </router-link>
                                        <!-- <a href="product-detail.html" class="product-info-title">
                                            {{ item.title }}
                                        </a> -->
                                        <div class="product-price">
                                            <template v-if="item.price">
                                                <span class="money">{{ item.price | currency }}</span>
                                                <span class="origin-money">{{ item.origin_price | currency }}</span>
                                            </template>
                                            <template v-else>
                                                <span class="money">{{ item.origin_price | currency }}</span>
                                            </template>                                        </div>
                                        <a href="#" class="btn add-to-cart-btn" @click.prevent="addToCart(item.id)">
                                            <span class="mr-3">加入購物車</span>
                                            <i class="far fa-arrow-alt-circle-right"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="col-12">
                                <!-- <nav>
                                    <ul class="product-pagination pagination justify-content-end">
                                        <li class="page-item" :class="{'disabled': !pagination.has_pre}"><a class="page-link" href="#" @click.prevent="getProducts(pagination.current_page - 1)">Previous</a></li>
                                        <li class="page-item" v-for="page in pagination.total_pages" :class="{'active': page === pagination.current_page}"
                                            :key="page">
                                            <a class="page-link" href="#" @click.prevent="getProducts(page)">{{ page }}</a>
                                        </li>
                                        <li class="page-item" :class="{'disabled': !pagination.has_next}">
                                            <a class="page-link" href="#" @click.prevent="getProducts(pagination.current_page + 1)">Next</a>
                                        </li>
                                    </ul>
                                </nav> -->
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2 sidebar">
                        <h2 class="category-title">產品分類</h2>
                        <ul class="category-list list-unstyled">
                            <li class="category-item">
                                <a href="#" @click.prevent="filter = ''" :class="{'active': filter== ''}" >全部</a>
                            </li>
                            <li class="category-item" v-for="(category, keyName, index) in categories" :key="index">
                                <a href="#" :class="{'active': filter== keyName}" @click.prevent="filter = keyName">{{ keyName }} ({{ category }})</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
                <!-- Modal -->
        <div class="modal fade" id="messageModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">您的物品已經加入購物車</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" @click.prevent="closeModal">關閉</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import $ from 'jquery';

    export default {
        data() {
            return {
                // products: [],
                isLoading: false,
                filter: '',
            }   
        },
        methods: {
            getProducts(page = 1) {
                // const api = `${${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/products/all`;
                // const vm = this;
                // vm.isLoading = true;
                // this.$http.get(api).then((response) => {
                //     // console.log(response.data);
                //     vm.isLoading = false;
                //     vm.products = response.data.products;
                //     vm.pagination = response.data.pagination;
                // })
                this.$store.dispatch('getProducts');
            },
            addToCart(id, qty = 1) {
                // const vm = this;
                // const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/cart`;
                // vm.isLoading = true;
                // const cart = {
                //     product_id: id,
                //     qty
                // }
                // this.$http.post(api, { data: cart }).then((response) => {
                //     console.log(response.data);
                //     vm.isLoading = false;
                //     $('#messageModal').modal('show');
                // })
                this.$store.dispatch('addToCart', {id, qty});
            },
            closeModal() {
                const vm = this;
                if (vm.isShowModal) {
                    vm.$store.dispatch('updateIsShowModal', false);
                    // $('#messageModal').modal('show');
                }
            }
        },
        computed: {
            products() {
                return this.$store.state.products;
            },
            categories() {
                const vm = this;
                const categories = new Set();
                const result = vm.products.reduce(function (temp, product) {
                    const category = product.category;
                    if (temp.hasOwnProperty(category)) {
                        temp[category]++;
                    } else {
                        temp[category] = 1;
                    }  
                    return temp;
                }, {});
                return result;
            },
            filterdProducts() {
                const vm = this;
                if (vm.filter === '') {
                    return vm.products; 
                } else {
                    const result = vm.products.filter(function(item, index, array) {
                        return item.category === vm.filter;
                    });
                    return result;
                }
            },
            isShowModal() {
                return this.$store.state.isShowModal;
            }
        },
        watch: {
            isShowModal() {
                const vm = this;
                if (vm.isShowModal) {
                    $('#messageModal').modal('show');
                }
            }
        },
        created() {
            this.getProducts();
            this.filter = this.$route.query.category || '';
        }
    }
</script>