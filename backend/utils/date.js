exports.getFirstDayDate = () => {
  const date = new Date();
  const result = new Date(date.getFullYear(), date.getMonth(), 1);
  return result;
};

exports.getLastDayDate = () => {
  const date = new Date();
  const result = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return result;
};

exports.getDaysInMonth = (year, month) => {
  var date = new Date(year, month, 1);
  var days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
};
