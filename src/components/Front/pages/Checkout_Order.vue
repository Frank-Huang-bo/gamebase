<template>
    <div>
        <div class="checkout my-5">
            <div class="container">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb custom-breadcrumb">
                        <li class="breadcrumb-item">
                            <router-link to="/">首頁</router-link>
                        </li>
                        <li class="breadcrumb-item">
                            <router-link to="/cart">購物車</router-link>
                        </li>
                        <li class="breadcrumb-item">
                            建立訂單
                        </li>
                    </ol>
                </nav>
                <div class="row">
                    <loading :active.sync="isLoading" ></loading>
                    <div class="col-md-8">
                        <form class="p-4" @submit.prevent="createOrder" style="background: #444444;">
                            <div class="form-group">
                                <label for="email" class="text-white">email</label>
                                <input id="email" type="email" name="email" placeholder="請輸入 email" class="form-control" v-validate="'required|email'" :class="{'is-invalid': errors.has('email')}" v-model="form.user.email" />
                                <span class="text-danger" v-if="errors.has('email')">
                                    {{ errors.first('email') }}
                                </span>

                            </div>
                            <div class="form-group">
                                <label for="name" class="text-white">收件人姓名</label>
                                <input id="name" type="text" name="name" placeholder="請輸入姓名" class="form-control" :class="{'is-invalid': errors.has('name')}" v-model="form.user.name" v-validate="'required'" />
                                <span class="text-danger" v-if="errors.has('name')">姓名必須輸入</span>
                            </div>
                            <div class="form-group">
                                <label for="tel" class="text-white">收件人電話</label>
                                <input id="tel" type="tel" name="tel" placeholder="請輸入電話" class="form-control" v-model="form.user.tel" v-validate="'required'" :class="{'is-invalid': errors.has('tel')}" />
                                <span class="text-danger" v-if="errors.has('tel')">
                                    請輸入收件人電話
                                </span>
                            </div>
                            <div class="form-group">
                                <label for="address" class="text-white">收件人地址</label>
                                <input id="address" type="text" name="address" placeholder="請輸入地址" class="form-control" v-model="form.user.address" v-validate="'required'" :class="{'is-invalid': errors.has('address')}" />
                                <span class="text-danger" v-if="errors.has('address')">
                                    請輸入收件人地址
                                </span>
                            </div>
                            <div class="form-group">
                                <label for="comment" class="text-white">留言</label>
                                <textarea id="comment" name="comment" rows="5" class="form-control" v-model="form.message"></textarea>
                            </div>
                            <button class="btn add-to-cart-btn">送出訂單</button>
                        </form>
                    </div>
                    <div class="col-md-4 mt-2 mt-md-0">
                        <div class="item-panel">
                            <div class="item-panel-header">購物金額</div>
                            <div class="item-panel-body">
                                <template v-if="cartData.total">
                                    <div class="d-flex justify-content-between mb-3"><span>小計</span><span>{{ cartData.total | currency }}</span></div>
                                    <div class="d-flex justify-content-between">
                                        <span class="font-weight-bold">總金額</span>
                                        <span class="font-weight-bold" :class="{'line-through': cartData.total !== cartData.final_total}">{{ cartData.total
                                            | currency }}</span>
                                    </div>
                                    <div class="d-flex justify-content-between mt-3" v-if="cartData.total !== cartData.final_total">
                                        <span class="font-weight-bold text-success">折扣</span>
                                        <span class="font-weight-bold text-success">{{ cartData.final_total | currency }}</span>
                                    </div>
                                </template>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    user: {
                        name: '',
                        email: '',
                        tel: '',
                        address: '',
                    },
                    message: '',
                },
                isLoading: false,
                cartData: {
                    carts: []
                },
            }
        },
        methods: {
            createOrder() {
                const vm = this;
                const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/order`;
                vm.isLoading = true;
                this.$validator.validate().then((result) => {
                    if (result) {
                        const order = vm.form;
                        this.$http.post(api, { data: order }).then((response) => {
                            if (response.data.success) {
                                this.$store.dispatch('getCart');
                                vm.$router.push(`/checkout_pay/${response.data.orderId}`);
                            }
                            console.log('訂單已建立', response.data);
                            vm.isLoading = false;
                        })
                    } else {
                        vm.isLoading = false;
                        console.log('欄位不完整');
                    }
                });
                
            },
            getCart() {
                // this.$store.dispatch('getCart');
                const vm = this;
                const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/cart`;
                vm.isLoading = true;
                this.$http.get(api).then((response) => {
                    console.log(response.data);
                    vm.isLoading = false;
                    vm.cartData = response.data.data;
                })
            },
        },
        computed: {
            // cartData() {
            //     return this.$store.state.cartData;
            // }
        },
        created() {
            this.getCart();
        }
    }
</script>