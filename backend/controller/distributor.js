const {
  getDataDistributorAll,
  getDataDistributorById,
  addDataDistributor,
  updateDataDistributorById,
  deleteDataDistributorById,
  getDetailDataDistributor,
  getDataDistributorByName,
  getDataDistributorByNameNotById,
  getDataDistributorByEmail,
  getDataDistributorByEmailNotById,
  getDataDistributorByNoTlp,
  getDataDistributorByNoTlpNotById,
} = require("../models/distributor");
const {
  getDataProvinsiById,
  getDataKabupatenById,
  getDataKabupatenAndProvinsiById,
} = require("../models/wilayah");
const Response = require("../helpers/response");
const { ReplaceToStartUpperCase } = require("../utils/replace");

exports.getDistributorList = async (req, res) => {
  try {
    const result = await getDataDistributorAll();
    if (!result.length > 0) {
      return res.json(
        Response(true, 204, `Get Distributor Successfully`, result)
      );
    }
    return res.json(
      Response(true, 200, `Get Distributor Successfully`, result)
    );
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};

exports.addDistributorList = async (req, res) => {
  let { provinsi_id, kabupaten_id, name, email, no_tlp, address } = req.body;
  name = ReplaceToStartUpperCase(name);

  try {
    const resultProvinsiById = await getDataProvinsiById(provinsi_id);
    if (!resultProvinsiById.length > 0) {
      return res.json(
        Response(false, 400, `Provinsi Id Not Found`, {
          name: "provinsi_id",
        })
      );
    }

    const resultKabupatenById = await getDataKabupatenById(kabupaten_id);
    if (!resultKabupatenById.length > 0) {
      return res.json(
        Response(false, 400, `Kabupaten Id Not Found`, {
          name: "kabupaten_id",
        })
      );
    }

    const resultKabProvById = await getDataKabupatenAndProvinsiById(
      kabupaten_id,
      provinsi_id
    );
    if (!resultKabProvById.length > 0) {
      return res.json(
        Response(false, 400, `Kabupaten Id And Provinsi Id No Match`, {
          name: "kabupaten_id",
        })
      );
    }

    const resultDistributorByName = await getDataDistributorByName(name);
    if (resultDistributorByName.length > 0) {
      return res.json(
        Response(false, 400, `Name Has Already`, {
          name: "name",
        })
      );
    }

    const resultDistributorByEmail = await getDataDistributorByEmail(email);
    if (resultDistributorByEmail.length > 0) {
      return res.json(
        Response(false, 400, `Email Has Already`, {
          name: "email",
        })
      );
    }

    const resultDistributorByNoTlp = await getDataDistributorByNoTlp(no_tlp);
    if (resultDistributorByNoTlp.length > 0) {
      return res.json(
        Response(false, 400, `No Tlp Has Already`, {
          name: "no_tlp",
        })
      );
    }

    await addDataDistributor(
      provinsi_id,
      kabupaten_id,
      name,
      email,
      no_tlp,
      address
    );
    return res.json(Response(true, 201, `Added Distributor Successfully`, {}));
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};

exports.updateDistributorList = async (req, res) => {
  const { id } = req.params;
  let { provinsi_id, kabupaten_id, name, email, no_tlp, address } = req.body;
  name = ReplaceToStartUpperCase(name);

  try {
    const resultDistributorById = await getDataDistributorById(id);
    if (!resultDistributorById.length > 0) {
      return res.json(
        Response(false, 400, `Distributor Id Not Found`, {
          name: "distributor_id",
        })
      );
    }

    const resultProvinsiById = await getDataProvinsiById(provinsi_id);
    if (!resultProvinsiById.length > 0) {
      return res.json(
        Response(false, 400, `Provinsi Id Not Found`, {
          name: "provinsi_id",
        })
      );
    }

    const resultKabupatenById = await getDataKabupatenById(kabupaten_id);
    if (!resultKabupatenById.length > 0) {
      return res.json(
        Response(false, 400, `Kabupaten Id Not Found`, {
          name: "kabupaten_id",
        })
      );
    }

    const resultKabProvById = await getDataKabupatenAndProvinsiById(
      kabupaten_id,
      provinsi_id
    );
    if (!resultKabProvById.length > 0) {
      return res.json(
        Response(false, 400, `Kabupaten Id And Provinsi Id No Match`, {
          name: "kabupaten_id",
        })
      );
    }

    const resultDistributorByNameNotById =
      await getDataDistributorByNameNotById(name, id);
    if (resultDistributorByNameNotById.length > 0) {
      return res.json(
        Response(false, 400, `Name Has Already`, {
          name: "name",
        })
      );
    }

    const resultDistributorByEmailNotById =
      await getDataDistributorByEmailNotById(email, id);
    if (resultDistributorByEmailNotById.length > 0) {
      return res.json(
        Response(false, 400, `Email Has Already`, {
          name: "email",
        })
      );
    }

    const resultDistributorByNoTlpNotById =
      await getDataDistributorByNoTlpNotById(no_tlp, id);
    if (resultDistributorByNoTlpNotById.length > 0) {
      return res.json(
        Response(false, 400, `No Tlp Has Already`, {
          name: "no_tlp",
        })
      );
    }

    await updateDataDistributorById(
      id,
      provinsi_id,
      kabupaten_id,
      name,
      email,
      no_tlp,
      address
    );
    return res.json(
      Response(true, 201, `Updated Distributor Successfully`, {})
    );
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};

exports.deleteDistributorList = async (req, res) => {
  const { id } = req.params;

  try {
    const resultDistributorById = await getDataDistributorById(id);
    if (!resultDistributorById.length > 0) {
      return res.json(
        Response(false, 400, `Distributor Id Not Found`, {
          name: "distributor_id",
        })
      );
    }
    await deleteDataDistributorById(id);
    return res.json(
      Response(true, 200, `Deleted Distributor Successfully`, {})
    );
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};

exports.detailDistributor = async (req, res) => {
  const { id } = req.query;

  try {
    const resultDistributorById = await getDataDistributorById(id);
    if (!resultDistributorById.length > 0) {
      return res.json(
        Response(false, 400, `Distributor Id Not Found`, {
          name: "distributor_id",
        })
      );
    }
    const result = await getDetailDataDistributor(id);
    return res.json(
      Response(true, 200, `Get Distributor Successfully`, result[0])
    );
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};
