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
} = require("../models/store");
const {
  getDataProvinsiById,
  getDataKabupatenById,
  getDataKabupatenAndProvinsiById,
} = require("../models/wilayah");
const Response = require("../helpers/response");
const { ReplaceToStartUpperCase } = require("../utils/replace");

exports.getStoreList = (req, res) => {
  getDataStoreAll((err, result) => {
    if (err) {
      const error = JSON.stringify(err, undefined, 2);
      return res.json(Response(false, 500, `Error`, JSON.parse(error)));
    }

    if (!result.length > 0) {
      return res.json(Response(true, 204, `Get Store Successfully`, result));
    }
    return res.json(Response(true, 200, `Get Store Successfully`, result));
  });
};

exports.addStoreList = (req, res) => {
  let { provinsi_id, kabupaten_id, name, email, no_tlp, address } = req.body;
  name = ReplaceToStartUpperCase(name);
  getDataProvinsiById(provinsi_id, (errProvinsi, resultProvinsi) => {
    if (errProvinsi) {
      const error = JSON.stringify(errProvinsi, undefined, 2);
      return res.json(Response(false, 500, `Error`, JSON.parse(error)));
    } else if (!resultProvinsi.length > 0) {
      return res.json(
        Response(false, 400, `Provinsi Id Not Found`, {
          name: "provinsi_id",
        })
      );
    } else {
      getDataKabupatenById(kabupaten_id, (errKabupaten, resultKabupaten) => {
        if (errKabupaten) {
          const error = JSON.stringify(errKabupaten, undefined, 2);
          return res.json(Response(false, 500, `Error`, JSON.parse(error)));
        } else if (!resultKabupaten.length > 0) {
          return res.json(
            Response(false, 400, `Kabupaten Id Not Found`, {
              name: "kabupaten_id",
            })
          );
        } else {
          getDataKabupatenAndProvinsiById(
            kabupaten_id,
            provinsi_id,
            (errKabProv, resultKabProv) => {
              if (errKabProv) {
                const error = JSON.stringify(errKabProv, undefined, 2);
                return res.json(
                  Response(false, 500, `Error`, JSON.parse(error))
                );
              } else if (!resultKabProv.length > 0) {
                return res.json(
                  Response(
                    false,
                    400,
                    `Kabupaten Id And Provinsi Id No Match`,
                    {
                      name: "kabupaten_id",
                    }
                  )
                );
              } else {
                getDataStoreByName(name, (errName, resultName) => {
                  if (errName) {
                    const error = JSON.stringify(errName, undefined, 2);
                    return res.json(
                      Response(false, 500, `Error`, JSON.parse(error))
                    );
                  } else if (resultName.length > 0) {
                    return res.json(
                      Response(false, 400, `Name Has Already`, {
                        name: "name",
                      })
                    );
                  } else {
                    getDataStoreByEmail(email, (errEmail, resultEmail) => {
                      if (errEmail) {
                        const error = JSON.stringify(errEmail, undefined, 2);
                        return res.json(
                          Response(false, 500, `Error`, JSON.parse(error))
                        );
                      } else if (resultEmail.length > 0) {
                        return res.json(
                          Response(false, 400, `Email Has Already`, {
                            name: "email",
                          })
                        );
                      } else {
                        getDataStoreByNoTlp(no_tlp, (errNoTlp, resultNoTlp) => {
                          if (errNoTlp) {
                            const error = JSON.stringify(
                              errNoTlp,
                              undefined,
                              2
                            );
                            return res.json(
                              Response(false, 500, `Error`, JSON.parse(error))
                            );
                          } else if (resultNoTlp.length > 0) {
                            return res.json(
                              Response(false, 400, `No Tlp Has Already`, {
                                name: "no_tlp",
                              })
                            );
                          } else {
                            addDataStore(
                              provinsi_id,
                              kabupaten_id,
                              name,
                              email,
                              no_tlp,
                              address,
                              (errAdd, resultAdd) => {
                                if (errAdd) {
                                  const error = JSON.stringify(
                                    errAdd,
                                    undefined,
                                    2
                                  );
                                  return res.json(
                                    Response(
                                      false,
                                      500,
                                      `Error`,
                                      JSON.parse(error)
                                    )
                                  );
                                }
                                return res.json(
                                  Response(
                                    true,
                                    201,
                                    `Added Store Successfully`,
                                    {}
                                  )
                                );
                              }
                            );
                          }
                        });
                      }
                    });
                  }
                });
              }
            }
          );
        }
      });
    }
  });
};

