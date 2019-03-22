<template>
    <div class="Login">
        <div class="wrap">
            <h3 class="title">后台管理系统</h3>
            <div class="form">
                <Form ref="loginForm" :model="loginForm" :rules="loginRules">
                    <FormItem prop="username">
                        <Input type="text" v-model="loginForm.username" placeholder="用户名" @on-enter="_toLogin"></Input>
                    </FormItem>
                    <FormItem prop="password">
                        <Input type="password" v-model="loginForm.password" placeholder="密码" @on-enter="_toLogin"></Input>
                    </FormItem>
                    <FormItem> 
                        <Button type="primary" class="btn" @click="_toLogin">登录</Button>
                    </FormItem> 
                </Form>
            </div>
        </div>
    </div> 
</template> 
 
<script>
 
import { loginRules } from 'js/formRules'
import { login } from 'api/port'
import { ERR_OK } from 'api/config'

export default {
    data() {
        return {
            loginForm: {
                username:'',
                password:''
            },
            loginRules:loginRules
        }
    },
    methods:{
        _toLogin() {
            this.$refs.loginForm.validate((valid)=>{
                if(valid) {
                    let data = {
                        user_name:this.loginForm.username,
                        password:this.loginForm.password
                    }
                    login(data)
                        .then(res=>{
                            if(res.status === ERR_OK) {
                                this.$Notice.success({
                                    title:res.success
                                })
                                this.$router.push('/main')
                            } else {
                                this.$Notice.error({
                                    title:'登录失败'
                                })
                            }
                        })
                } 
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.Login {
    width:100%;
    height:100%; 
    background-color:#324057;
    padding:10% 0 0 0;
    .wrap {
        width:430px;
        margin:0 auto;
        .title {
            font-size:34px;
            color:#fff;
            font-weight: bold;
            text-align:center;
            margin-bottom:40px;
        }
        .form {
            background-color:#fff;
            width: 430px;
            padding:40px;
            border-radius: 8px;
            box-sizing: border-box;
        }
    }
}
</style>
<style lang="scss">
.Login {
    .ivu-input {
        height:48px;
        line-height:48px;
        font-size:16px;
    }

    .btn {
        width:100%;
        height:44px;
        font-size:18px;
    }
}
</style>
