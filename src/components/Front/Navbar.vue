<template>
    <div>
        <header>
            <div class="container">
                <div class="topbar">
                    <router-link to="/" class="logo">
                        <h1>GameBase</h1>
                    </router-link>
                    <!-- <a href="index.html" class="logo">
                        <h1>GameBase</h1>
                    </a> -->
                    <router-link to="/cart" class="cart" id="cart">
                        <i class="fas fa-shopping-cart"></i>
                    </router-link>
                    <!-- <a href="cart.html" class="cart"> 
                        <i class="fas fa-shopping-cart"></i>
                    </a> -->
                </div>
            </div>
            <nav class="navbar">
                <div class="container">
                    <input id="show-menu" type="checkbox" name="" />
                    <label for="show-menu"><span class="icon-bar"> </span><span class="icon-bar"></span><span class="icon-bar"></span></label>
                    <ul class="navbar-nav">
                        <li>
                            <router-link to="/">首頁</router-link> 
                            <!-- <a href="index.html">首頁</a> -->
                        </li>
                        <li>
                            <router-link to="/products">遊戲列表</router-link>
                            <!-- <a href="products.html">遊戲列表</a> -->
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    </div>
</template>

<script>
    import $ from 'jquery';

    export default {
        data() {
            return {
                // cartData: {
                //     carts: []
                // },
            }
        },
        methods: {
            getCart() {
                const vm = this;
                vm.$store.dispatch('getCart');
                // const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/cart`;
                // vm.isLoading = true;
                // vm.$store.dispatch('updateLoading', true);
                // this.$http.get(api).then((response) => {
                //     console.log(response.data);
                //     // vm.isLoading = false;
                //     vm.$store.dispatch('updateLoading', false);
                //     vm.cartData = response.data.data;
                // })

            },
        },
        computed: {
            cartData() {
                return this.$store.state.cartData;
            }
        },
        watch: {
            cartData() {
                const vm = this;
                console.log('cartData', vm.cartData.carts.length);
                $('#cart').attr('cartCount', vm.cartData.carts.length);
            }
        },                        

        created() {
            this.getCart();
        }

        
    }
</script>

<style lang="scss">
    
</style>