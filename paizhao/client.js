const https = require('https');
const fs = require('fs');
const express = require('express');

const app = express();

// 加载自签名证书
const options = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
};

// 设置静态文件夹
app.use(express.static('public'));

// 启动 HTTPS 服务器
https.createServer(options, app).listen(60113, () => {
    console.log('HTTPS Server running on https://localhost:60113');
});
