<template>
    <div>
        <div class="wrap">
            <main>
                <div class="login-panel"></div>
                <div class="login-form p-5">
                    <h1>GameBase Manage Login</h1>
                    <form @submit.prevent="signin" >
                        <div class="form-group">
                            <label for="exampleInputEmail1">email</label>
                            <input id="exampleInputEmail1" aria-describedby="emailHelp" v-model="user.username"
                                placeholder="Enter email" type="email" class="form-control" />
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">密碼</label>
                            <input id="exampleInputPassword1" placeholder="Password" type="password" v-model="user.password"
                                class="form-control" />
                        </div>
                        <button type="submit" class="btn btn-primary">登入</button>
                    </form>
                </div>
            </main>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        data() {
            return {
                user: {
                    username: '',
                    password: ''
                }
            }
        },
        methods: {
            signin() {
                const api = `${process.env.API_PATH}/admin/signin`;
                const vm = this;
                this.$http.post(api, vm.user).then((response) => {
                    console.log(response.data);
                    if (response.data.success) {
                        vm.$router.push('/admin/dashboard');
                    }
                })
            },
        }
    }
</script>

<style scoped>
    .login-panel {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: url(https://images.unsplash.com/photo-1507457379470-08b800bebc67?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b69ccb54b9605ead6a49c6da0cbb007f&auto=format&fit=crop&w=1200&q=60);
            -webkit-filter: blur(3px);
        filter: blur(3px);
        background-size: cover;
        background-position: center center;
    }

    .login-form {
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        background: white;
        padding: 20px;
        border-radius: 5px;
    }
</style>