<template>
  <div class="container">
    <h1>Service Records</h1>
    <br />    
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Invoice</th>
          <th scope="col">Received Date</th>
          <th scope="col">Delivery Date</th>
          <th scope="col">Bill Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="service in services" :key="service.serviceid">
          <th scope="row">{{ service.serviceid }}</th>
          <td>{{ service.veh_invoice_num }}</td>
          <td>{{ service.veh_checkin_date }}</td>
          <td>{{ service.veh_delivery_date }}</td>            
          <td>{{ service.veh_total_bill_amount }}</td>
           <td>
            <button
              type="button" class="btn btn-primary"
              @click.prevent="getserviceinfo(this.service.serviceid)"
            >
              View Service Data
            </button>
           </td>
           <td>
            <button
              type="button" class="btn btn-primary"
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
              Edit
            </button>
            &nbsp; <button type="button" class="btn btn-danger">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>   
  </div>
</template>

<script>
import VehicleService from '../services/vehicle.service';
import Service from '../models/service';

export default {
  name: 'ServiceRecords',
  data() {
    return {
      service: new Service(),
      services: [],
      message: ''
    };
  },
  mounted() {
    this.getServiceRecordsByVehicle();
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {   
    getServiceRecordsByVehicle() {
      VehicleService.getServiceRecordsByVehicle(this.$route.params.id).then(
        response => {
          this.services = response.data.result;
          this.showModal = false;
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
    editServiceRecord() {},
    deleteServiceRecord() {}
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
