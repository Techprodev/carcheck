<template>
  <div class="col-md-12">
    <div class="card card-container">     
      <form name="form" @submit.prevent="RegisterVehicle">
        <div v-if="!successful">
          <div class="form-group">
            <label for="veh_reg_num">Registration Number</label>
            <input
              v-model="vehicle.veh_reg_num"
              v-validate="'required|min:10|max:20'"
              type="text"
              class="form-control"
              name="veh_reg_num"
            />
            <div
              v-if="submitted && errors.has('veh_reg_num')"
              class="alert-danger"
            >
              {{ errors.first('veh_reg_num') }}
            </div>
          </div>

          <div class="form-group">
            <label for="veh_company">Company</label>
            <input
              v-model="vehicle.veh_company"
              v-validate="'required|min:4|max:40'"
              type="text"
              class="form-control"
              name="veh_company"
            />
            <div
              v-if="submitted && errors.has('veh_company')"
              class="alert-danger"
            >
              {{ errors.first('veh_company') }}
            </div>
          </div>
          <div class="form-group">
            <label for="veh_model">Model</label>
            <input
              v-model="vehicle.veh_model"
              type="text"
              class="form-control"
              name="veh_model"
            />
            <div v-if="submitted && errors.has('veh_model')" class="alert-danger">
              {{ errors.first('veh_model') }}
            </div>
          </div>
          <div class="form-group">
            <label for="veh_fuel_type">Fuel Type Petrol/Diesel/Electric</label>
            <input
              v-model="vehicle.veh_fuel_type"
              v-validate="'required|min:6|max:40'"
              type="text"
              class="form-control"
              name="veh_fuel_type"
            />
            <div v-if="submitted && errors.has('veh_fuel_type')" class="alert-danger">
              {{ errors.first('veh_fuel_type') }}
            </div>
          </div>
          <div class="form-group">
            <label for="veh_mileage">Mileage</label>
            <input
              v-model="vehicle.veh_mileage"
              v-validate="'required|min:1|max:40'"
              type="text"
              class="form-control"
              name="veh_mileage"
            />
            <div v-if="submitted && errors.has('veh_mileage')" class="alert-danger">
              {{ errors.first('veh_mileage') }}
            </div>
          </div>
           <div class="form-group">
            <label for="veh_notes">Notes</label>
            <input
              v-model="vehicle.veh_notes"
              v-validate="'required|min:6|max:300'"
              type="text"
              class="form-control"
              name="veh_notes"
            />
            <div v-if="submitted && errors.has('veh_notes')" class="alert-danger">
              {{ errors.first('veh_notes') }}
            </div>
          </div>
          <div class="form-group">
            <button class="btn btn-primary btn-block">Add Vehicle</button>
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
import Vehicle from '../models/vehicle';
import axios from 'axios';

const API_URL = 'http://localhost:3000/';

export default {
  name: 'RegisterVehicle',
  data() {
    return {
      vehicle: new Vehicle('', '', '', ''),
      submitted: false,
      successful: false,
      message: ''
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {    
    RegisterVehicle() {
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {  
          this.vehicle.userid = this.currentUser.userid;
          return axios.post(API_URL + 'vehicles/registervehicle', this.vehicle).then(
            data => {
              this.message = data.message;
              this.successful = true;
              alert('Vehicle inserted successfully', '');
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
