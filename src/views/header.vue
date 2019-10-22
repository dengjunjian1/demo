<template>
  <div class="header">
    后台管理系统
    <i>admin</i>
    <el-button type="primary" class="btn">退出登录</el-button>
  </div>
</template>
 <script>
import API from "../common/js/API";
export default {};
</script>
<style scoped>
.header {
  padding-left: 220px;
  height: 100px;
  background: #0000ff;
  font-size: 50px;
  text-align: center;
  line-height: 100px;
  color: #ffffff;
  position: relative;
}
i {
  position: absolute;
  right: 150px;
  top: 0px;
  font-size: 30px;
  /* padding-left: 180px; */
  font-style: normal;
}
.btn {
  position: absolute;
  top: 35px;
  right: 50px;
  margin-top: -5px;
  /* background: #fff; */
  color: white;
  vertical-align: text;
}
</style>