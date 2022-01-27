// const axios = require("axios").default;
const {
  getDataProvinsi,
  getDataKabupatenByProvinsiId,
} = require("../models/wilayah");
const Response = require("../helpers/response");

exports.getProvinsi = async (req, res) => {
  try {
    const result = await getDataProvinsi();
    if (!result.length > 0) {
      return res.json(Response(true, 204, `Get Provinsi Successfully`, result));
    }
    return res.json(Response(true, 200, `Get Provinsi Successfully`, result));
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};

exports.getKabupaten = async (req, res) => {
  const { provinsiId } = req.query;

  try {
    if (!provinsiId) {
      return res.json(
        Response(
          false,
          404,
          `method ${req.method} url ${req.originalUrl} not found!`,
          {}
        )
      );
    }

    const result = await getDataKabupatenByProvinsiId(provinsiId);
    if (!result.length > 0) {
      return res.json(
        Response(true, 204, `Get Kabupaten Successfully`, result)
      );
    }
    return res.json(Response(true, 200, `Get Kabupaten Successfully`, result));
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};

// exports.addProvinsi = () => {
//   axios
//     .get(
//       `https://api.binderbyte.com/wilayah/kabupaten?api_key=316485db91b6ecf537fec9fc679927375370483d2a67595a187f04d8096db585&id_provinsi=92`
//     )
//     .then((response) => {
//       const responseData = response.data;
//       console.log("responseData", responseData);
//       const dataArr = [];
//       for (let i = 0; i < responseData.value.length; i++) {
//         dataArr.push([34, responseData.value[i].name]);
//       }
//       addMultipleDataProvinsi(dataArr, (err, result) => {
//         console.log("result", result);
//       });
//     });
// };
