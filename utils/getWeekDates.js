const getWeekDates = () => {
  const date = new Date();
  const dayOfWeek = date.getDay();
  const startOfWeek = new Date(date);
  const endOfWeek = new Date(date);

  // Nếu là thứ 2, không cần lấy quá khứ
  switch (dayOfWeek) {
    case 1:
      endOfWeek.setDate(date.getDate() + 6);
      break;
    case 2:
      startOfWeek.setDate(date.getDate() - 1);
      endOfWeek.setDate(date.getDate() + 5);
      break;
    case 3:
      startOfWeek.setDate(date.getDate() - 2);
      endOfWeek.setDate(date.getDate() + 4);
      break;
    case 4:
      startOfWeek.setDate(date.getDate() - 3);
      endOfWeek.setDate(date.getDate() + 3);
      break;
    case 5:
      startOfWeek.setDate(date.getDate() - 4);
      endOfWeek.setDate(date.getDate() + 2);
      break;
    case 6:
      startOfWeek.setDate(date.getDate() - 5);
      endOfWeek.setDate(date.getDate() + 1);
      break;
    case 0: // Chủ nhật
      startOfWeek.setDate(date.getDate() - 6);
      break;
    default:
      break;
  }

  const dates = [];
  const temp = new Date(startOfWeek);
  while (temp <= endOfWeek) {
    dates.push(new Date(temp).toISOString().split('T')[0]);
    temp.setDate(temp.getDate() + 1);
  }

  return dates;
};

module.export = { getWeekDates };
