import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);
const login = () => import("../pages/login.vue");
const index = () => import("../pages/index.vue");
const manage = () => import("../pages/manage.vue");
const jiajiao = () => import("../pages/jiajiao.vue");
const shuizhan = () => import("../pages/shuizhan.vue");
const banner = () => import("../pages/banner.vue");
const jiazheng = () => import("../pages/jiazheng.vue");
const weixiu = () => import("../pages/weixiu.vue");
const xiugaimima = () => import("../pages/xiugaimima.vue");

export default new Router({
  routes: [
    {
      path: "/index",
      component: index,
      children: [
        {
          path: "manage",
          component: manage,
          name: "管理员管理"
        },
        {
          path: "banner",
          component: banner,
          name: "banner管理"
        },
        {
          path: "shuizhan",
          component: shuizhan,
          name: "水站管理"
        },
        {
          path: "jiajiao",
          component: jiajiao,
          name: "家教管理"
        },
        {
          path: "weixiu",
          component: weixiu,
          name: "维修管理"
        },
        {
          path: "xiugaimima",
          component: xiugaimima,
          name: "修改密码"
        },
        {
          path: "jiazheng",
          component: jiazheng,
          name: "家政管理"
        },
        {
          path: "",
          redirect: "manage"
        }
      ]
    },
    {
      path: "/login",
      component: login
    },
    {
      path: "*",
      redirect: "/login"
    }
  ]
});
