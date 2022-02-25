exports.ConvertMetertoKilometer = (value) => {
  let result;
  const int = 1000;
  if (value.toString().length < 4) {
    result = `${value / int}`;
  } else {
    result = `${value / int}.0`;
  }
  return result;
};
