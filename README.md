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
    {"id": 1, "bookname": "VueJs1", "bookcover": "dist/logo.png", "price": 10},
    {"id": 2, "bookname": "VueJs2", "bookcover": "dist/logo.png", "price": 10},
    {"id": 3, "bookname": "VueJs3", "bookcover": "dist/logo.png", "price": 10},
    {"id": 4, "bookname": "VueJs4", "bookcover": "dist/logo.png", "price": 10}
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

## List

在 server.js 中
```
let fs = require('fs');

// 封装异步读取数据
let readBooks = callback => {
    fs.readFile('./books.json', 'utf-8', (err, data) => {
        if (err || data.json.length === 0) data = '[]';
        callback(JSON.parse(data));
    })
};

// 监听get 请求并处理
app.get('/books', (req, res) => {
    readBooks((books) => { // books 是读取到的数据 异步
        res.send(books);
    })
});
```

在list.vue 发出请求得到后台返回的数据并渲染页面
```
<script>
    export default {
        data() {
            return {books: null};
        },
        beforeMount(){
            this.$http.get('/books').then(res => {
                // 从后台得到数据放在body属性中
                this.books = res.body;
            }, err => {
                console.log(err)
            });
        }
    }
</script>

# 循环得到的数据，有多少条数据渲染多少次
<div class="col-md-3" v-for="book in books">

# 动态绑定每条数据的参数
<span>{{book.bookname}}</span>
<img :src="book.bookcover" alt="">
<span>{{book.price}}</span>
<router-link :to="{name:'detail',params:{id:book.id}}">详情</router-link>
```

## Detail

在detail.vue中
```
<script>
    export default {
        data(){
            return {id: null, book: (id: "", bookname: "", bookcover: "", price: ""};
        },
        beforeMount(){
            // 获取当前页面的路由参数 id
            this.id=this.$route.params.id;
            // 把当前页对应的id 传到后台 渲染从后台返回的数据
            this.$http.get('/books?id='+this.id).then(res => {
                this.book = res.body;
            }, err => {
                console.log(err);
            })
        }
</script>

# 把从后台得到数据渲染到页面
<span>{{book.bookname}}</span>
<img :src="book.bookcover" alt="">
<span>{{book.price}}</span>
```


在server.js 中
```
// 监听get请求并处理
app.get('/books', (req, res) => {
    console.log(req.query.id); // 得到前端传递过来的id
    let id = Number(req.query.id);
    if (id) { // 如果前台传过来id 返回指定id 的图书数据 详情页
        readBooks(books => {
            // 返回id 相同的那一项
            let book = books.find(item => item.id === id);
            // 把得到id 相同那一项传给前台
            res.send(book);
        });
    } else { // 如果前台没有传过来id 返回所有的数据 列表页
        readBooks(books=> {
            res.send(books);
        })
    }
});
```

在detail.vue中
```
<script>
    export default {
            name: 'detail',
            data(){
                // flag 默认不显示 当点击修改按钮 原本显示元素隐藏 隐藏的元素显示
                return {id: null, book: {bookname: '', bookcover: '', price: ''}, flag: false};
            },
            methods:{
                // 把当前页的id 传到后台 后台删除后返回列表页
                remove(){
                    this.$http.delete('/books?id='+this.book.id).then(res=>{
                        this.$router.push('/list');
                    },err=>{
                        console.log(err);
                    })
                },
                // 把修改后的book 传到后台 后台更新后返回列表页
                update(){
                    this.$http.put('/books',this.book).then(res=>{
                        this.$router.push('/list');
                    },err=>{
                        console.log(err);
                    })
                }
            }
        }
</script>

# 给按钮绑定事件
<button type="button" class="btn btn-danger" v-show="!flag" @click="remove">Delete</button>
<button type="button" class="btn btn-warning" v-show="!flag" @click="flag=true">Modify</button>
<button type="button" class="btn btn-primary" v-show="flag" @click="update">Confirm change</button>

// 添加可编辑的文本框 默认隐藏
<input type="text" v-show="flag" v-model="book.bookname">
<input type="text" v-show="flag" v-model="book.price">
```

body-parser 解析请求体的中间键
```
npm install body-parser -D
```

在server.js 中
```
let bodyParser = require('body-parser');

// 封装异步写入方法
let writeBooks = (data, callback) => {
    fs.writeFile('./books.json', JSON.stringify(data), callback);
};

app.use(bodyParser.json()); // 解析请求体json内容

// 监听put请求并处理
app.put('/books', (req, res) => {
    console.log("需要修改的内容: "+req.body); // req.body 获取的请求体里的内容 json对象
    readBooks(books => {
        let id = Number(req.body.id); // 获取需要更新的对象id
        books = books.map(item => {
            // 如果id 相同 则替换这条数据
            if (item.id === id) {
                return req.body;
            }
            // 不相同则返回原数据
            return item;
        });
        // 把新的数组写入json 文件
        writeBooks(books, err => {
            res.send(books);
        });
    });
});

// 监听delete请求并处理
app.delete('/books', (req, res) => {
    // 得到前台传过来的 需要删除的id
    let id = Number(req.query.id);
    readBooks(books => {
        books = books.filter(item => {
            // 过滤id 不符合项
            return item.id != id;
        });
        // 把过滤后的新数组写入json 文件
        writeBooks(books, err => {
            res.send(books);
        });
    });
});
```


