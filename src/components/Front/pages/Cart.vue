<template>
    <div>
        <div class="cart my-5">
            <!-- <loading :active.sync="isLoading"></loading> -->
            <div class="container">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb custom-breadcrumb">
                        <li class="breadcrumb-item">
                            <router-link to="/">首頁</router-link>
                        </li>
                        <li class="breadcrumb-item">
                            購物車
                        </li>
                    </ol>
                </nav>
                <div class="cart-empty" v-if="cartData.carts.length == 0">
                    <p class="text-white">目前您的購物車沒有東西</p>
                </div>
                <div class="row" v-else>
                    <div class="col-md-8">
                        <ul class="cart-list list-unstyled">
                            <li class="cart-item" v-for="cart in cartData.carts" :key="cart.id">
                                <div class="cart-item-img" :style="{backgroundImage: `url(${cart.product.imageUrl})`}"></div>
                                
                                <div class="cart-item-info">
                                    <div class="cart-item-bar cart-item-border-bottom pb-3">
                                        <div class="cart-item-title">{{ cart.product.title }}</div>
                                        <!-- <button class="cart-item-delete"></button> -->
                                        <a href="#" class="cart-item-delete" @click.prevent="removeCartItem(cart.id)"><i
                                                class="fas fa-trash"></i></a>
                                    </div>
                                    <div class="cart-item-bar">
                                        <div class="cart-item-title">{{ cart.product.category }}</div>
                                    </div>
                                    <div class="cart-item-bar">
                                        <div class="cart-item-price">{{ cart.product.price | currency }}</div>
                                        <div class="cart-item-count"> <span>數量 {{ cart.qty }} 個</span></div>
                                    </div>
                                    <div class="cart-item-bar ml-auto">
                                        <div class="cart-item-price">{{ cart.final_total | currency }}</div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="col-md-4">
                        <div class="item-panel">
                            <div class="item-panel-header">購物金額</div>
                            <div class="item-panel-body">
                                <div class="d-flex justify-content-between mb-3"><span>小計</span><span>{{ cartData.total | currency }}</span></div>
                                <div class="d-flex justify-content-between">
                                    <span class="font-weight-bold">總金額</span>
                                    <span class="font-weight-bold" :class="{'line-through': cartData.total !== cartData.final_total}">{{ cartData.total | currency }}</span>
                                </div>
                                <div class="d-flex justify-content-between mt-3" v-if="cartData.total !== cartData.final_total">
                                    <span class="font-weight-bold text-success" >折扣</span>
                                    <span class="font-weight-bold text-success">{{ cartData.final_total | currency }}</span>
                                </div>
                                
                            </div>
                            <div class="item-panel-footer">
                                <div class="input-group mb-4">
                                    <input placeholder="請輸入優惠碼" class="form-control" v-model="coupon_code" />
                                    <button class="btn coupon-btn" @click.prevent="addCouponCode">套用優惠碼</button>
                                </div>
                                <router-link class="btn add-to-cart-btn mb-0" to="/checkout_order">結帳去</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="messageModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel" >{{ message.title }}</h5>
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
                cartData: {
                    carts: []
                },
                coupon_code: '',
                // isLoading: false,
                message: {
                    title: '',
                }
            }
        },
        methods: {
            getCart() {
                const vm = this;
                const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/cart`;
                vm.isLoading = true;
                this.$http.get(api).then((response) => {
                    console.log(response.data);
                    vm.isLoading = false;
                    vm.cartData = response.data.data;
                })
            },
            removeCartItem(id) {
                // const vm = this;
                // const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/cart/${id}`;
                // vm.isLoading = true;
                // this.$http.delete(api).then((response) => {
                //     console.log(response.data);
                //     vm.isLoading = false;
                //     vm.getCart();
                // })
                this.$store.dispatch('removeCartItem', id);
            },
            addCouponCode() {
                console.log('coupon');
                const vm = this;
                const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/coupon`;
                vm.isLoading = true;
                const coupon = {
                    code: vm.coupon_code
                }
                this.$http.post(api, { data: coupon }).then((response) => {
                    console.log(response.data);
                    vm.isLoading = false;
                    if (response.data.success) {
                        vm.message.title = '已成功使用優惠卷'
                        $('#messageModal').modal('show');
                    } else {
                        vm.message.title = response.data.message;
                        $('#messageModal').modal('show');
                    }
                    vm.getCart();
                })
            }
        },
        computed: {
            // cartData() {
                // return this.$store.state.cartData;
            //     return [];
            // }
        },
        created() {
            this.getCart();
        }
    }
</script>

<style lang="scss">
</style>