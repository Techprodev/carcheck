<template>
  <div class="container">
    <h1>Service Record </h1>
    <br />  
    <div>
      <button 
              type="button" class="btn btn-primary"
              @click.prevent="getServiceRecordsByVehicle(service.vehicleid)"
            >
              All Service Records
            </button>&nbsp;&nbsp;
      <button type="button" v-if="service.serviceid!=0" class="btn btn-primary" 
        @click.prevent="editservicerecord(service.serviceid)">
        Edit
      </button>            
    </div><br/>
    <p><strong>Invoice          : </strong>{{ service.veh_invoice_num }}</p>
    <p><strong>Checkin Date     : </strong>{{ formatDate(service.veh_checkin_date) }}</p>
    <p><strong>Delivery Date    : </strong>{{ formatDate(service.veh_delivery_date) }}</p>
    <p><strong>Total Amount     : </strong>{{ service.veh_total_bill_amount }}</p>
    <p><strong>Advance Paid     : </strong>{{ service.veh_amount_paid_advance }}</p>
    <p><strong>Payment Type     : </strong>{{ service.veh_payment_type }}</p>
    <p><strong>Service Type     : </strong>{{ service.veh_service_type }}</p>
    <p><strong>Service Description : </strong>{{ service.veh_service_desc }}</p>
    <p><strong>Contact Name     : </strong>{{ service.veh_contact_name }}</p>
    <p><strong>Contact Number   : </strong>{{ service.veh_contact_num }}</p>
    <p><strong>Vehicle Mileage  : </strong>{{ service.veh_mileage_service }}</p>

  </div>
</template>

<script>
import VehicleService from '../services/vehicle.service';
import Service from '../models/service';

export default {
  name: 'viewservicerecord',
  data() {
    return {
      service: new Service(),
      message: ''
    };
  },
  mounted() {
    this.getByIdServiceRecord();
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {   
    getByIdServiceRecord() {
      VehicleService.getByIdServiceRecord(this.$route.params.id).then(
        response => {
          this.service = response.data.result[0];    
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
    editservicerecord(id) {
      this.$router.push({ name: 'editservicerecord', params: { id: id }});
    },
     getServiceRecordsByVehicle(id) {
      this.$router.push({ name: 'servicerecords', params: { id: id }});
    },
    formatDate(dateString) {
            const date = new Date(dateString);
                // Then specify how you want your dates to be formatted
            return new Intl.DateTimeFormat('en-GB', {dateStyle: 'short'}).format(date);
    }               
  }
};
</script>

<style>

</style>
