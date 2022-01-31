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
