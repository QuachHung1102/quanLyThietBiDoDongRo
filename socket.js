let io;

module.exports = {
  init: (server) => {
    const { Server } = require('socket.io');
    io = new Server(server);

    // io.use((socket, next) => {
    //   const token = socket.request.cookies.jwt;
    //   if (!token) return next(new Error('Authentication error: No token provided'));
    //   try {
    //     const decoded = require('jsonwebtoken').verify(token, 'your-secret-key');
    //     socket.user = decoded;
    //     next();
    //   } catch (error) {
    //     next(new Error('Authentication error: Invalid token'));
    //   }
    // });

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