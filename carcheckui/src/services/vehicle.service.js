import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3000/';

class VehicleService {
  register(vehicle) {
    return axios.post(API_URL + 'vehicles/registerVehicle', {
      veh_reg_num    : vehicle.veh_reg_num,
      veh_company    : vehicle.veh_company,
      veh_model      : vehicle.veh_model,
      veh_fuel_type  : vehicle.veh_fuel_type,
      veh_mileage    : vehicle.veh_mileage,
      veh_notes      : vehicle.veh_notes
    });
  }
  getAllVehicles() {
    return axios.get(API_URL + 'vehicles/getAllVehicles', { headers: authHeader() });
  }
  getVehicleInfo(id) {
    return axios.get(API_URL + 'vehicles/getByIdVehicle/' + id, {
      headers: authHeader()
    });
  }
}

export default new VehicleService();
