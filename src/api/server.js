let express = require('express');
let app = express();

// 监听get请求并处理
app.get('/books', (req, res) => {
    res.send('hello List!');
});

app.listen(6061, () => {
    console.log('监听6061端口');
});
