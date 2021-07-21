const tables = require("./tableNames.js");
module.exports = {
  getColumns,
  getKeyColumn,
};

function getColumns(tableName) {
  var UserCols = {
    username: "username",
    userpassword: "userpassword",
    mobile: "mobile",
    email: "email",
  };
  var VehicleCols = {
    userid: "userid",
    veh_reg_num: "veh_reg_num",
    veh_company: "veh_company",
    veh_model: "veh_model",
    veh_fuel_type:"veh_fuel_type",
    veh_mileage:"veh_mileage",
    veh_notes:"veh_notes"
  };

  switch (tableName) {
    case tables.Users:
      return UserCols;
      break;
    case tables.Vehicles:
      return VehicleCols;
      break;
    default:
      return null;
  }
}

function getKeyColumn(tableName) {
  const UserKey = "userid";
  const VehicleKey = "vehicleid";
  switch (tableName) {
    case tables.Users:
      return UserKey;
    case tables.Vehicles:
      return VehicleKey;
    default:
      return null;
  }
}
