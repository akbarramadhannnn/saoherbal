const {
  addDataOperasionalCost,
  addMultipleDataOperasionalCostDetail,
  getDataOperasionalCostByDate,
  getDataOperasionalCostList,
  getTotalDataOperasionalCost,
  getDataOperasionalCostById,
  getDataOperasionalCostDetailByOperasionalCostId,
  updateDataOperasionalCost,
  updateMultipleDataOperasionalCostDetail,
} = require("../models/operasionalcost");
const moment = require("moment");
const Response = require("../helpers/response");

exports.getOperasionalCostList = async (req, res) => {
  // Pagination
  const pagination = {};
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  try {
    const resultTotal = await getTotalDataOperasionalCost();
    const total = resultTotal[0].total;
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

    const result = await getDataOperasionalCostList(startIndex, limit);
    if (!result.length > 0) {
      return res.json(Response(true, 204, `Get Operasional Successfully`, {}));
    }

    return res.json(
      Response(true, 200, `Get Operasional Cost Successfully`, {
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

exports.getOperasionalCostDetail = async (req, res) => {
  const { id } = req.query;
  try {
    const result = await getDataOperasionalCostById(id);
    if (!result.length > 0) {
      return res.json(Response(true, 400, `Operasional Cost Id Not Found`, {}));
    }

    const resutListItem = await getDataOperasionalCostDetailByOperasionalCostId(
      id
    );
    result[0].listItem = resutListItem;
    return res.json(
      Response(true, 200, `Get Operasional Cost Detail Successfully`, {
        data: result[0],
      })
    );
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};

exports.addOperasionalCostDetail = async (req, res) => {
  const { itemList } = req.body;
  try {
    const date = moment(new Date()).format("YYYY-MM-DD");
    const resultByDate = await getDataOperasionalCostByDate(date);
    if (resultByDate.length > 0) {
      return res.json(
        Response(true, 400, `Can't add data, data has already added`, {})
      );
    }

    const filterName = itemList.filter((d) => d.itemName === "" || !d.itemName);
    if (filterName.length > 0) {
      return res.json(Response(true, 400, `Name is Required`, {}));
    }

    const filterItemName = itemList.filter(
      (item, index) =>
        itemList.map((d) => d.itemName).indexOf(item.itemName) !== index
    );
    if (filterItemName.length > 0) {
      return res.json(Response(true, 400, `Name is Not Same`, {}));
    }

    const filterPrice = itemList.filter((d) => d.price === "" || !d.price);
    if (filterPrice.length > 0) {
      return res.json(Response(true, 400, `Price is Required`, {}));
    }

    const filterQuantity = itemList.filter(
      (d) => d.quantity === "" || !d.quantity
    );
    if (filterQuantity.length > 0) {
      return res.json(Response(true, 400, `Quantity is Required`, {}));
    }

    const filterUnit = itemList.filter((d) => d.unit === "" || !d.unit);
    if (filterUnit.length > 0) {
      return res.json(Response(true, 400, `Unit is Required`, {}));
    }

    for (let i = 0; i < itemList.length; i++) {
      const price = itemList[i].price;
      const quantity = itemList[i].quantity;
      itemList[i].total = price * quantity;
    }

    const subtotal = itemList.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.total;
    }, 0);
    const resultAdd = await addDataOperasionalCost(subtotal);
    const itemArr = [];
    for (let i = 0; i < itemList.length; i++) {
      itemArr.push([
        resultAdd.insertId,
        itemList[i].itemName,
        itemList[i].price,
        itemList[i].quantity,
        itemList[i].unit,
        itemList[i].total,
      ]);
    }
    await addMultipleDataOperasionalCostDetail(itemArr);
    return res.json(
      Response(true, 201, `Added Operasional Cost Successfully`, {})
    );
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};

exports.updateOperasionalCost = async (req, res) => {
  const { id } = req.params;
  const { itemList } = req.body;

  try {
    const resultData = await getDataOperasionalCostById(id);
    if (!resultData.length > 0) {
      return res.json(Response(true, 400, `Operasional Cost Id Not Found`, {}));
    }

    const filterIdItem = itemList.filter((d) => d.itemId === "");
    if (filterIdItem.length > 0) {
      return res.json(Response(true, 400, `Item Id is Required`, {}));
    }

    const filterName = itemList.filter((d) => d.itemName === "" || !d.itemName);
    if (filterName.length > 0) {
      return res.json(Response(true, 400, `Name is Required`, {}));
    }

    const filterItemName = itemList.filter(
      (item, index) =>
        itemList.map((d) => d.itemName).indexOf(item.itemName) !== index
    );
    if (filterItemName.length > 0) {
      return res.json(Response(true, 400, `Name is Not Same`, {}));
    }

    const filterPrice = itemList.filter((d) => d.price === "" || !d.price);
    if (filterPrice.length > 0) {
      return res.json(Response(true, 400, `Price is Required`, {}));
    }

    const filterQuantity = itemList.filter(
      (d) => d.quantity === "" || !d.quantity
    );
    if (filterQuantity.length > 0) {
      return res.json(Response(true, 400, `Quantity is Required`, {}));
    }

    const filterUnit = itemList.filter((d) => d.unit === "" || !d.unit);
    if (filterUnit.length > 0) {
      return res.json(Response(true, 400, `Unit is Required`, {}));
    }

    const arrAddData = [];
    const listTotal = [];
    for (let i = 0; i < itemList.length; i++) {
      if (itemList[i].itemId === undefined) {
        const total = itemList[i].price * itemList[i].quantity;
        arrAddData.push([
          id,
          itemList[i].itemName,
          itemList[i].price,
          itemList[i].quantity,
          itemList[i].unit,
          total,
        ]);
        listTotal.push(total);
      } else {
        const total = itemList[i].price * itemList[i].quantity;
        await updateMultipleDataOperasionalCostDetail([
          itemList[i].itemName,
          itemList[i].price,
          itemList[i].quantity,
          itemList[i].unit,
          total,
          itemList[i].itemId,
        ]);
        listTotal.push(total);
      }
    }

    const listOperasionalCostDetail =
      await getDataOperasionalCostDetailByOperasionalCostId(id);
    const subTotal = listOperasionalCostDetail.reduce((a, b) => {
      return a.total + b.total;
    });
    await updateDataOperasionalCost(id, subTotal);

    if (arrAddData.length > 0) {
      await addMultipleDataOperasionalCostDetail(arrAddData);
    }

    return res.json(
      Response(true, 201, `Updated Operasional Cost Successfully`, {})
    );
  } catch (err) {
    console.log("errr", err);
    const error = JSON.stringify(err, undefined, 2);
    return res.json(Response(false, 500, `Error`, JSON.parse(error)));
  }
};
