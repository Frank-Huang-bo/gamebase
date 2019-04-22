<template>
    <div>
        <div class="admin sidebar">
            <div class="logo d-flex justify-content-center align-items-center">
                <router-link to="/admin/dashboard">
                    <h1 class="h5">GameBase Manage</h1>
                </router-link>
            </div>
            <ul class="nav flex-column mt-3">
                <li class="nav-item mb-3">
                    <router-link class="nav-link active" to="/admin/dashboard">
                        <i class="fas fa-home"></i>
                        dashboard
                    </router-link>
                </li>
                <li class="nav-item mb-3">
                    <router-link class="nav-link" to="/admin/products">
                        <i class="fas fa-box-open"></i>
                        產品列表
                    </router-link>
                   
                </li>
                <li class="nav-item mb-3">

                    <router-link class="nav-link" to="/admin/orders">
                        <i class="fas fa-clipboard-list"></i>
                        訂單列表
                    </router-link>
                </li>
                <li class="nav-item mb-3">
                    <router-link class="nav-link" to="/admin/coupon">
                        <i class="fas fa-ticket-alt"></i>
                        優惠券
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                
            }
        }
    }
</script>