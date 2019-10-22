<template>
  <div class="mask">
    <div class="box">
      <h3 class="login">登录</h3>
      <template>
        <el-select v-model="user.type" placeholder="请选择角色" class="input">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </template>
      <el-row>
        <el-col :span="24">
          <el-input placeholder="请输入账号" v-model="user.name" clearable class="input"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-input placeholder="请输入密码" v-model="user.pass" show-password clearable class="input"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <button data-v-7e27ed2a type="button" class="el-button el-button--primary"  @click="login">
            <span>登录</span>
          </button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
    </div>
  </div>
</template>
<script>
import API from "../common/js/API";
export default {

  data() {
    return {
      user: {
        name: "",
        pass: "",
        type: "",
      },
      options: [
        {
          value: "0",
          label: "超级管理员"
        },
        {
          value: "1",
          label: "普通管理员"
        },
        {
          value: "2",
          label: "用户"
        }
      ]
    };
  },
    methods:{
        login(){
            console.log(this.user)
            this.$axios({
                url:API.login,
                method:"post",
                data:this.user
            }).then(res=>{
                if(res.data.isok){
                    sessionStorage.setItem("isAdmin",res.data.isAdmin)
                    this.$router.push("/index")
                }else{
                    alert(res.data.info)
                }
            })
        }
    }
};
</script>

<style lang="stylus" scoped>
.mask {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0px;
  top: 0px;
  background: #00BFFF;
}

.login {
  text-align: center;
  font-size: 40px;
  font-weight: bold;
  color: #ffd39b;
  height: 60px;
  line-height: 60px;
}

.box {
  width: 400px;
  height: 300px;
  background: #fff;
  position: absolute;
  left: 0;
  top: 0px;
  right: 0;
  bottom: 0px;
  margin: auto;
  border-radius: 30px;
}

.input {
  width: 80%;
  padding-left: 30px;
  margin-top: 10px;
}

.el-button {
  display: block;
  margin: 20px auto;
  text-align: center;
  color: #fff;
  background-color: #c0ff3e;
  border-color: #c0ff3e;
}

.el-button:hover {
  color: #ff8247;
  border-color: #ffe7ba;
  background-color: #ffe7ba;
}
</style>