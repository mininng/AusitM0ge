const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// 配置信任代理
app.set('trust proxy', true);

// 中间件，记录每个请求的 IP 地址
app.use((req, res, next) => {
    const userIp = req.ip || req.connection.remoteAddress; // 获取用户 IP 地址
    console.log(`收到请求: ${req.method} ${req.url} 来自 IP: ${userIp}`);
    next();
});

app.post('/save-location', (req, res) => {
    const { latitude, longitude, accuracy } = req.body;
    const userIp = req.ip || req.connection.remoteAddress; // 获取用户 IP 地址

    console.log(`接收到位置数据: ${JSON.stringify(req.body)} 来自 IP: ${userIp}`);

    if (latitude && longitude) {
        const locationData = `IP: ${userIp}, Latitude: ${latitude}, Longitude: ${longitude}, Accuracy: ${accuracy} meters\n`;

        // 将位置数据追加到文件中
        fs.appendFile(path.join(__dirname, 'locations.txt'), locationData, (err) => {
            if (err) {
                console.error('保存位置失败:', err);
                return res.status(500).json({ error: '无法保存位置数据' });
            }
            res.json({ message: '位置数据已保存' });
        });
    } else {
        res.status(400).json({ error: '无效的位置信息' });
    }
});

app.listen(PORT, () => {
    console.log(`服务器正在 http://localhost:${PORT} 上运行`);
});
