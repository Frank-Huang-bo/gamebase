<template>
    <div>
        <div class="topbar">
            <div class="login-info"><span></span></div>
            <div class="toolbar ml-auto">
                <a href="#" @click.prevent="signout">
                    <i class="fas fa-sign-out-alt"></i>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            signout() {
                const api = `${process.env.API_PATH}/logout`;
                const vm = this;
                this.$http.post(api).then((response) => {
                    if (response.data.success) {
                        vm.$router.push('/login');
                    }
                })
            }
        }
    }
</script>