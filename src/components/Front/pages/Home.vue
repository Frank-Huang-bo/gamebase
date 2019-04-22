<template>
    <div>
        <div class="home my-5">
            <!-- <loading :active.sync="isLoading"></loading> -->
            <div class="container">
                <div class="row">
                    <div class="col">
                        <div id="carouselExampleSlides2" data-ride="carousel" class="carousel slide">
                            <ol class="carousel-indicators">
                                <li data-target="#carouselExampleSlides2" data-slide-to="0" class="active"></li>
                                <li data-target="#carouselExampleSlides2" data-slide-to="1"></li>
                                <li data-target="#carouselExampleSlides2" data-slide-to="2"></li>
                            </ol>
                            <div class="carousel-inner">
                                <div class="carousel-item active">
                                    <img src="https://ksassets.timeincuk.net/wp/uploads/sites/54/2018/08/Res-Evil-2-key-art-Gamescom-01-920x475.jpg"
                                            alt="First slide" class="d-block w-100" /></div>
                                <div class="carousel-item"><img src="https://img.4gamers.com.tw/ckfinder/images/Zizi/Game/20160811-yakuza6prologue6.png"
                                        alt="Second slide" class="d-block w-100" /></div>
                                <div class="carousel-item"><img src="https://i.ytimg.com/vi/fZRjVHlLbXQ/maxresdefault.jpg"
                                        alt="Third slide" class="d-block w-100" /></div>
                            </div><a href="#carouselExampleSlides2" role="button" data-slide="prev" class="carousel-control-prev"><span
                                    aria-hidden="true" class="carousel-control-prev-icon"></span><span class="sr-only">Previous</span></a><a
                                href="#carouselExampleSlides2" role="button" data-slide="next" class="carousel-control-next"><span
                                    aria-hidden="true" class="carousel-control-next-icon"></span><span class="sr-only">Next</span></a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container mt-5 mb-3">
                <div class="row">
                    <div class="col-md-4">

                        <router-link :to="{ name: 'Products', query: { category: 'PS4' } }" class="category">
                            <div class="category-body"></div>
                            <div class="category-footer">
                                <span class="mr-3">PS4</span>
                                <i class="far fa-arrow-alt-circle-right"></i>
                            </div>
                        </router-link>
                    </div>
                    <div class="col-md-4">
                        <router-link :to="{ name: 'Products', query: { category: 'PC' } }" class="category">
                            <div style="background-image: url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ963tnmsT2T9odoRTDRwERpdsqwiTNDvsjPlRsCiGysz5NHNqh)"
                                class="category-body"></div>
                            <div class="category-footer">
                                <span class="mr-3">PC</span>
                                <i class="far fa-arrow-alt-circle-right"></i>
                            </div>
                        </router-link>
                    </div>
                    <div class="col-md-4">
                        <router-link :to="{ name: 'Products', query: { category: '懷舊遊戲' } }" class="category">
                            <div style="background-image: url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmtwRPddxvLikBBps8HtmIMO7N7iPsaipCVSH6oV8VQpXqcbO_PQ)"
                                class="category-body"></div>
                            <div class="category-footer"><span class="mr-3">懷舊小遊戲</span><i class="far fa-arrow-alt-circle-right"></i></div>
                        </router-link>
                    </div>
                    <div class="col-md-4">
                        <router-link :to="{ name: 'Products', query: { category: '恐怖遊戲' } }" class="category">
                            <div style="background-image: url(https://steamcdn-a.akamaihd.net/steam/apps/414700/header.jpg?t=1494442005)"
                                class="category-body"></div>
                            <div class="category-footer"><span class="mr-3">恐怖遊戲</span><i class="far fa-arrow-alt-circle-right"></i></div>
                        </router-link>
                    </div>
                    <div class="col-md-4">
                        <router-link :to="{ name: 'Products', query: { category: '經典遊戲' } }" class="category">
                            <div style="background-image: url(https://cdn.images.dailystar.co.uk/dynamic/184/photos/397000/620x/Final-Fantasy-7-Remake-Release-Date-PS4-gameplay-trailer-story-and-E3-2018-news-updates-663026.jpg)"
                                class="category-body"></div>
                            <div class="category-footer"><span class="mr-3">經典遊戲</span><i class="far fa-arrow-alt-circle-right"></i></div>
                        </router-link>
                    </div>
                    <div class="col-md-4">
                        <router-link :to="{ name: 'Products', query: { category: '近期發售' } }" class="category">
                            <div style="background-image: url(https://ksassets.timeincuk.net/wp/uploads/sites/54/2018/08/Res-Evil-2-key-art-Gamescom-01-920x475.jpg)"
                                class="category-body"></div>
                            <div class="category-footer"><span class="mr-3">近期發售</span><i class="far fa-arrow-alt-circle-right"></i></div>
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="container">
                <h2 class="mb-0 featured-title">熱門銷售</h2>
                <div class="row mt-4 mb-5">
                    <div class="col-md-4" v-for="(product, index) in products" :key="product.id" v-if="index < 3">
                        <div class="product">
                            <div :style="{backgroundImage: `url(${product.imageUrl})`}" class="product-body"></div>
                            <div class="product-info">
                                <router-link to="/products" class="product-info-title">
                                    {{ product.title }}
                                </router-link>
                                <div class="product-price">
                                    <template v-if="product.price">
                                        <span class="money">{{ product.price | currency }}</span>
                                        <span class="origin-money">{{ product.origin_price | currency }}</span>
                                    </template>
                                    <template v-else>
                                        <span class="money">{{ product.origin_price | currency }}</span>
                                    </template>
                                </div>
                                <button class="btn add-to-cart-btn" @click.prevent="addToCart(product.id)">
                                    <span class="mr-3">加入購物車</span>
                                    <i class="far fa-arrow-alt-circle-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <router-link class="btn see-more-product-btn" to="/products">
                    看更多遊戲 ....
                </router-link>
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
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="closeModal">關閉</button>
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
                // isLoading: false,
            }
        },
        methods: {
            getProducts(page = 1) {
                // const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/products?page=${page}`;
                const vm = this;
                // vm.isLoading = true;
                // vm.$store.state.isLoading = true;
                // vm.$store.dispatch('updateLoading', true);
                // this.$http.get(api).then((response) => {
                //     console.log(response.data);
                    // vm.isLoading = false;
                //     vm.$store.dispatch('updateLoading', false);
                //     vm.products = response.data.products;
                // })
                this.$store.dispatch('getProducts');
            },
            addToCart(id, qty = 1) {
                this.$store.dispatch('addToCart', {id, qty});
                // const vm = this;
                // const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/cart`;
                // // vm.isLoading = true;
                // vm.$store.dispatch('updateLoading', true);
                // const cart = {
                //     product_id: id,
                //     qty
                // }
                // this.$http.post(api, { data: cart }).then((response) => {
                //     console.log(response.data);
                //     // vm.isLoading = false;
                //     vm.$store.dispatch('updateLoading', false);
                //     $('#messageModal').modal('show');
                // })
            },
            closeModal() {
                const vm = this;
                if (vm.isShowModal) {
                    vm.$store.dispatch('updateIsShowModal', false);
                    // $('#messageModal').modal('show');
                }
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
        computed: {
            products() {
                return this.$store.state.products;
            },
            isShowModal() {
                return this.$store.state.isShowModal;
            }
        },
        created() {
            this.getProducts();
        }
    }
</script>