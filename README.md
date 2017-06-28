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
