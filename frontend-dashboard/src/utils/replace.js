export const ReplaceDot = value => {
  if (!value) return false;
  return value.toString().replace(/\./g, "");
};

export const ReplaceToStartUpperCase = str => {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};
