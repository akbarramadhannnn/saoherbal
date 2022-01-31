exports.ConvertToRupiah = (number) => {
  if (!number) return "";
  const format = number.toString().split("").reverse().join("");
  const convert = format.match(/\d{1,3}/g);
  const hasil = convert.join(".").split("").reverse().join("");
  return hasil;
};
