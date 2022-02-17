const {
  getDataStoreAll,
  getDataStoreById,
  addDataStore,
  updateDataStoreById,
  deleteDataStoreById,
  getDetailDataStore,
  getDataStoreByName,
  getDataStoreByNameNotById,
  getDataStoreByEmail,
  getDataStoreByEmailNotById,
  getDataStoreByNoTlp,
  getDataStoreByNoTlpNotById,
  getTotalDataStore,
} = require("../models/store");
const {
  getDataProvinsiById,
  getDataKabupatenById,
  getDataKabupatenAndProvinsiById,
} = require("../models/wilayah");
const Response = require("../helpers/response");
const { ReplaceToStartUpperCase } = require("../utils/replace");

exports.getStoreList = async (req, res) => {
  let search = req.query.search || "";

  // Pagination
  const pagination = {};
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  try {
    const resultTotalCategory = await getTotalDataStore(search);
    const total = resultTotalCategory[0].total;
    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }

    const totalPage = Math.ceil(total / limit);

    const result = await getDataStoreAll(startIndex, limit, search);
    
    if (!result.length > 0) {
      return res.json(Response(true, 204, `Get Store Successfully`, {}));
    }

    return res.json(
      Response(true, 200, `Get Store Successfully`, {
        data: result,
        totalPage,
        pagination,
      })
    );
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};

exports.getStoreListAll = async (req, res) => {
  try {
    const result = await getDataStoreAll();
    if (!result.length > 0) {
      return res.json(Response(true, 204, `Store Not Found`, {}));
    }
    // for (let i = 0; i < resultProduct.length; i++) {
    //   resultProduct[i].category = JSON.parse(resultProduct[i].category);
    //   resultProduct[i].variant = JSON.parse(resultProduct[i].variant);
    //   resultProduct[i].price_list = JSON.parse(resultProduct[i].price_list);
    // }
    return res.json(
      Response(true, 200, `Get Store Successfully`, {
        data: result,
      })
    );
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};

exports.addStoreList = async (req, res) => {
  let {
    provinsi_id,
    kabupaten_id,
    name,
    email,
    no_tlp,
    address,
    latitude,
    longitude,
  } = req.body;
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

    const resultStoreByName = await getDataStoreByName(name);
    if (resultStoreByName.length > 0) {
      return res.json(
        Response(false, 400, `Name Has Already`, {
          name: "name",
        })
      );
    }

    const resultStoreByEmail = await getDataStoreByEmail(email);
    if (resultStoreByEmail.length > 0) {
      return res.json(
        Response(false, 400, `Email Has Already`, {
          name: "email",
        })
      );
    }

    const resultStoreByNoTlp = await getDataStoreByNoTlp(no_tlp);
    if (resultStoreByNoTlp.length > 0) {
      return res.json(
        Response(false, 400, `No Tlp Has Already`, {
          name: "no_tlp",
        })
      );
    }

    await addDataStore(
      provinsi_id,
      kabupaten_id,
      name,
      email,
      no_tlp,
      address,
      latitude,
      longitude
    );
    return res.json(Response(true, 201, `Added Store Successfully`, {}));
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};

exports.updateStoreList = async (req, res) => {
  const { id } = req.params;
  let {
    provinsi_id,
    kabupaten_id,
    name,
    email,
    no_tlp,
    address,
    latitude,
    longitude,
  } = req.body;
  name = ReplaceToStartUpperCase(name);

  try {
    const resultStoreById = await getDataStoreById(id);
    if (!resultStoreById.length > 0) {
      return res.json(
        Response(false, 400, `Store Id Not Found`, {
          name: "store_id",
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

    const resultStoreByNameNotById = await getDataStoreByNameNotById(name, id);
    if (resultStoreByNameNotById.length > 0) {
      return res.json(
        Response(false, 400, `Name Has Already`, {
          name: "name",
        })
      );
    }

    const resultStoreByEmailNotById = await getDataStoreByEmailNotById(
      email,
      id
    );
    if (resultStoreByEmailNotById.length > 0) {
      return res.json(
        Response(false, 400, `Email Has Already`, {
          name: "email",
        })
      );
    }

    const resultSotreByNoTlpNotById = await getDataStoreByNoTlpNotById(
      no_tlp,
      id
    );
    if (resultSotreByNoTlpNotById.length > 0) {
      return res.json(
        Response(false, 400, `No Tlp Has Already`, {
          name: "no_tlp",
        })
      );
    }

    await updateDataStoreById(
      id,
      provinsi_id,
      kabupaten_id,
      name,
      email,
      no_tlp,
      address,
      latitude,
      longitude
    );
    return res.json(Response(true, 201, `Updated Store Successfully`, {}));
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};

exports.deleteStoreList = async (req, res) => {
  const { id } = req.params;

  try {
    const resultStoreById = await getDataStoreById(id);
    if (!resultStoreById.length > 0) {
      return res.json(
        Response(false, 400, `Store Id Not Found`, {
          name: "store_id",
        })
      );
    }

    await deleteDataStoreById(id);
    return res.json(Response(true, 200, `Deleted Store Successfully`, {}));
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};

exports.detailStore = async (req, res) => {
  const { id } = req.query;

  try {
    const resultStoreById = await getDataStoreById(id);
    if (!resultStoreById.length > 0) {
      return res.json(
        Response(false, 400, `Store Id Not Found`, {
          name: "store_id",
        })
      );
    }

    const resultDataStore = await getDetailDataStore(id);
    return res.json(
      Response(true, 200, `Get Store Successfully`, resultDataStore[0])
    );
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};
