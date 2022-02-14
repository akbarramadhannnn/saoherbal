exports.RegexLatitude = (value) => {
  return /^([-+]?)([\d]{1,2})(((\.)(\d{5,7})))$/.test(value);
};

exports.RegexLongitude = (value) => {
  return /^([-+]?)([\d]{1,3})(((\.)(\d{5,7})))$/.test(value);
};

exports.RegexAlphabetNumber = (value) => {
  return /^[a-zA-Z0-9]*$/.test(value);
};

exports.RegexAlphabetSpace = (value) => {
  return /^[a-zA-Z ]*$/.test(value);
};

exports.RegexEmail = (value) => {
  return /^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/.test(value);
};

exports.RegexMinEnamLength = (value) => {
  return /^.{6,}$/.test(value);
};
