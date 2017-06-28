let express = require('express');
let app = express();
let fs = require('fs');

// 封装异步读取数据
let readBooks = callback => {
    fs.readFile('./books.json', 'utf-8', (err, data) => {
        if (err || data.length === 0) data = '[]';
        callback(JSON.parse(data));
    })
};

// 监听get 请求并处理
app.get('/books', (req, res) => {
    readBooks((books) => { // books 是读取到的数据 异步
        res.send(books);
    })
});

app.listen(6061, () => {
    console.log('监听6061端口');
});
