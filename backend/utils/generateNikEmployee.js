const GenerateNikEmployee = (yearOfEntry, dateOfEntry, position, nomorUrut) => {
  return `${yearOfEntry}.${dateOfEntry}.${position}.${nomorUrut}`;
};

module.exports = GenerateNikEmployee;
