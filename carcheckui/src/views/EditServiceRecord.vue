<template>
  <div class="col-md-12">
    <div class="card card-container">  
      <h2>Edit Service Record</h2>   
      
        <form name="form" @submit.prevent="editServiceRecord(service)">
          <div class="form-group" >
          <div v-if="!successful">            
              <label for="veh_invoice_num">Invoice Number</label>
              <input readonly
                v-model="service.veh_invoice_num"               
                type="text"
                class="form-control"
                name="veh_reg_num"
              />              
            </div>
            <div class="form-group">
              <label for="veh_checkin_date">Checkin Date</label>
              <input
                v-model ="service.veh_checkin_date"
                v-validate="'required|min:8|max:40'"
                type="date"
                class="form-control"
                name="veh_checkin_date"
              />
              <div
                v-if="submitted && errors.has('veh_checkin_date')"
                class="alert-danger"
              >
                {{ errors.first('veh_checkin_date') }}
              </div>
            </div>
            <div class="form-group">
              <label for="veh_delivery_date">Delivery Date</label>
              <input
                v-model="service.veh_delivery_date"
                type="date"
                class="form-control"
                name="veh_delivery_date"
              />
              <div v-if="submitted && errors.has('veh_delivery_date')" class="alert-danger">
                {{ errors.first('veh_delivery_date') }}
              </div>
            </div>
            <div class="form-group">
              <label for="veh_total_bill_amount">Total Bill Amount</label>
              <input
                v-model="service.veh_total_bill_amount"
                v-validate="'required|min:2|max:40'"
                type="text"
                class="form-control"
                name="veh_total_bill_amount"
              />
              <div v-if="submitted && errors.has('veh_total_bill_amount')" class="alert-danger">
                {{ errors.first('veh_total_bill_amount') }}
              </div>
            </div>
            <div class="form-group">
              <label for="veh_amount_paid_advance">Advance Paid</label>
              <input
                v-model="service.veh_amount_paid_advance"
                v-validate="'required|min:1|max:40'"
                type="text"
                class="form-control"
                name="veh_amount_paid_advance"
              />
              <div v-if="submitted && errors.has('veh_amount_paid_advance')" class="alert-danger">
                {{ errors.first('veh_amount_paid_advance') }}
              </div>
            </div>
            <div class="form-group">
              <label for="veh_amount_paid_due">Amount Due</label>
              <input
                v-model="service.veh_amount_paid_due"
                v-validate="'required|min:2|max:100'"
                type="text"
                class="form-control"
                name="veh_amount_paid_due"
              />              
              <div v-if="submitted && errors.has('veh_amount_paid_due')" class="alert-danger">
                {{ errors.first('veh_amount_paid_due') }}
              </div>
            </div>            
            <div class="form-group">
              <button class="btn btn-primary btn-block" @click.prevent="getByIdViewServiceRecord(service.serviceid)">Cancel</button>
              <button class="btn btn-primary btn-block">Save Vehicle</button>
            </div>
          </div>
        </form>      
      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
import VehicleService from '../services/vehicle.service';
import Service from '../models/service';

import axios from 'axios';

const API_URL = 'http://localhost:3000/';

export default {
  name: 'EditServiceRecord',
  data() {
    return {
      service: new Service(),
      submitted: false,
      successful: false,
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
      )
    }, 
    getByIdViewServiceRecord(id) {
      this.$router.push({ name: 'viewservicerecord', params: { id: id }});
    },   
    editServiceRecord() {
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        
        if (isValid) {  
          this.service.userid = this.currentUser.userid;
          return axios.put(API_URL + 'vehicles/updateService/' + this.service.serviceid, this.service).then(
            data => {
              this.message = data.message;
              this.successful = true;              
              this.$swal('Service Record Updated');
              this.$router.push('/vehicles');            
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
        }
      });
    }
  }
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>
