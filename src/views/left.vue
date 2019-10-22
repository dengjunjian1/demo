<template>
  <div class="left">
    <router-link to="/index/manage" active-class="select">管理员管理</router-link>
    <router-link to="/index/banner" active-class="select">banner管理</router-link>
    <router-link to="/index/jiajiao" active-class="select">家教管理</router-link>
    <router-link to="/index/shuizhan" active-class="select">水站管理</router-link>
    <router-link to="/index/weixiu" active-class="select">维修管理</router-link>
    <router-link to="/index/jiazheng" active-class="select">家政管理</router-link>
    <router-link to="/index/xiugaimima" active-class="select">修改密码</router-link>
  </div>
</template>
 <script>
import API from "../common/js/API";
export default {};
</script>
<style lang="stylus" scoped>
.left {
  width: 200px;
  background: #87ceeb;
  text-align: center;

  a {
    display: block;
    text-align: center;
    line-height: 50px;
    font-size: 12px;
    text-decoration: none;
  }
}

.select {
  background: #B0C4DE;
  color: #ffffff;
}
</style>