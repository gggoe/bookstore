let express = require('express');
let app = express();
let fs = require('fs');
let bodyParser = require('body-parser');

app.use(bodyParser.json()); // 解析请求体json内容

// 封装异步写入方法
let writeBooks = (data, callback) => {
    fs.writeFile('./books.json', JSON.stringify(data), callback);
};

// 封装异步读取数据
let readBooks = callback => {
    fs.readFile('./books.json', 'utf-8', (err, data) => {
        if (err || data.length === 0) data = '[]';
        callback(JSON.parse(data));
    })
};

// 监听get请求并处理
app.get('/books', (req, res) => {
    console.log("前台发送id: "+req.query.id); // 得到前端传递过来的id
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

app.listen(6061, () => {
    console.log('监听6061端口');
});
