const express = require("express");
const router = express.Router();
const config = require("../common/config/config.json");
const tables = require("../helpers/tableNames.js");
const tablecols = require("../helpers/tableColumns.js");
const fndb = require("../helpers/dbFunctions.js");
const jwt = require("jsonwebtoken");

router.post("/registerVehicle", registerVehicle);
router.post("/authenticate", authenticate);
router.get("/getAllVehicle", getAllVehicle);
router.get("/getByIdVehicle/:id", getByIdVehicle);
router.put("/updateVehicle/:id", updateVehicle);
router.delete("/deleteVehicle/:id", deleteVehicle);
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

async function authenticate(req, res) {
  var resp = new Object();
  try {
    let result = await fndb.getItemByColumn(
      tables.Users,
      "username",
      req.body.username
    );

    if (result.length > 0) {
      let usr = result[0];
      if (req.body.userpassword == usr["userpassword"]) {
        usr["userpassword"] = "";
      }
      const token = jwt.sign({ sub: usr.Id }, config.jwt_secret);
      usr.token = token;
      resp.result = usr;
      resp.success = true;
      resp.message = "user authenticated";
    } else {
      resp.result = null;
      resp.success = false;
      resp.message = "Error: Invalid User Name or Password";
    }
  } catch (err) {
    console.log("User Service - authenticate" + err);
    resp.result = null;
    resp.success = false;
    resp.message = "Error: User Login";
  }
  return res.send(resp);
}

async function getAllVehicle(req, res) {
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
