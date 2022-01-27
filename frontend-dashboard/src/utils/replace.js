export const ReplaceDot = value => {
  if (!value) return false;
  return value.toString().replace(/\./g, "");
};
