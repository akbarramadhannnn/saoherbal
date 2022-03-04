const {
  getDataConfigureListAll,
  addDataConfigure,
  getDataConfigureByModule,
  addDataConfigureDetail,
  getDataConfigureById,
  getDataConfigureDetailAll,
  getDataConfigureDetailByIdAndConfigureId,
  getDataConfigureDetailById,
  updateDataConfigureDetail,
} = require("../models/configure");
const Response = require("../helpers/response");

exports.getConfigureListAll = async (req, res) => {
  try {
    const result = await getDataConfigureListAll();
    if (!result.length > 0) {
      return res.json(Response(true, 204, `Get Configure Successfully`, {}));
    }

    if (!result.length > 0) {
      return res.json(Response(true, 204, `Get Configure Successfully`, {}));
    }
    return res.json(
      Response(true, 200, `Get Configure Successfully`, {
        data: result,
      })
    );
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};

exports.addConfigure = async (req, res) => {
  let { module, icon } = req.body;
  try {
    module = module.toUpperCase();

    const result = await getDataConfigureByModule(module);
    if (result.length > 0) {
      return res.json(
        Response(false, 400, `Module has Already`, {
          name: "module",
        })
      );
    }

    const resultAdd = await addDataConfigure(module, icon);
    const resultGet = await getDataConfigureById(resultAdd.insertId);
    return res.json(
      Response(true, 201, `Added Configure Successfully`, {
        data: resultGet[0],
      })
    );
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};

exports.addConfigureDetail = async (req, res) => {
  let { configureId, name, value, description } = req.body;

  try {
    const resultId = await getDataConfigureById(configureId);
    if (!resultId.length > 0) {
      return res.json(
        Response(false, 400, `Configure Id Not Found`, {
          name: "configureId",
        })
      );
    }

    const resultAdd = await addDataConfigureDetail(
      configureId,
      name,
      value,
      description
    );
    const resultGet = await getDataConfigureDetailByIdAndConfigureId(
      resultAdd.insertId,
      configureId
    );
    return res.json(
      Response(true, 201, `Added Configure Detail Successfully`, {
        data: resultGet[0],
      })
    );
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};

exports.getAllConfigureDetail = async (req, res) => {
  let { configureId } = req.query;

  try {
    const resultId = await getDataConfigureById(configureId);
    if (!resultId.length > 0) {
      return res.json(
        Response(false, 400, `Configure Id Not Found`, {
          name: "configureId",
        })
      );
    }

    const result = await getDataConfigureDetailAll(configureId);
    if (!result.length > 0) {
      return res.json(
        Response(true, 204, `Get Configure Detail Successfully`, {})
      );
    }

    return res.json(
      Response(true, 200, `Get Configure Detail Successfully`, {
        data: result,
      })
    );
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};

exports.updateConfigureDetail = async (req, res) => {
  let { configureId, name, value, description } = req.body;
  let { id } = req.params;
  try {
    const resultConfigure = await getDataConfigureById(configureId);
    if (!resultConfigure.length > 0) {
      return res.json(
        Response(false, 400, `Configure Id Not Found`, {
          name: "configureId",
        })
      );
    }

    const resultConfigureDetail = await getDataConfigureDetailById(id);
    if (!resultConfigureDetail.length > 0) {
      return res.json(
        Response(false, 400, `Configure Detail Id Not Found`, {
          name: "configureDetailId",
        })
      );
    }

    await updateDataConfigureDetail(id, name, value, description);
    const resultGet = await getDataConfigureDetailByIdAndConfigureId(
      id,
      configureId
    );
    return res.json(
      Response(true, 201, `Updated Configure Detail Successfully`, {
        data: resultGet[0],
      })
    );
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};
