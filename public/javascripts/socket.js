const socket = io({
  withCredentials: true, // Gửi cookie kèm theo
});

try {
  // Kiểm tra nếu deviceData tồn tại trước khi emit
  if (typeof deviceData !== 'undefined' && deviceData && deviceData.id) {
    socket.emit('joinDevice', deviceData.id);
    console.log('Joined device room:', deviceData.id);
  }
} catch (error) {
  console.warn('Socket emit error:', error.message);
}