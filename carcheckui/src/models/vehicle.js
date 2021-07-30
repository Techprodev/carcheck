export default class Vehicle {
  constructor(userid, veh_reg_num, veh_company, veh_model, veh_fuel_type, veh_mileage, veh_notes ) {
    this.userid        = userid;
    this.veh_reg_num   = veh_reg_num;
    this.veh_company   = veh_company;  
    this.veh_model     = veh_model;   
    this.veh_fuel_type = veh_fuel_type;  
    this.veh_mileage   = veh_mileage;
    this.veh_notes     = veh_notes
  }
}
