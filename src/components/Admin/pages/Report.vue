<template>
    <div>
        <loading :active.sync="isLoading" ></loading>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <router-link to="/admin/dashboard">首頁</router-link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">Dashboard</li>
            </ol>
        </nav>
        <div class="container">
            <div class="row">
                
                <div class="col-md-4 ">
                    <div class="card">
                        <div class="card-header bg-info text-white font-weight-bold">
                            產品資料
                        </div>
                        <div class="card-body">
                            <p class="mb-0">產品筆數 : {{ products.length }} </p>
                        </div>
                    </div>
                    
                </div>
                <div class="col-md-4">

                </div>
            </div>

        </div>
        
    </div>
</template>

<script>
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
        methods: {
            getOrders(page = 1) {
                const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/admin/orders?page=${page}`;
                const vm = this;
                vm.isLoading = true;
                this.$http.get(api).then((response) => {
                    console.log(response.data);
                    vm.isLoading = false;
                    vm.orders = response.data.orders;
                    vm.pagination = response.data.pagination;
                })
            },
            getProducts(page = 1) {
                const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/products/all`;
                const vm = this;
                vm.isLoading = true;
                this.$http.get(api).then((response) => {
                    // console.log(response.data);
                    vm.isLoading = false;
                    vm.products = response.data.products;
                    vm.pagination = response.data.pagination;
                })
            },
        },
        created() {
            this.getProducts();
        }
    }
</script>