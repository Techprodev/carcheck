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
    roletype: "roletype"
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
  var ServiceCols = {
    vehicleid: "vehicleid",
    veh_checkin_date: "veh_checkin_date",
    veh_delivery_date: "veh_delivery_date",
    veh_invoice_num: "veh_invoice_num",
    veh_total_bill_amount: "veh_total_bill_amount",
    veh_amount_paid_advance: "veh_amount_paid_advance",
    veh_amount_paid_due: "veh_amount_paid_due",
    veh_payment_type: "veh_payment_type",
    veh_service_type: "veh_service_type",
    veh_service_desc: "veh_service_desc",
    veh_contact_name: "veh_contact_name",
    veh_contact_num: "veh_contact_num", 
    veh_mileage_service:"veh_mileage_service"
  };

  switch (tableName) {
    case tables.Users:
      return UserCols;
      break;
    case tables.Vehicles:
      return VehicleCols;
      break;
    case tables.Services:
      return ServiceCols;
      break;
    default:
      return null;
  }
}

function getKeyColumn(tableName) {
  const UserKey = "userid";
  const VehicleKey = "vehicleid";
  const ServiceKey = "serviceid";
  switch (tableName) {
    case tables.Users:
      return UserKey;
    case tables.Vehicles:
      return VehicleKey;
    case tables.Services:
      return ServiceKey;
    default:
      return null;
  }
}
