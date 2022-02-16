const {
  getDataEmployeeAll,
  addDataEmployee,
  getDataEmployeeById,
  updateDataActiveEmployeeById,
  updateDataEmployee,
  getTotalDataEmployee,
} = require("../models/employee");
const {
  getDataProvinsiById,
  getDataKabupatenById,
  getDataKabupatenAndProvinsiById,
} = require("../models/wilayah");
const Response = require("../helpers/response");
const { ReplaceToStartUpperCase } = require("../utils/replace");
const GenerateNikEmployee = require("../utils/generateNikEmployee");
const GenerateNomorUrut = require("../utils/generateNomorUrut");
const moment = require("moment");

exports.getEmployeeList = async (req, res) => {
  let search = req.query.search || "";

  // Pagination
  const pagination = {};
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  try {
    const resultTotalCategory = await getTotalDataEmployee(search);
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

    const result = await getDataEmployeeAll(startIndex, limit, search);
    if (!result.length > 0) {
      return res.json(Response(true, 204, `Get Employee Successfully`, {}));
    }
    return res.json(
      Response(true, 200, `Get Employee Successfully`, {
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

exports.addEmployeeList = async (req, res) => {
  let {
    typeId,
    numberId,
    name,
    email,
    gender,
    placeOfDate,
    birthOfDate,
    position,
    noTlp,
    provinsiId,
    kabupatenId,
    address,
    joinDate,
  } = req.body;
  name = ReplaceToStartUpperCase(name);
  placeOfDate = ReplaceToStartUpperCase(placeOfDate);
  try {
    const resultProvinsiById = await getDataProvinsiById(provinsiId);
    if (!resultProvinsiById.length > 0) {
      return res.json(
        Response(false, 400, `Provinsi Id Not Found`, {
          name: "provinsiId",
        })
      );
    }

    const resultKabupatenById = await getDataKabupatenById(kabupatenId);
    if (!resultKabupatenById.length > 0) {
      return res.json(
        Response(false, 400, `Kabupaten Id Not Found`, {
          name: "kabupatenId",
        })
      );
    }

    const resultKabProvById = await getDataKabupatenAndProvinsiById(
      kabupatenId,
      provinsiId
    );
    if (!resultKabProvById.length > 0) {
      return res.json(
        Response(false, 400, `Kabupaten Id And Provinsi Id No Match`, {
          name: "kabupatenId",
        })
      );
    }

    const resultEmployeeAll = await getDataEmployeeAll();
    const yearsNow = moment(new Date()).format("YYYY");
    const joinMonth = moment(joinDate).format("MM");
    const nikEmployee = GenerateNikEmployee(
      yearsNow,
      joinMonth,
      position,
      GenerateNomorUrut(resultEmployeeAll.length + 1)
    );

    await addDataEmployee(
      nikEmployee,
      typeId,
      numberId,
      name,
      email,
      gender,
      placeOfDate,
      birthOfDate,
      position,
      noTlp,
      provinsiId,
      kabupatenId,
      address,
      joinDate
    );
    return res.json(Response(true, 201, `Added Employee Successfully`, {}));
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};

exports.updateEmployeeList = async (req, res) => {
  let {
    typeId,
    numberId,
    name,
    email,
    gender,
    placeOfDate,
    birthOfDate,
    position,
    noTlp,
    provinsiId,
    kabupatenId,
    address,
    joinDate,
  } = req.body;
  const { id } = req.params;

  name = ReplaceToStartUpperCase(name);
  placeOfDate = ReplaceToStartUpperCase(placeOfDate);

  try {
    const resultEmployeeId = await getDataEmployeeById(id);
    if (!resultEmployeeId.length > 0) {
      return res.json(
        Response(false, 400, `Employee Id not found`, {
          name: "employee_id",
        })
      );
    }

    // const resultCategoryNameNotById = await getDataCategoryByNameNotById(
    //   name,
    //   id
    // );
    // if (resultCategoryNameNotById.length > 0) {
    //   return res.json(
    //     Response(false, 400, `Category Name has Already`, {
    //       name: "name",
    //     })
    //   );
    // }

    const dateTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

    await updateDataEmployee(
      id,
      typeId,
      numberId,
      name,
      email,
      gender,
      placeOfDate,
      birthOfDate,
      position,
      noTlp,
      provinsiId,
      kabupatenId,
      address,
      joinDate,
      dateTime
    );

    return res.json(Response(true, 201, `Updated Employee Successfully`, {}));
  } catch (err) {
    console.log("err", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};

exports.deleteEmployeeList = async (req, res) => {
  // const { id } = req.params;
  // try {
  //   const resultCategoryId = await getDataCategoryById(id);
  //   if (!resultCategoryId.length > 0) {
  //     return res.json(
  //       Response(false, 400, `Category Id Not Found`, {
  //         name: "category_id",
  //       })
  //     );
  //   }
  //   await deleteDataCategoryById(id);
  //   return res.json(Response(true, 200, `Deleted Category Successfully`, {}));
  // } catch (err) {
  //   console.log("errr", err);
  //   const error = JSON.stringify(err, undefined, 2);
  //   return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  // }
};

exports.detailEmployee = async (req, res) => {
  const { id } = req.query;
  try {
    const result = await getDataEmployeeById(id);
    if (!result.length > 0) {
      return res.json(Response(false, 400, `Employee Id Not Found`, {}));
    }
    return res.json(
      Response(true, 200, `Get Employee Successfully`, result[0])
    );
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};

exports.updateActive = async (req, res) => {
  const { active } = req.body;
  const { id } = req.params;

  try {
    const result = await getDataEmployeeById(id);
    if (!result.length > 0) {
      return res.json(Response(false, 400, `Employee Id Not Found`, {}));
    }

    await updateDataActiveEmployeeById(id, active);
    return res.json(
      Response(true, 200, `Update Active Employee Successfully`, {})
    );
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};
