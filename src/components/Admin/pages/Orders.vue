<template>
    <div>
        <loading :active.sync="isLoading" ></loading>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <router-link to="/admin/dashboard">首頁</router-link>
                </li>
                <li class="breadcrumb-item active" aria-current="page">訂單列表</li>
            </ol>
        </nav>
        <table class="table mt-4">
            <thead>
                <tr>
                    <th width="120">購買時間</th>
                    <th width="120">Email</th>
                    <th >購買款項</th>
                    <th width="120">應付金額</th>
                    <th width="120">是否付款</th>
                    <th width="80">編輯</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in orders" :key="order.id">
                    <td>{{ dateFormat(order.create_at) }}</td>
                    <td>{{ order.user.email }}</td>
                    <td>{{ order.user.email }}</td>
                    <td>{{ order.total }}</td>
                    <td>
                        <span class="text-success" v-if="order.is_paid">已付款</span>
                        <span v-else>尚未付款</span>
                    </td>
                    <td>
                        <button type="button" class="btn btn-outline-primary btn-sm" data-dismiss="modal">編輯</button>

                    </td>
                </tr>
            </tbody>
        </table>
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item" :class="{'disabled': !pagination.has_pre}"><a class="page-link" href="#" @click.prevent="getOrders(pagination.current_page - 1)">Previous</a></li>
                <li class="page-item" v-for="page in pagination.total_pages" :class="{'active': page === pagination.current_page}"
                    :key="page">
                    <a class="page-link" href="#" @click.prevent="getOrders(page)">{{ page }}</a>
                </li>
                <li class="page-item" :class="{'disabled': !pagination.has_next}">
                    <a class="page-link" href="#" @click.prevent="getOrders(pagination.current_page + 1)">Next</a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
    export default {
        name: 'Coupons',
        data() {
            return {
                orders: [],
                pagination: {},
                isLoading: false,
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
            dateFormat(timestamp) {
                var date = new Date(timestamp * 1000);
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var day = date.getDate();
                return year + '/' + (month) + '/' + day;
            },
        },
        created() {
            this.getOrders();
        }
    }
</script>