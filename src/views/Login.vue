<template>
  <div class="Login">
    <div class="login_box">
      <!-- logo -->
      <div class="avatar_box">
        <img :src="imgUrl" alt="logo">
      </div>

      <!-- 登录表单 -->
      <el-form :model="loginForm" :rules="loginFormRules" ref="loginForm" label-width="45px" class="login_form">
        <el-form-item prop="username">
          <el-input prefix-icon="iconfont icon-user" v-model="loginForm.username"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input type="password" prefix-icon="iconfont icon-3702mima" v-model="loginForm.password"></el-input>
        </el-form-item>

        <!-- 按钮区 -->
        <el-form-item class="btns" label-width="250px">
          <el-button type="primary" @click="submitForm">登录</el-button>
          <el-button type="info" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { loginFormType, loginFormRulesType } from "../utils/data-interface";
import { validatePass } from "../utils/validate";

import { reqLogin } from "../api/login";

@Component 
export default class Login extends Vue {
  // logo图片
  private imgUrl: any = require('../assets/logo.png')
  // 登录信息
  private loginForm: loginFormType = {
    username: 'admin',
    password: '123456'
  }
  // 验证规则
  private loginFormRules: loginFormRulesType = {
    username: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
      { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
    ],
    password: [
      { validator: validatePass, trigger: 'blur' }
    ]
  }

  // 登陆事件
  private submitForm() {
    const ref: any = this.$refs.loginForm;
    ref.validate(async (valid: any) => {
      if (valid) {
        const res: any = await reqLogin(this.loginForm);
        if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
        this.$message.success(res.meta.msg);
        window.sessionStorage.setItem('token', res.data.token);
        this.$router.push('/home');
      } else {
        console.log('error submit!!');
        return false;
      }
    });
  }
  // 重置事件
  private resetForm() {
    const ref: any = this.$refs.loginForm;
    ref.resetFields()
  }
}
</script>

<style lang="less" scoped>
.Login {
  height: 100vh;
  background-color: #2b4b6b;
  display: flex;
  justify-content: center;
  align-items: center;

  .login_box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;

    .avatar_box {
      width: 130px;
      height: 130px;
      background-color: #fff;
      border: 1px solid #cccccc;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0 0 10px #dddddd;
      margin: 0 auto;
      margin-top: -75px;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eeeeee;
      }
    }
  }

  .login_form {
    margin-top: 20px;
    width: 90%;

    .btns {
      margin: 0 auto;
    }
  }
}
</style>