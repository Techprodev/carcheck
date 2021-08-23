<template>
  <div class="container">
    <h1>Service Record </h1>
    <br />  
    <div>
      <button type="button" v-if="service.serviceid!=0" class="btn btn-primary" 
        @click.prevent="editservicerecord(service.serviceid)">
        Edit
      </button>            
    </div><br/>
    <table class="table table-hover">
      <thead>
        <tr>          
          <th scope="col">Invoice</th>
          <th scope="col">Received Date</th>
          <th scope="col">Delivery Date</th>
          <th scope="col">Total Amount</th>
          <th scope="col">Advance Paid</th>
          <th scope="col">Vehicle Payment Type</th>                     
        </tr>
      </thead>
      <tbody>
        <tr>     
          <th scope="row">{{ service.veh_invoice_num }}</th>          
          <td>{{ formatDate(service.veh_checkin_date) }}</td>
          <td>{{ formatDate(service.veh_delivery_date) }}</td>  
          <td>{{ service.veh_total_bill_amount }}</td>
          <td>{{ service.veh_amount_paid_advance }}</td>
          <td>{{ service.veh_payment_type}}</td>                                                          
        </tr>
      </tbody>
    </table>   
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
