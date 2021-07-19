import axios from 'axios';

const API_URL = 'http://localhost:3000/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'users/authenticate', {
        username: user.username,
        userpassword: user.password
      })
      .then(response => {
        if (response.data.success) {
          localStorage.setItem('user', JSON.stringify(response.data.result));
        }

        return response.data.result;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + 'users/registerUser', {
      username: user.username,
      userpassword: user.password,
      mobile: user.mobile,
      email: user.email
    });
  }
}

export default new AuthService();
