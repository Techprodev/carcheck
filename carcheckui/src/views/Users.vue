<template>
  <div class="container">
    <h1>All Users</h1>
    <!-- {{ users }} This is to show in JSON format -->
    <br />
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">User Name</th>
          <th scope="col">Mobile</th>
          <th scope="col">Email</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.userid">
          <th scope="row">{{ user.userid }}</th>
          <td>{{ user.username }}</td>
          <td>{{ user.mobile }}</td>
          <td>{{ user.email }}</td>
          <td>
            <button
              type="button"
              class="btn btn-primary"
              @click.prevent="getuserInfo(user.userid)"
            >
              Edit
            </button>
            &nbsp; <button type="button" class="btn btn-danger">Delete</button>&nbsp;&nbsp;
             <button 
              type="button" class="btn btn-primary"
              @click.prevent="getAllVehiclesOfUser(user.userid)"
            >
              Get Vehicle Records
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import UserService from '../services/user.service';
import User from '../models/user';

export default {
  name: 'Users',
  data() {
    return {
      user: new User(),
      users: [],
      message: ''
    };
  },
  mounted() {
    this.getAllUsers();
  },
  methods: {
    getAllUsers() {
      UserService.getAllUsers().then(
        response => {
          this.users = response.data.result;
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
    getuserInfo(id) {
      UserService.getUserInfo(id).then(
        response => {
          this.user = response.data.result;
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
    getAllVehiclesOfUser(id) {
      this.$router.push({ name: 'vehicles', params: { id: id }});
    }, 
    editUser() {},
    deleteUser() {}
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