exports.updateStoreList = (req, res) => {
  const { id } = req.params;
  let { provinsi_id, kabupaten_id, name, email, no_tlp, address } = req.body;
  name = ReplaceToStartUpperCase(name);
  getDataStoreById(id, (errGetStore, resultGetStore) => {
    if (errGetStore) {
      const error = JSON.stringify(errGetStore, undefined, 2);
      return res.json(Response(false, 500, `Error`, JSON.parse(error)));
    } else if (!resultGetStore.length > 0) {
      return res.json(
        Response(false, 400, `Store Id Not Found`, {
          name: "store_id",
        })
      );
    } else {
      getDataProvinsiById(provinsi_id, (errProvinsi, resultProvinsi) => {
        if (errProvinsi) {
          const error = JSON.stringify(errProvinsi, undefined, 2);
          return res.json(Response(false, 500, `Error`, JSON.parse(error)));
        } else if (!resultProvinsi.length > 0) {
          return res.json(
            Response(false, 400, `Provinsi Id Not Found`, {
              name: "provinsi_id",
            })
          );
        } else {
          getDataKabupatenById(
            kabupaten_id,
            (errKabupaten, resultKabupaten) => {
              if (errKabupaten) {
                const error = JSON.stringify(errKabupaten, undefined, 2);
                return res.json(
                  Response(false, 500, `Error`, JSON.parse(error))
                );
              } else if (!resultKabupaten.length > 0) {
                return res.json(
                  Response(false, 400, `Kabupaten Id Not Found`, {
                    name: "kabupaten_id",
                  })
                );
              } else {
                getDataKabupatenAndProvinsiById(
                  kabupaten_id,
                  provinsi_id,
                  (errKabProv, resultKabProv) => {
                    if (errKabProv) {
                      const error = JSON.stringify(errKabProv, undefined, 2);
                      return res.json(
                        Response(false, 500, `Error`, JSON.parse(error))
                      );
                    } else if (!resultKabProv.length > 0) {
                      return res.json(
                        Response(
                          false,
                          400,
                          `Kabupaten Id And Provinsi Id No Match`,
                          {
                            name: "kabupaten_id",
                          }
                        )
                      );
                    } else {
                      getDataStoreByNameNotById(
                        name,
                        id,
                        (errName, resultName) => {
                          if (errName) {
                            const error = JSON.stringify(errName, undefined, 2);
                            return res.json(
                              Response(false, 500, `Error`, JSON.parse(error))
                            );
                          } else if (resultName.length > 0) {
                            return res.json(
                              Response(false, 400, `Name Has Already`, {
                                name: "name",
                              })
                            );
                          } else {
                            getDataStoreByEmailNotById(
                              email,
                              id,
                              (errEmail, resultEmail) => {
                                if (errEmail) {
                                  const error = JSON.stringify(
                                    errEmail,
                                    undefined,
                                    2
                                  );
                                  return res.json(
                                    Response(
                                      false,
                                      500,
                                      `Error`,
                                      JSON.parse(error)
                                    )
                                  );
                                } else if (resultEmail.length > 0) {
                                  return res.json(
                                    Response(false, 400, `Email Has Already`, {
                                      name: "email",
                                    })
                                  );
                                } else {
                                  getDataStoreByNoTlpNotById(
                                    no_tlp,
                                    id,
                                    (errNoTlp, resultNoTlp) => {
                                      if (errNoTlp) {
                                        const error = JSON.stringify(
                                          errNoTlp,
                                          undefined,
                                          2
                                        );
                                        return res.json(
                                          Response(
                                            false,
                                            500,
                                            `Error`,
                                            JSON.parse(error)
                                          )
                                        );
                                      } else if (resultNoTlp.length > 0) {
                                        return res.json(
                                          Response(
                                            false,
                                            400,
                                            `No Tlp Has Already`,
                                            {
                                              name: "no_tlp",
                                            }
                                          )
                                        );
                                      } else {
                                        updateDataStoreById(
                                          id,
                                          provinsi_id,
                                          kabupaten_id,
                                          name,
                                          email,
                                          no_tlp,
                                          address,
                                          (errAdd, resultAdd) => {
                                            if (errAdd) {
                                              const error = JSON.stringify(
                                                errAdd,
                                                undefined,
                                                2
                                              );
                                              return res.json(
                                                Response(
                                                  false,
                                                  500,
                                                  `Error`,
                                                  JSON.parse(error)
                                                )
                                              );
                                            }
                                            return res.json(
                                              Response(
                                                true,
                                                201,
                                                `Updated Store Successfully`,
                                                {}
                                              )
                                            );
                                          }
                                        );
                                      }
                                    }
                                  );
                                }
                              }
                            );
                          }
                        }
                      );
                    }
                  }
                );
              }
            }
          );
        }
      });
    }
  });
};

exports.deleteStoreList = (req, res) => {
  const { id } = req.params;
  getDataStoreById(id, (errData, resultData) => {
    if (errData) {
      const error = JSON.stringify(errData, undefined, 2);
      return res.json(Response(false, 500, `Error`, JSON.parse(error)));
    } else if (!resultData.length > 0) {
      return res.json(
        Response(false, 400, `Store Id Not Found`, {
          name: "store_id",
        })
      );
    } else {
      deleteDataStoreById(id, (errDelete, resultDelete) => {
        if (errDelete) {
          const error = JSON.stringify(errDelete, undefined, 2);
          return res.json(Response(false, 500, `Error`, JSON.parse(error)));
        }
        return res.json(Response(true, 200, `Deleted Store Successfully`, {}));
      });
    }
  });
};

exports.detailStore = (req, res) => {
  const { id } = req.query;

  getDataStoreById(id, (errGetStore, resultGetStore) => {
    if (errGetStore) {
      const error = JSON.stringify(errGetStore, undefined, 2);
      return res.json(Response(false, 500, `Error`, JSON.parse(error)));
    } else if (!resultGetStore.length > 0) {
      return res.json(Response(false, 400, `Store Id Not Found`, {}));
    } else {
      getDetailDataStore(id, (err, result) => {
        if (err) {
          const error = JSON.stringify(err, undefined, 2);
          return res.json(Response(false, 500, `Error`, JSON.parse(error)));
        }
        return res.json(
          Response(true, 200, `Get Store Successfully`, result[0])
        );
      });
    }
  });
};
