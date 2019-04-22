<template>
    <div>
        <div class="product-detail my-5">
            <loading :active.sync="isLoading"></loading>
            <div class="container">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb custom-breadcrumb">
                        <li class="breadcrumb-item">
                            <router-link to="/">首頁</router-link>
                        </li>
                        <li class="breadcrumb-item">
                            <router-link to="/products">遊戲列表</router-link>
                        </li>
                        <li class="breadcrumb-item">
                            {{ product.title }}
                        </li>
                    </ol>
                </nav>
                <div class="row">
                    <div class="col-md-9">
                        <div class="product-panel">
                            <div :style="{backgroundImage: `url(${product.imageUrl})`}" alt="" class="product-img"></div>
                            <div class="product-info">
                                <div class="product-title">{{ product.title }}</div>
                                <div class="product-price">
                                    <template v-if="product.price">
                                        <span class="money">{{ product.price | currency }}</span>
                                        <span class="origin-money">{{ product.origin_price | currency }}</span>
                                    </template>
                                    <template v-else>
                                        <span class="money">{{ product.origin_price | currency }}</span>
                                    </template>
                                </div>
                                <div class="product-qty"><span>購買數量</span>
                                    <select class="form-control product-qty-select" autocomplete="off" v-model="form.qty">
                                        <option value="" selected>請選擇數量</option>
                                        <option :value="num" v-for="num in 10" :key="num">
                                            選購 {{ num }} {{ product.unit }}  
                                        </option>
                                    </select>
                                </div>
                                <button class="btn add-to-cart-btn" @click.prevent="addToCart(product.id, product.num)">
                                    <span class="mr-3" >加入購物車</span>
                                </button>
                                <div class="product-content">
                                    <p>{{ product.description }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3 sidebar">
                        <h2 class="category-title">產品分類</h2>
                        <ul class="category-list list-unstyled">
                            <li class="category-item">
                                <a href="#">全部</a>
                            </li>

                            <li class="category-item" v-for="(category, keyName, index) in categories" :key="index">
                                <router-link to="/products" class="product-info-title">
                                    {{ keyName }} ({{category }})
                                </router-link>

                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
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
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">關閉</button>
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
                productId: '',
                products: [],
                product: {
                    num: 1,
                },
                form: {},
                isLoading: false,    
            }
        },
        methods: {
            getProduct() {
                const vm = this;
                const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/product/${vm.productId}`;
                vm.isLoading = true;
                this.$http.get(api).then((response) => {
                    console.log(response.data);
                    vm.isLoading = false;
                    vm.product = response.data.product;
                })
            },
            getProducts(page = 1) {
                const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/products/all`;
                const vm = this;
                vm.isLoading = true;
                this.$http.get(api).then((response) => {
                    console.log(response.data);
                    vm.isLoading = false;
                    vm.products = response.data.products;
                })
            },

            addToCart(id, qty = 1) {
                const vm = this;
                const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/cart`;
                vm.isLoading = true;
                const cart = {
                    product_id: id,
                    qty
                }
                this.$http.post(api, {data: cart}).then((response) => {
                    console.log(response.data);
                    vm.isLoading = false;
                    $('#messageModal').modal('show');
                })
            }
        },
        computed: {
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
        },
        created() {
            this.productId = this.$route.params.id;
            this.getProducts();
            this.getProduct();
            console.log(this.productId);
        }
    }
</script>