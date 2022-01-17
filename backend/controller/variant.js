const {
  getDataVariantAll,
  getDataVariantById,
  addDataVariant,
  updateDataVariantById,
  deleteDataVariantById,
  getDetailDataVariant,
} = require("../models/variant");
const Response = require("../helpers/response");
const { ReplaceToStartUpperCase } = require("../utils/replace");

exports.getVariantList = (req, res) => {
  getDataVariantAll((err, result) => {
    if (err) {
      const error = JSON.stringify(err, undefined, 2);
      return res.json(Response(false, 500, `Error`, JSON.parse(error)));
    }

    if (!result.length > 0) {
      return res.json(Response(true, 204, `Get Variant Successfully`, result));
    }
    return res.json(Response(true, 200, `Get Variant Successfully`, result));
  });
};

exports.addVariantList = (req, res) => {
  let { name } = req.body;
  name = ReplaceToStartUpperCase(name);
  addDataVariant(name, (err, result) => {
    if (err) {
      const error = JSON.stringify(err, undefined, 2);
      return res.json(Response(false, 500, `Error`, JSON.parse(error)));
    }
    return res.json(Response(true, 201, `Added Variant Successfully`, {}));
  });
};

exports.updateVariantList = (req, res) => {
  let { name } = req.body;
  const { id } = req.params;
  name = ReplaceToStartUpperCase(name);
  getDataVariantById(id, (errData, resultData) => {
    if (errData) {
      const error = JSON.stringify(errData, undefined, 2);
      return res.json(Response(false, 500, `Error`, JSON.parse(error)));
    } else if (!resultData.length > 0) {
      return res.json(
        Response(false, 400, `Variant Id not found`, {
          name: "variant_id",
        })
      );
    } else {
      updateDataVariantById(id, name, (errUpdate, resultUpdate) => {
        if (errUpdate) {
          const error = JSON.stringify(errUpdate, undefined, 2);
          return res.json(Response(false, 500, `Error`, JSON.parse(error)));
        }
        return res.json(
          Response(true, 201, `Updated Variant Successfully`, {})
        );
      });
    }
  });
};

exports.deleteVariantList = (req, res) => {
  const { id } = req.params;
  getDataVariantById(id, (errData, resultData) => {
    if (errData) {
      const error = JSON.stringify(errData, undefined, 2);
      return res.json(Response(false, 500, `Error`, JSON.parse(error)));
    } else if (!resultData.length > 0) {
      return res.json(
        Response(false, 400, `Variant Id Not Found`, {
          name: "variant_id",
        })
      );
    } else {
      deleteDataVariantById(id, (errDelete, resultDelete) => {
        if (errDelete) {
          const error = JSON.stringify(errDelete, undefined, 2);
          return res.json(Response(false, 500, `Error`, JSON.parse(error)));
        }
        return res.json(
          Response(true, 200, `Deleted Variant Successfully`, {})
        );
      });
    }
  });
};

exports.detailVariant = (req, res) => {
  const { id } = req.query;
  getDetailDataVariant(id, (err, result) => {
    if (err) {
      const error = JSON.stringify(err, undefined, 2);
      return res.json(Response(false, 500, `Error`, JSON.parse(error)));
    } else if (!result.length > 0) {
      return res.json(Response(true, 204, `Data Variant Not Found`, {}));
    } else {
      return res.json(
        Response(true, 200, `Get Variant Successfully`, result[0])
      );
    }
  });
};
