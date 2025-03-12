const path = require("path");

const rootDir1 = path.dirname(require.main.filename); // cách mới
const rootDir2 = path.dirname(process.mainModule.filename); // cách cũ

module.exports = { rootDir1, rootDir2 };

// thuộc tính process.mainModule được sử dụng để trỏ đến module chính của được thực thi bằng lệnh node.
// và chắc chắn nó sẽ hoạt động trên mọi hệ điều hành.
