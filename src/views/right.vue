<template>
  <div class="right">
    <h1 class="name">{{$route.name}}</h1>
    <router-view></router-view>
  </div>
</template>
 <script>
import API from "../common/js/API";
export default {};
</script>
<style scoped>
.right {
  flex: 1;
}
.name {
  /* display: block; */
  margin: 20px auto;
  text-align: center;
  color: black;
  font-size: 30px;
}
</style>