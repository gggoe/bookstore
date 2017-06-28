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

在src下建立一个components文件夹 放置组件

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
export {Navbar,List,Detail,,Add}
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

