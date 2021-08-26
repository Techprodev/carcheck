<template>
  <div class="container">
    <h2>Registration {{ vehicle.veh_reg_num }} </h2>
    <br />  
     <button type="button" v-if="vehicle.vehicleid!=0" class="btn btn-primary" 
        @click.prevent="editvehicle(vehicle.vehicleid)">
        Edit
     </button>
      &nbsp;&nbsp;&nbsp;
              <button
        type="button" class="btn btn-primary"
        @click.prevent="getServiceRecordsByVehicle(vehicle.vehicleid)"
      >
        Service Records
      </button>
    <br />
    <br />
    <br />   
    <div>                  
    </div>
    <p><strong>Company : </strong>{{ vehicle.veh_company }}</p>
    <p><strong>Model   : </strong>{{ vehicle.veh_model }}</p>
    <p><strong>Fuel    : </strong>{{ vehicle.veh_fuel_type }}</p>
    <p><strong>Mileage : </strong>{{ vehicle.veh_mileage }}</p>
    <p><strong>Notes   : </strong>{{ vehicle.veh_notes }}</p>
       
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
          this.vehicle = response.data.result[0];    
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
