const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 60767;

// 启用 CORS
app.use(cors());

// 中间件用于解析 JSON 请求体
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 配置 multer 处理文件上传
const upload = multer({ 
    dest: 'uploads/', // 文件保存的目录
    limits: { fileSize: 100 * 1024 * 1024 } // 文件大小限制为100MB
});

// 确保上传目录存在
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

// 上传文件的路由
app.post('/upload-photo', upload.single('photo'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('没有文件上传。');
    }

    console.log(`文件 ${req.file.originalname} 已上传到 ${req.file.path}`);
    res.send('文件上传成功。');
});

// 启动服务器
app.listen(port, () => {
    console.log(`服务器正在监听 http://localhost:${port}`);
});
