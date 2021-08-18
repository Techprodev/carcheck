<template>
  <div class="container">
    <h1>Service Records</h1>
    <br />    
    <table class="table table-hover" v-if="services.length > 0">
      <thead>
        <tr>
          <th scope="col" rowspan="5">Invoice</th>                  
          <th scope="col">Received Date</th>
          <th scope="col">Delivery Date</th>          
          <th scope="col">Mobile Number</th>
          <th scope="col">Total Amount</th>
          <th scope="col">Amount Paid Advance</th>
          <th scope="col">Amount Paid Due</th>
          <th scope="col">Payment Type</th>
          <th scope="col">Vehicle Service Type</th>
          <th scope="col">Vehicle Service Desc</th>
          
        </tr>
      </thead>
      <tbody>
        <tr v-for="service in services" :key="service.serviceid">
          <th scope="row">{{ service.veh_invoice_num }}</th>                  
          <td>{{ formatDate(service.veh_checkin_date) }}</td>
          <td>{{ formatDate(service.veh_delivery_date) }}</td>
          <td>{{ service.veh_contact_num }}</td>
          <td>{{ service.veh_total_bill_amount }}</td>
          <td>{{ service.veh_amount_paid_advance }}</td>
          <td>{{ service.veh_amount_paid_due }}</td>
          <td>{{ service.veh_payment_type}}</td>
          <td>{{ service.veh_service_type}}</td>
          <td>{{ service.veh_service_desc}}</td>                     
           <td>
            <button
              type="button" class="btn btn-primary"
              @click.prevent="getByIdServiceRecord(service.serviceid)"
            >
              View
            </button>
           </td>
           <td>            
            <button type="button" v-if="service.serviceid!=0" class="btn btn-primary" 
              @click.prevent="editservicerecord(service.serviceid)">
              Edit
            </button>
           </td>
          <td>          
            <button type="button" class="btn btn-danger"               
              @click.prevent="showAlertConfirm(service.serviceid)">  
              Delete
          </button>
          </td>
        </tr>
      </tbody>
    </table>  
      <div v-if="services.length == 0">
         <h2>No Service Records </h2>
      </div> 
  </div>
</template>

<script>
import VehicleService from '../services/vehicle.service';
import Service from '../models/service';
import axios from 'axios';

const API_URL = 'http://localhost:3000/';

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
    getByIdServiceRecord(id) {
      this.$router.push({ name: 'viewservicerecord', params: { id: id }});
    }, 
    editservicerecord(id) {
      this.$router.push({ name: 'editservicerecord', params: { id: id }});
    },
    showAlertConfirm(id){
            this.$swal({
              title: 'Are you sure?',
              text: "You won't be able to revert this!",
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'submit'          
            }).then((result) => {                 
              if (result.isConfirmed) {                                                              
                 this.deleteServiceRecord(id);               
              }
            });
    },   
    deleteServiceRecord(id) {
      return axios.delete(API_URL + 'vehicles/deleteService/' + id ).then(
            data => {
              this.message = data.message;
              this.successful = true;              
              this.$swal('Vehicle Service Record Deleted successfully');
              window.location.reload();                      
            },
            error => {
              this.message =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
              this.successful = false;
            }
      );
    },
    formatDate(dateString) {
            const date = new Date(dateString);
                // Then specify how you want your dates to be formatted
            return new Intl.DateTimeFormat('en-EN', {dateStyle: 'short'}).format(date);
    }       
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
table,thead,tr,th,td,tbody{
  border-style: solid;
}
</style>
