<template>
    <div>
        <div class="wrap">
            <loading :active.sync="isLoading"></loading>
            <header>
                <Navbar />
            </header>
            
            <main>
                <router-view></router-view>
            </main>
            <footer>
                <Footer />
            </footer>
            
        </div>
    </div>
</template>

<script>
    import Navbar from './Navbar';
    import Footer from './Footer';

    export default {
        components: {
            Navbar,
            Footer
        },
        computed: {
            isLoading() {
                return this.$store.state.isLoading;
            }
        },
    }
</script>