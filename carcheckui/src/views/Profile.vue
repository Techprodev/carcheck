<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        My Profile
      </h3>
    </header>
    <!-- <p>
      <strong>Token:</strong>
      {{ currentUser.token.substring(0, 20) }} ...
      {{ currentUser.token.substr(currentUser.token.length - 20) }}
    </p> -->
    <p>
      <strong>Id:</strong>
      {{ currentUser['userid'] }}
    </p>
    <p>
      <strong>User Name:</strong>
      {{ currentUser['username'] }}
    </p>
    <p>
      <strong>Mobile:</strong>
      {{ currentUser['mobile'] }}
    </p>
    <p>
      <strong>Email:</strong>
      {{ currentUser['email'] }}
    </p>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Profile',
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }
};
</script>
