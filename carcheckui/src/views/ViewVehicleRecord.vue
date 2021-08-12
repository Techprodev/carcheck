<template>
  <div class="container">
    <h1>Vehicle Record </h1>
    <br />    
    <div>
      
  
            
    </div>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Registration</th>
          <th scope="col">Company</th>
          <th scope="col">Model</th>
          <th scope="col">Fuel</th>
          <th scope="col">Mileage</th>
          <th scope="col">Notes</th>                     
        </tr>
      </thead>
      <tbody>
        <tr v-for="vehicle in vehicles" :key="vehicle.vehicleid">     
          <th scope="row">{{ vehicle.vehicleid }}</th>
          <td>{{ vehicle.veh_reg_num }}</td>
          <td>{{ vehicle.veh_company }}</td>
          <td>{{ vehicle.veh_model }}</td>  
          <td>{{ vehicle.veh_fuel_type }}</td>
          <td>{{ vehicle.veh_mileage }}</td>
          <td>{{ vehicle.veh_notes }}</td>   
          <td>
            <button type="button" v-if="vehicle.vehicleid!=0" class="btn btn-primary" 
        @click.prevent="editvehicle(vehicle.vehicleid)">
        Edit
      </button>&nbsp;&nbsp;&nbsp;
              <button
        type="button" class="btn btn-primary"
        @click.prevent="getServiceRecordsByVehicle(vehicle.vehicleid)"
      >
        Service Records
      </button>&nbsp;&nbsp;
      <button type="button" class="btn btn-danger" 
        @click.prevent="deletevehiclerecord(vehicle.vehicleid)">
        Delete
      </button>
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
  name: 'viewvehiclerecord',
  data() {
    return {
      vehicle: new Vehicle(),
      vehicles: [],
      message: ''
    };
  },
  mounted() {
    this.getByIdVehicleRecord();
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {   
    getByIdVehicleRecord() {
      VehicleService.getByIdVehicleRecord(this.$route.params.id).then(
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
    getServiceRecordsByVehicle(id) {
      this.$router.push({ name: 'servicerecords', params: { id: id }});
    },  
    editvehicle(id) {
      this.$router.push({ name: 'editvehiclerecord', params: { id: id }});
    },
   
    deleteVehicleRecord() {}
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
