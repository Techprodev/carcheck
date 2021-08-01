<template>
  <div class="container">
    <h1>Vehicles</h1>
    <br />    
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Reg Num</th>
          <th scope="col">Comany</th>
          <th scope="col">Model</th>
          <th scope="col">Notes</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="vehicle in vehicles" :key="vehicle.vehicleid">
          <th scope="row">{{ vehicle.vehicleid }}</th>
          <td>{{ vehicle.veh_reg_num }}</td>
          <td>{{ vehicle.veh_company }}</td>
          <td>{{ vehicle.veh_model }}</td>
          <td>{{ vehicle.veh_notes }}</td>
           <td>
            <button
              type="button" class="btn btn-primary"
              @click.prevent="getServiceRecordsByVehicle(vehicle.vehicleid)"
            >
              Service Records
            </button>
            <td>
            <button type="button" class="btn btn-primary"
              @click.prevent="addservicerecord(vehicle.vehicleid)"
            >
              Add Service Data
            </button>
           </td>
          <td>
            <button
              type="button" class="btn btn-primary"
              @click.prevent="getvehicleInfo(vehicle.vehicleid)"
            >
              Edit Vehicle
            </button>
            <td>
            &nbsp; <button type="button" class="btn btn-danger">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>    
  </div>
</template>

<script>
import VehicleService from '../services/vehicle.service';
import Vehicle from '../models/vehicle';

export default {
  name: 'Vehicles',
  data() {
    return {
      vehicle: new Vehicle(),
      vehicles: [],
      message: ''
    };
  },
  mounted() {
    this.getVehiclesByUser();
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    getVehiclesByUser() {
      VehicleService.getVehiclesByUser(this.currentUser.userid).then(
        response => {
          this.vehicles = response.data.result;
        },
        error => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
    getvehicleInfo(id) {
      VehicleService.getVehicleInfo(id).then(
        response => {
          this.vehicle = response.data.result;
        },
        error => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
    getServiceRecordsByVehicle(id) {
      this.$router.push({ name: 'servicerecords', params: { id: id }});
    },   
    editVehicle() {},
    deleteVehicle() {}
  }
};
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
</style>
