const {
  getDataCategoryAll,
  addDataCategory,
  getDataCategoryById,
  updateDataCategoryById,
  deleteDataCategoryById,
} = require("../models/category");
const Response = require("../helpers/response");

exports.getCategoryList = (req, res) => {
  getDataCategoryAll((err, result) => {
    if (err) {
      const error = JSON.stringify(err, undefined, 2);
      return res.json(Response(false, 500, `Error`, JSON.parse(error)));
    }
    return res.json(Response(true, 200, `Get Category Successfully`, result));
  });
};

exports.addCategoryList = (req, res) => {
  const { name } = req.body;
  addDataCategory(name, (err, result) => {
    if (err) {
      const error = JSON.stringify(err, undefined, 2);
      return res.json(Response(false, 500, `Error`, JSON.parse(error)));
    }
    return res.json(Response(true, 201, `Added Category Successfully`, {}));
  });
};

exports.updateCategoryList = (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  getDataCategoryById(id, (errData, resultData) => {
    if (errData) {
      const error = JSON.stringify(errData, undefined, 2);
      return res.json(Response(false, 500, `Error`, JSON.parse(error)));
    } else if (!resultData.length > 0) {
      return res.json(Response(true, 400, `Category Id not found`, {}));
    } else {
      updateDataCategoryById(id, name, (errUpdate, resultUpdate) => {
        if (errUpdate) {
          const error = JSON.stringify(errUpdate, undefined, 2);
          return res.json(Response(false, 500, `Error`, JSON.parse(error)));
        }
        return res.json(
          Response(true, 201, `Updated Category Successfully`, {})
        );
      });
    }
  });
};

exports.deleteCategoryList = (req, res) => {
  const { id } = req.params;
  getDataCategoryById(id, (errData, resultData) => {
    if (errData) {
      const error = JSON.stringify(errData, undefined, 2);
      return res.json(Response(false, 500, `Error`, JSON.parse(error)));
    } else if (!resultData.length > 0) {
      return res.json(Response(true, 400, `Category Id Not Found`, {}));
    } else {
      deleteDataCategoryById(id, (errDelete, resultDelete) => {
        if (errDelete) {
          const error = JSON.stringify(errDelete, undefined, 2);
          return res.json(Response(false, 500, `Error`, JSON.parse(error)));
        }
        return res.json(
          Response(true, 200, `Deleted Category Successfully`, {})
        );
      });
    }
  });
};
