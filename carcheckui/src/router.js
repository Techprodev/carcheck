import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import Profile from './views/Profile.vue';
import Users from './views/Users.vue';
import Vehicles from './views/Vehicles.vue';
import ServiceRecords from './views/ServiceRecords.vue';
import ViewServiceRecord from './views/ViewServiceRecord.vue';
import ViewVehicleRecord from './views/ViewVehicleRecord.vue';
import RegisterVehicle from './views/RegisterVehicle.vue';
import EditVehicleRecord from './views/EditVehicleRecord.vue';
import AddServiceRecord from './views/AddServiceRecord.vue';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/home', component: Home },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/profile', component: Profile },
    { path: '/users', name: 'users', component: Users },
    { path: '/vehicles', name: 'vehicles', component: Vehicles },
    { path: '/servicerecords/:id', name: 'servicerecords', component: ServiceRecords },
    { path: '/viewservicerecord/:id', name: 'viewservicerecord', component: ViewServiceRecord },
    { path: '/viewvehiclerecord/:id', name: 'viewvehiclerecord', component: ViewVehicleRecord },
    { path: '/editvehiclerecord/:id', name: 'editvehiclerecord', component: EditVehicleRecord },
    { path: '/registervehicle', name: 'RegisterVehicle', component: RegisterVehicle },
    { path: '/addservicerecord/:id', name: 'addservicerecord', component: AddServiceRecord }
  ]
});

// router.beforeEach((to, from, next) => {
//   const publicPages = ['/login', '/register', '/home'];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem('user');

//   // trying to access a restricted page + not logged in
//   // redirect to login page
//   if (authRequired && !loggedIn) {
//     next('/login');
//   } else {
//     next();
//   }
// });
