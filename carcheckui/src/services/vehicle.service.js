import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3000/';

class VehicleService {
    
  getAllVehicles() {
    return axios.get(API_URL + 'vehicles/getAllVehicles', { headers: authHeader() });
  }
  getVehiclesByUser(id) {
    return axios.get(API_URL + 'vehicles/getVehiclesByUser/' + id, { headers: authHeader() });
  }
  getServiceRecordsByVehicle(id) {
    return axios.get(API_URL + 'vehicles/getServiceRecordsByVehicle/' + id, { headers: authHeader() });
  }
  getByIdServiceRecord(id) {
    return axios.get(API_URL + 'vehicles/getByIdServiceRecord/' + id, { headers: authHeader() });
  }
  getByIdVehicleRecord(id) {
    return axios.get(API_URL + 'vehicles/getByIdVehicleRecord/' + id, { headers: authHeader() });
  }
  getVehicleInfo(id) {
    return axios.get(API_URL + 'vehicles/getByIdVehicle/' + id, {
      headers: authHeader()
    });
  }  
}

export default new VehicleService();
