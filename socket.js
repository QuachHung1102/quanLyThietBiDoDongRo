let io;
const secretOrPrivateKey = process.env.JWT_SECRET_KEY;


module.exports = {
  init: (server) => {
    const cookieParser = require('cookie-parser');
    const { Server } = require('socket.io');
    io = new Server(server, {
      cors: {
        origin: "*",
        methods: ['GET', 'POST'],
        credentials: true,
      },
      cookie: true,
    });

    // Áp dụng cookieParser cho Socket.io
    io.use((socket, next) => {
      cookieParser()(socket.request, socket.request.res || {}, next);
    });

    // io.use((socket, next) => {
    //   console.log('Headers:', socket.request.headers); // Kiểm tra header
    //   console.log('Cookies:', socket.request.cookies); // Kiểm tra cookies
    //   next();
    // });

    io.use((socket, next) => {
      const cookies = socket.request.cookies;
      if (!cookies || !cookies.jwt) {
        return next(new Error('Authentication error: No token provided'));
      }
      try {
        const jwt = require('jsonwebtoken');
        const decoded = jwt.verify(cookies.jwt, secretOrPrivateKey); // Thay 'your-secret-key' bằng khóa bí mật của bạn
        socket.user = decoded;
        next();
      } catch (error) {
        next(new Error('Authentication error: Invalid token'));
      }
    });

    io.on('connection', (socket) => {
      console.log(`User ${socket.user.id} connected`);
      socket.on('joinDevice', (deviceId) => {
        socket.join(`device:${deviceId}`);
        console.log(`User ${socket.user.id} joined device ${deviceId}`);
      });
      socket.on('disconnect', () => {
        console.log(`User ${socket.user.id} disconnected`);
      });
    });

    return io;
  },
  getIO: () => {
    if (!io) throw new Error('Socket.IO not initialized');
    return io;
  }
};