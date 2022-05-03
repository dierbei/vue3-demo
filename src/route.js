import {createRouter, createWebHistory} from "vue-router"
import storage from "./model/store"

// 登录
import Login from "./components/Login"

// 后台
import Admin from "./components/Admin"
// 后台首页
import Home from "./components/admin/Home"
// 报告
import Report from "./components/admin/Report"
// 警告
import Alarm from "./components/admin/Alarm"
// 关键词
import Keywords from "./components/admin/Keywords"

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/login",
            component: Login,
        },
        {
            path: "/",
            component: Admin,
            children: [
                {
                    path: "", component: Home
                },
                {
                    path: "report", component: Report
                },
                {
                    path: "alarm", component: Alarm
                },
                {
                    path: "keywords", component: Keywords
                }
            ]
        }
    ]
})

//路由守卫
//https://next.router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards
router.beforeEach((to, from, next) => {

    /*
      to: Route: 即将要进入的目标 路由对象

      from: Route: 当前导航正要离开的路由

      next(false): 中断当前的导航。

      next()  路由继续向下匹配

      next('/') 或者 next({ path: '/' }) 可以跳转路由
     */

    if(to.path=="/login"){
        next()
    }else{
        //1、获取用户信息
        //2、判断用户信息是否存在
        //3、用户存在继续向下执行
        //4、用户不存在 跳转到登录页面
        let userinfo=storage.get("userinfo");
        if(userinfo && userinfo.username){
            next()
        }else{
            next({ path: '/login' })
        }
    }


})

export default router