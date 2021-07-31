const express = require("express");
const router = express.Router();
const config = require("../common/config/config.json");
const tables = require("../helpers/tableNames.js");
const tablecols = require("../helpers/tableColumns.js");
const fndb = require("../helpers/dbFunctions.js");
const jwt = require("jsonwebtoken");

router.post("/registerVehicle", registerVehicle);
router.get("/getAllVehicles", getAllVehicles);
router.get("/getVehiclesByUser/:id", getVehiclesByUser);
router.get("/getServiceRecordsByVehicle/:id", getServiceRecordsByVehicle);
router.get("/getByIdVehicle/:id", getByIdVehicle);
router.put("/updateVehicle/:id", updateVehicle);
router.delete("/deleteVehicle/:id", deleteVehicle);
router.post("/addServiceRecord", addServiceRecord);


module.exports = router;

async function registerVehicle(req, res) {
  var resp = new Object();
  try {
    let newVehicle = req.body;
    const cols = tablecols.getColumns(tables.Vehicles);
    var chkVehicle = await fndb.getItemByColumn(
      tables.Vehicles,
      "veh_reg_num",
      newVehicle.veh_reg_num
    );
    if (chkVehicle && chkVehicle.length > 0) {
      resp.result = null;
      resp.success = false;
      resp.message = "Error: Vehicle already registered";
      return res.send(resp);
    }
    var result = await fndb.addNewItem(tables.Vehicles, newVehicle);
    
    if (result) {
      resp.result = result;
      resp.success = true;
      resp.message = "Saved Record";
    } else {
      resp.result = null;
      resp.success = false;
      resp.message = "Error: Error in saving information";
      console.log("registerVehicle", "Error in register vehicle");
    }
  } catch (err) {
    console.log("Vehicle Service - registerVehicle" + err);
    resp.result = null;
    resp.success = false;
    resp.message = "Error: Error in saving information";
  }
  return res.send(resp);
}

async function getAllVehicles(req, res) {
  var resp = new Object();
  try {
    var result = await fndb.getAllItems(tables.Vehicles);
    if (result) {
      resp.result = result;
      resp.success = true;
      resp.message = "All Vehicles";
    } else {
      resp.result = null;
      resp.success = false;
      resp.message = "Error: Error in getting vehicle information";
    }
  } catch (err) {
    console.log("Vehicle Service - getAllVehicle" + err);
    resp.result = null;
    resp.success = false;
    resp.message = "Error: Error in getting vehicle data";
  }
  return res.send(resp);
}

async function getByIdVehicle(req, res) {
  var resp = new Object();
  try {
    var result = await fndb.getItemById(tables.Vehicles, req.params.id);
    if (result) {
      resp.result = result;
      resp.success = true;
      resp.message = "All vehicle data";
    } else {
      resp.result = null;
      resp.success = false;
      resp.message = "Error: Error in getting vehicle information";
    }
  } catch (err) {
    console.log("Vehicle Service - getByIdVehicle" + err);
    resp.result = null;
    resp.success = false;
    resp.message = "Error: Error in getting vehicle information";
  }
  return res.send(resp);
}

async function getVehiclesByUser(req, res) {
  var resp = new Object();
  try {
    var result = await fndb.getItemByColumn(tables.Vehicles, "userid", req.params.id);
    if (result) {
      resp.result = result;
      resp.success = true;
      resp.message = "Vehicles of user";
    } else {
      resp.result = null;
      resp.success = false;
      resp.message = "Error: Error in getting vehicles of user";
    }
  } catch (err) {
    console.log("Vehicle Service - getItemByColumn " + err);
    resp.result = null;
    resp.success = false;
    resp.message = "Error: Error in getting vehicles of user";
  }
  return res.send(resp);
}

async function getServiceRecordsByVehicle(req, res) {
  var resp = new Object();
  try {
    var result = await fndb.getItemByColumn(tables.Services, "vehicleid", req.params.id);
    if (result) {
      resp.result = result;
      resp.success = true;
      resp.message = "Service Records of Vehicle";
    } else {
      resp.result = null;
      resp.success = false;
      resp.message = "Error: Error in getting service records of vehicle";
    }
  } catch (err) {
    console.log("Vehicle Service - getItemByColumn " + err);
    resp.result = null;
    resp.success = false;
    resp.message = "Error: Error in getting service records";
  }
  return res.send(resp);
}

async function updateVehicle(req, res) {
  var resp = new Object();
  try {
    var result = await fndb.updateItem(tables.Vehicles, req.params.id, req.body);

    if (result) {
      resp.result = result;
      resp.success = true;
      resp.message = "Updated Vehicle data";
    } else {
      resp.result = null;
      resp.success = false;
      resp.message = "Error: Error in saving vehicle information";
      console.log("updateVehicle", "Error in saving vehicle data");
    }
  } catch (err) {
    console.log("Vehicle Service - updateVehicle " + err);
    resp.result = null;
    resp.success = false;
    resp.message = "Error: Error in update vehicle - vehicle service";
  }
  return res.send(resp);
}

async function deleteVehicle(req, res) {
  var resp = new Object();
  try {
    var result = await fndb.deleteItem(tables.Vehicles, req.params.id);

    if (result) {
      resp.result = result;
      resp.success = true;
      resp.message = "Save Vehicle Data";
    } else {
      resp.result = null;
      resp.success = false;
      resp.message = "Error: Error in delete vehicle ";
    }
  } catch (err) {
    console.log("Vehicle Service - deleteVehicle " + err);
    resp.result = null;
    resp.success = false;
    resp.message = "Error: Error in delete vehicle";
  }
  return res.send(resp);
}

async function addServiceRecord(req, res) {
  var resp = new Object();
  try {
    let newService = req.body;
    const cols = tablecols.getColumns(tables.Services);   
    var result = await fndb.addNewItem(tables.Services, newService);
    
    if (result) {
      resp.result = result;
      resp.success = true;
      resp.message = "Saved Service Record";
    } else {
      resp.result = null;
      resp.success = false;
      resp.message = "Error: Error in creating Service Record";
      console.log("Add Service Record", "Error in adding service record");
    }
  } catch (err) {
    console.log("Vehicle Service - Add Service Record" + err);
    resp.result = null;
    resp.success = false;
    resp.message = "Error: Error in creating service record";
  }
  return res.send(resp);
}
