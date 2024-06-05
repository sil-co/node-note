const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = 3000;

// SQLiteデータベースのセットアップ（ファイルベース）
const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

// データベース初期化
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT)");

    const stmt = db.prepare("INSERT INTO users (name, email) VALUES (?, ?)");
    stmt.run("aaaaaaaaaa", "aaaa@example.com");
    stmt.run("bbb", "bbbb@example.com");
    stmt.finalize();
});

// ユーザーリストを取得するエンドポイント
app.get('/users', (req, res) => {
    db.all("SELECT * FROM users", (err, rows) => {
        if (err) {
            console.error('クエリエラー: ' + err.message);
            res.status(500).json({ error: 'データベースエラー' });
            return;
        }
        res.json(rows);
    });
});

app.listen(port, () => {
    console.log(`サーバーがポート${port}で起動しました。`);
});
