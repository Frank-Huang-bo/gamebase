<template>
    <div>
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item" :class="{'disabled': !pagination.has_pre}"><a class="page-link" href="#" @click.prevent="getProducts(pagination.current_page - 1)">Previous</a></li>
                <li class="page-item" v-for="page in pagination.total_pages" :class="{'active': page === pagination.current_page}" :key="page">
                    <a class="page-link" href="#" @click.prevent="getProducts(page)">{{ page }}</a>
                </li>
                <li class="page-item" :class="{'disabled': !pagination.has_next}">
                    <a class="page-link" href="#" @click.prevent="getProducts(pagination.current_page + 1)">Next</a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                
            }
        },
        props: ['pagination'],
        methods: {
            getProducts(page) {
                this.$emit('acceptGetProducts', page);
            }
        }
    }
</script>