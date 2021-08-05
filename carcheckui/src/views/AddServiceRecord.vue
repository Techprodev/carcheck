<template>
  <div class="col-md-12">
    <div class="card card-container">     
      <form name="form" @submit.prevent="Addservicerecord">
        <div v-if="!successful">
          <div class="form-group">
            <label for="veh_checkin_date">Vehicle Checkin Date</label>
            <input
              v-model="service.veh_checkin_date"
              type="date"
              class="form-control"
              name="veh_checkin_date"
            />
            <div v-if="submitted && errors.has('veh_model')" class="alert-danger">
              {{ errors.first('veh_checkin_date') }}
            </div>
          </div>
          <div class="form-group">
            <label for="veh_delivery_date">Vehicle Delivery Date</label>
            <input
              v-model="service.veh_delivery_date"
              v-validate="'required|min:6|max:40'"
              type="date"
              class="form-control"
              name="veh_delivery_date"
            />
            <div v-if="submitted && errors.has('veh_delivery_date')" class="alert-danger">
              {{ errors.first('veh_delivery_date') }}
            </div>
          </div>
          <div class="form-group">
            <label for="veh_invoice_num">Vehicle Invoice Num</label>
            <input
              v-model="service.veh_invoice_num"
              v-validate="'required|min:1|max:40'"
              type="text"
              class="form-control"
              name="veh_invoice_num"
            />
            <div v-if="submitted && errors.has('veh_invoice_num')" class="alert-danger">
              {{ errors.first('veh_invoice_num') }}
            </div>
          </div>
           <div class="form-group">
            <label for="veh_total_bill_amount">Vehicle Total Bill Amount</label>
            <input
              v-model="service.veh_total_bill_amount"
              v-validate="'required|min:6|max:300'"
              type="text"
              class="form-control"
              name="veh_total_bill_amount"
            />
            <div v-if="submitted && errors.has('veh_total_bill_amount')" class="alert-danger">
              {{ errors.first('veh_total_bill_amount') }}
            </div>
          </div>
          <div class="form-group">
            <label for="veh_amount_paid_advance">Vehicle Amount Paid Advance</label>
            <input
              v-model="service.veh_amount_paid_advance"
              v-validate="'required|min:6|max:300'"
              type="text"
              class="form-control"
              name="veh_amount_paid_advance"
            />
            <div v-if="submitted && errors.has('veh_amount_paid_advance')" class="alert-danger">
              {{ errors.first('veh_amount_paid_advance') }}
            </div>
          </div>
          <div class="form-group">
            <label for="veh_amount_paid_due">Vehicle Amount Paid Due</label>
            <input
              v-model="service.veh_amount_paid_due"
              v-validate="'required|min:6|max:300'"
              type="text"
              class="form-control"
              name="veh_amount_paid_due"
            />
            <div v-if="submitted && errors.has('veh_amount_paid_due')" class="alert-danger">
              {{ errors.first('veh_amount_paid_due') }}
            </div>
          </div>
          <div class="form-group">
            <label for="veh_payment_type">Vehicle Payment Type</label>
            <input
              v-model="service.veh_payment_type"
              v-validate="'required|min:6|max:300'"
              type="text"
              class="form-control"
              name="veh_payment_type"
            />
            <div v-if="submitted && errors.has('veh_payment_type')" class="alert-danger">
              {{ errors.first('veh_payment_type') }}
            </div>
          </div>
          <div class="form-group">
            <label for="veh_service_type">Vehicle Service Type</label>
            <input
              v-model="service.veh_service_type"
              v-validate="'required|min:6|max:300'"
              type="text"
              class="form-control"
              name="veh_service_type"
            />
            <div v-if="submitted && errors.has('veh_service_type')" class="alert-danger">
              {{ errors.first('veh_service_type') }}
            </div>
          </div>
          <div class="form-group">
            <label for="veh_service_desc">Vehicle Service Desc</label>
            <input
              v-model="service.veh_service_desc"
              v-validate="'required|min:6|max:300'"
              type="text"
              class="form-control"
              name="veh_service_desc"
            />
            <div v-if="submitted && errors.has('veh_service_desc')" class="alert-danger">
              {{ errors.first('veh_service_desc') }}
            </div>
          </div>
          <div class="form-group">
            <label for="veh_contact_name">Vehicle Contact Name</label>
            <input
              v-model="service.veh_contact_name"
              v-validate="'required|min:6|max:300'"
              type="text"
              class="form-control"
              name="veh_contact_name"
            />
            <div v-if="submitted && errors.has('veh_contact_name')" class="alert-danger">
              {{ errors.first('veh_contact_name') }}
            </div>
          </div>
          <div class="form-group">
            <label for="veh_contact_num">Vehicle Contact Num</label>
            <input
              v-model="service.veh_contact_num"
              v-validate="'required|min:6|max:300'"
              type="number"
              class="form-control"
              name="veh_contact_num"
            />
            <div v-if="submitted && errors.has('veh_contact_num')" class="alert-danger">
              {{ errors.first('veh_contact_num') }}
            </div>
          </div>
           <div class="form-group">
            <label for="veh_mileage_service">Vehicle Mileage Service</label>
            <input
              v-model="service.veh_mileage_service"
              v-validate="'required|min:6|max:300'"
              type="text"
              class="form-control"
              name="veh_mileage_service"
            />
            <div v-if="submitted && errors.has('veh_mileage_service')" class="alert-danger">
              {{ errors.first('veh_mileage_service') }}
            </div>
          </div>
          <div class="form-group">
            <button class="btn btn-primary btn-block">Add Service Record</button>
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
import service from '../models/service';
import axios from 'axios';

const API_URL = 'http://localhost:3000/';

export default {
  name: 'Addservicerecord',
  data() {
    return {
      service: new service('', '', '', ''),
      submitted: false,
      successful: false,
      message: ''
    };
  },
  methods: {    
    Addservicerecord() {
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {  
          this.service.vehicleid = this.$route.params.id;        
          return axios.post(API_URL + 'vehicles/addservicerecord', this.service).then(
            data => {
              this.message = data.message;
              this.successful = true;
              alert('Service inserted successfully', '');
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
