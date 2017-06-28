# bookstore

[![Author](https://img.shields.io/badge/author-gggoe-green.svg?style=flat-square)](https://github.com/gggoe)

> A simple Vue.js project

## Build Setup

```
# 初始化webpack-simple 模板
# 注意webpack-simple 后面可以写项目名称 不写代表在当前目录生成项目
vue init webpack-simple

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
# 注意打包编译前原文件请求的静态资源路径需要修改
npm run build
```

## Development

```
npm install bootstrap -S
```

在main.js 中 导入bootstrap
```
import 'bootstrap'
```

在  __webpack.config.js__ 中纠正默认导入的bootstrap文件
```
resolve:{
    alias:{
        'bootstrap$':'bootstrap/dist/css/bootstrap.css'
    }
}
```

处理文件加载 (默认导出的是js)
> css style loader 加载规则
```
npm i style-loader css-loader -D
```

改变loader规则
```
module: {
    rules: [
        {
            test:/\.css$/,
            loader:'style-loader!css-loader'
        }
    ]
}
```

配置字体图标
```
module: {
    rules: [
        {
            test: /\.(png|jpg|gif|svg|woff|ttf|eot|woff2)$/,
            loader: 'file-loader',
            options: {
            name: '[name].[ext]?[hash]'
        }
    ]
}
```

## Components

在src下建立一个components 文件夹 放置组件

在components 下创建

> navbar.vue 图书导航组件

> list.vue   图书列表组件

> detail.vue 图书详情组件

> add.vue    添加图书组件

在components 下创建index.js

```
// 导入全部组件 并批量导出
import Navbar from './navbar.vue'
import List from './list.vue'
import Detail from './detail.vue'
import Add from './add.vue'
export {Navbar,List,Detail,Add}
```

## Navbar

导入bootstrap 导航组件 http://v3.bootcss.com/components/#nav

>组件只能有一个根元素

```
<nav id="navbar" class="navbar navbar-default navbar-fixed-center">
    <div class="container-fluid">
        <div class="navbar-header">
            <a class="navbar-brand" href="#">Simple Bookstore</a>
        </div>
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
                <li class="active">
                    <a href="javascript:;">Book list</a>
                </li>
                <li>
                    <a href="javascript:;">Add book</a>
                </li>
            </ul>
        </div>
    </div>
</nav>
```

在App.vue 中导入
```
# 导入Navbar 模块
import {Navbar} from './components'

# 作为组件
export default {
    components: {
        Navbar
    }
}

# 输出到页面
<template>
    <div id="app">
        <Navbar></Navbar>
    </div>
</template>
```

## Vue-router

基于vue-router 开发单页应用

```
# 下载vue-router
npm install vue-router -S
```

在src下建立一个router 文件夹 放置路由表

在router 下创建router.js 文件配置路由

1. 配置路由导航

2. 导入路由组件

3. 配置路由表 (注册路由表)

4. 生成和导出VueRouter 实例

5. 在Vue根实例中注入路由

在navbar.vue中
```
<li class="active">
    <router-link to="/list">Book list</router-link>
</li>
<li>
    <router-link to="/add">Add book</router-link>
</li>
```

在router.js中
```
# 导入路由组件
import Vue from 'vue'
import VueRouter from 'vue-router'
import {List, Add, Detail} from '../components'

# 启用VueRouter
Vue.use(VueRouter);

# 创建路由路径规则
let routes = [
    {path: '/list', component: List},
    {path: '/detail/:id', name: 'detail', component: Detail},
    {path: '/add', component: Add},
    {path: '*', redirect: '/list'} // redirect 重定向
];

# 生成VueRouter 实例 并导出
export default new VueRouter({routes});
```

在main.js 中
```
# 导入VueRouter 实例
import router from './router/router'

new Vue({
    el:'#app',
    render: h => h(App),
    router // 将VueRouter 实例注入到vue 根实例中
})
```

在App.vue 中 指定视图位置
```
# router-view 视图 路由出现位置
<template>
  <div id="app">
  <Navbar></Navbar>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>
```

在list.vue 中
```
# 先写静态页面
<template>
    <div id="list">
        <h3>Book list page</h3>
        <div class="col-md-3">
            <div class="panel panel-warning">
                <div class="panel-heading">
                    Title：<span>VueJs</span>
                </div>
                <div class="panel-body">
                    <img src="./logo.png" alt="">
                </div>
                <div class="panel-footer">
                    Price：<span>9.9 $</span>
                    <a href="javascript:;">Detail</a>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
    a {
        text-decoration: none;
    }

    h3 {
        text-align: center;
    }

    img {
        width: 100%;
    }
</style>
```

## Server

1. 通过vue-resource 进行前后端交互

2. webpack => devServer.proxy(解决跨域问题)

3. 搭建node server (express)

4. 接口restful风格

> get 获取一个或多个资源

> post 向后台添加资源

> put 更新修改资源

> delete 删除资源

下载vue-resource 模块
```
npm i vue-resource -S
```

在main.js 中
```
import VueResource from 'vue-resource'

Vue.use(VueResource);
```

在src下建立一个api文件夹 放置接口和数据

创建books.json 数据文件
```
[
    {"id": 1, "bookname": "VueJs1", "bookcover": "./logo.png", "price": 10},
    {"id": 2, "bookname": "VueJs2", "bookcover": "./logo.png", "price": 10},
    {"id": 3, "bookname": "VueJs3", "bookcover": "./logo.png", "price": 10},
    {"id": 4, "bookname": "VueJs4", "bookcover": "./logo.png", "price": 10}
    ...
]
```

创建server.js 服务文件(基于express框架)
```
let express = require('express');
let app = express();

// 监听get请求并处理
app.get('/books', (req, res) => {
    res.send('hello List!');
});

app.listen(6061, () => {
    console.log('监听6061端口');
});
```

在webpack.config.js 中配置代理
```
devServer: {
    historyApiFallback: true,
    noInfo: true,
    proxy:{ // 设置代理 解决跨域问题
    '/books':'http://127.0.0.1:6061'
    }
}
```

在list.vue 中测试接口
```
<script>
    export default {
        beforeMount(){
            this.$http.get('/books').then(res => {
                // 从后台得到数据放在body属性中
                console.log(res.body)
            }, err => {
                console.log(err)
            });
        }
    }
</script>
```
















