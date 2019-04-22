<template>
    <div>
        <div class="wrap">
            <header>
                <Sidebar />
            </header>
            <main class="main">
                <Topbar />
                <div class="content">
                    <Alert />
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="bg-white px-5 py-3 my-4">
                                    <router-view></router-view>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script>
    import Sidebar from './Sidebar';
    import Topbar from './Topbar';
    import Alert from './AlertMessage';

    export default {
        components: {
            Sidebar,
            Topbar,
            Alert,
        }
    }
</script>

<style lang="scss">
    

</style>