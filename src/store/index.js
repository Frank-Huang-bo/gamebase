import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,
    state: {
        isLoading: false,
        products: [],
        cartData: {
            carts: []
        },
        isShowModal: false,
    },
    actions: { 
        // 操作 ajax
        // 第二個是 payload 是外部傳入的參數
        updateLoading(context, status) { 
            context.commit('LOADING', status);
        },
        updateIsShowModal(context, status) {
            context.commit('IS_SHOW_MODAL', status);
        },
        getProducts(context, page = 1) {
            const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/products/all`;
            // const vm = this;
            // vm.isLoading = true;
            // vm.$store.state.isLoading = true;
            // vm.$store.dispatch('updateLoading', true);
            context.commit('LOADING', true);
            axios.get(api).then((response) => {
                // console.log(response.data);
                // vm.isLoading = false;
                // vm.$store.dispatch('updateLoading', false);
                context.commit('LOADING', false);
                context.commit('PRODUCTS', response.data.products);

                // vm.products = response.data.products;
            })
        },
        getCart(context) {
            const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/cart`;
            context.commit('LOADING', true);
            axios.get(api).then((response) => {
                console.log(response.data);
                context.commit('LOADING', false);
                context.commit('CART', response.data.data);
            })
        },
        getCart1(context) {
            const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/cart`;
            context.commit('LOADING', true);
            axios.get(api).then((response) => {
                console.log(response.data);
                context.commit('LOADING', false);
                context.commit('CART', response.data.data);
                context.commit('IS_SHOW_MODAL', true);

            })
        },
        addToCart(context, { id, qty = 1 }) {
            // const vm = this;
            const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/cart`;
            context.commit('LOADING', true);
            const cart = {
                product_id: id,
                qty
            }
            axios.post(api, { data: cart }).then((response) => {
                console.log(response.data);
                // vm.isLoading = false;
                context.commit('LOADING', false);
                context.dispatch('getCart1');
                // $('#messageModal').modal('show');
            })
        },
        removeCartItem(context, id) {
            // const vm = this;
            const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/cart/${id}`;
            // vm.isLoading = true;
            context.commit('LOADING', true);
            axios.delete(api).then((response) => {
                console.log(response.data);
                // vm.isLoading = false;
                context.commit('LOADING', false);
                context.dispatch('getCart1');
                // vm.getCart();
            })
        }
    },
    mutations: { // 操作資料狀態
        LOADING(state, status) {
            state.isLoading = status;
        },
        PRODUCTS(state, payload) {
            state.products = payload;
        },  
        CART(state, payload){
            state.cartData = payload;
        },
        IS_SHOW_MODAL(state, payload) {
            state.isShowModal = payload;
        }
    },
    getters: {

    }
});