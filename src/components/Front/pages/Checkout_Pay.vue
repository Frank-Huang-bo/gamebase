<template>
    <div>
        <div class="checkout">
            <loading :active.sync="isLoading" ></loading>
            <div class="container">
                
                <div class="row mt-5 justify-content-center">
                    <div class="col-md-10">
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb custom-breadcrumb">
                                <li class="breadcrumb-item">
                                    <router-link to="/">首頁</router-link>
                                </li>
                                <li class="breadcrumb-item">
                                    <router-link to="/cart">購物車</router-link>
                                </li>
                                <li class="breadcrumb-item">
                                    結帳
                                </li>
                            </ol>
                        </nav>
                        <div class="accordion mb-3" id="accordionExample">
                            <div class="card border-0 ">
                                <div class="card-header bg-header rounded-0" id="headingOne">
                                    <h5 class="mb-0">
                                        <button class="btn btn-link p-0" type="button" data-toggle="collapse" data-target="#collapseOne"
                                            aria-expanded="true" aria-controls="collapseOne">
                                            購買清單
                                        </button>
                                    </h5>
                                </div>
                        
                                <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                                    <div class="card-body bg-body">
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">遊戲名稱</th>
                                                    <th scope="col" width="100">數量</th>
                                                    <th scope="col" width="100">單價</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="product in order.products" :key="product.id">
                                                    <td>{{ product.product.title }}</td>
                                                    <td>{{ product.qty }}/{{ product.product.unit }}</td>
                                                    <td>{{ product.product.price | currency }}</td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2" class="text-right">總計</td>
                                                    <td>{{ order.total | currency }}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card border-0 ">
                            <div class="card-header bg-header rounded-0 text-white">
                                填寫資料
                            </div>
                            <div class="card-body bg-body">
                                <table class="table">
                                    <tbody>
                                        <template v-if="order.user">
                                            <tr>
                                                <th width="130" class="font-weight-bold">Email</th>
                                                <td class="text-left">{{ order.user.email }}</td>
                                            </tr>
                                            <tr>
                                                <th width="130" class="font-weight-bold">姓名</th>
                                                <td class="text-left">{{ order.user.name }}</td>
                                            </tr>
                                            <tr>
                                                <th width="130" class="font-weight-bold">收件人電話</th>
                                                <td class="text-left">{{ order.user.tel }}</td>
                                            </tr>
                                            <tr>
                                                <th width="130" class="font-weight-bold">收件人地址</th>
                                                <td class="text-left">{{ order.user.address }}</td>
                                            </tr>
                                            <tr>
                                                <th width="130" class="font-weight-bold">付款狀態</th>
                                                <td class="text-left">
                                                    <span v-if="!order.is_paid">尚未付款</span>
                                                    <span v-else class="text-success">已經付款</span>
                                                </td>
                                            </tr>
                                        </template>
                                    </tbody>
                                </table>    
                            </div>
                        </div>
                        <button class="btn btn-primary mt-3 rounded-0 bg-success w-50" @click.prevent="payOrder">確認付款</button>
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
                orderId: '',
                cartData: {
                    carts: []
                },
                isLoading: false,
                order: {},
            }
        },
        methods: {
            getOrder() {
                const vm = this;
                const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/order/${vm.orderId}`;
                vm.isLoading = true;
                this.$http.get(api).then((response) => {
                    console.log(response.data);
                    vm.isLoading = false;
                    vm.order = response.data.order;
                })
            },
            getProduct(productId) {
                const vm = this;
                const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/product/${productId}`;
                this.$http.get(api).then((response) => {
                    return response.data.product;
                    // vm.order = response.data.order;
                })
            },
            payOrder() {
                const vm = this;
                const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/pay/${vm.orderId}`;
                vm.isLoading = true;
                this.$http.post(api).then((response) => {
                    console.log(response.data);
                    vm.isLoading = false;
                    vm.getOrder();
                })
            },
        },
        
        created() {
            this.orderId = this.$route.params.order_id;
            console.log(this.orderId);  
            this.getOrder();
            
        }
    }
</script>