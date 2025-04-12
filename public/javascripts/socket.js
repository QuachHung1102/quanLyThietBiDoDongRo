const socket = io({
  withCredentials: true, // Gửi cookie kèm theo
});

try {
  socket.emit('joinDevice', deviceData.id);
} catch (error) {
  console.warn('Socket emit error:', error.message);
}