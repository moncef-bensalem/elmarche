<template>
  <div id="app">
    <Navbar />
    <transition name="fade" mode="out-in">
      <router-view class="view" v-if="!appLoader" />
    </transition>
    <!-- application Loader -->
    <AppLoader class="vh-100" v-if="appLoader" />
  </div>
</template>
<script>
import Navbar from "./components/Navbar";
import AppLoader from "./components/AppLoader";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    Navbar,
    AppLoader,
  },
  computed: {
    ...mapGetters(['appLoader']),
    ...mapGetters('auth', ['user', 'token'])
  },
  methods: {
    ...mapActions(['toggleLoader', 'getProducts']),
    ...mapActions('auth', ['getUser'])
  },
  async created() {
    this.toggleLoader(); // we load app loader
    await this.getProducts();
    if (!this.token) {
      setTimeout(() => {
        this.toggleLoader(); // disable app loader
      }, 1000);
      return;
    }
    await this.getUser();
    this.toggleLoader(); // disable app loader
  },
};
</script>
<style>
@import url("./assets/css/custom.css");
@import url("https://fonts.googleapis.com/css?family=Anton&display=swap");
@import url("https://fonts.googleapis.com/css?family=Cabin&display=swap");

body,
html {
  height: 100%;
  background-image: radial-gradient(
    circle farthest-corner at 18.7% 37.8%,
    rgba(250, 250, 250, 1) 0%,
    rgba(225, 234, 238, 1) 90%
  );
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100%;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
