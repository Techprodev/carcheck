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
          <td>{{ service.veh_checkin_date }}</td>
          <td>{{ service.veh_delivery_date }}</td>  
          <td>{{ service.veh_total_bill_amount }}</td>
          <td>{{ service.veh_amount_paid_advance }}</td>
          <td>{{ service.veh_total_bill_amount }}</td>                                                          
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
