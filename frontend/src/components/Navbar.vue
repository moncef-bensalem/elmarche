<template>
  <div class="bg-custom-violet nav-wrapper">
    <b-navbar
      toggleable="lg"
      type="dark"
      variant="bg-custom-violet"
      class="container text-uppercase w-100"
    >
      <b-navbar-brand href="#" class="font-weight-bold">
        <img src="../assets/img/koi-logo.png" alt="Kitten" />
        <span class="logo-word">EL MARCHII</span>
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item
            to="/"
            class="text-light font-weight-bolder"
            :active="$route.name == 'home'"
          >
            Home
          </b-nav-item>
          <b-nav-item
            to="/catalog"
            class="text-light font-weight-bolder"
            :active="$route.name == 'catalog'"
          >
            Catalog
          </b-nav-item>
          <b-nav-item
            to="/about"
            class="text-light font-weight-bolder"
            :active="$route.name == 'about'"
          >
            About
          </b-nav-item>
          <b-nav-item
            to="/contact"
            class="text-light font-weight-bolder"
            :active="$route.name == 'contact'"
          >
            Contact
          </b-nav-item>
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <!-- <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>-->
          <!-- <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown>-->
          <b-nav-item
            to="/register"
            class="text-light font-weight-bolder"
            :active="$route.name == 'register'"
            v-if="!token"
          >
            Register
          </b-nav-item>
          <b-nav-item
            to="/login"
            class="text-light font-weight-bolder"
            :active="$route.name == 'login'"
            v-if="!token"
          >
            Login
          </b-nav-item>
          <b-nav-item
            :to="{ name: 'application.info' }"
            class="text-light font-weight-bolder application"
            :active="$route.matched.some(({ name }) => name === 'application')"
            v-if="token && user.role === 'admin'"
          >
            Application
          </b-nav-item>
          <b-nav-item-dropdown right v-if="token">
            <template v-slot:button-content>
              <span class="text-light font-weight-bolder">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-user"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </span>
            </template>
            <b-dropdown-item
              :to="{ name: 'profile' }"
              v-if="token && user.role === 'buyer'"
            >
              Profile
            </b-dropdown-item>
            <b-dropdown-item href="#" @click="out">Log out</b-dropdown-item>
          </b-nav-item-dropdown>
          <!-- shopping--cart -->
          <Cart />
          <!-- shopping--Ends -->
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Cart from "./Cart";
export default {
  name: "Navbar",
  components: {
    Cart
  },
  computed: {
    ...mapGetters(["token", "user"])
  },
  methods: {
    ...mapActions(["logout", "toggleLoader", "clearOrders"]),
    out() {
      this.toggleLoader();
      this.logout().then(res => {
        this.$router.push({
          name: "login"
        });
        this.clearOrders();
        this.toggleLoader();
        if (res !== undefined) {
          this.$swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your are noe logged-out!",
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
    }
  }
};
</script>
<style scoped>
.logo-word {
  font-family: "Anton", sans-serif;
}
a {
  text-decoration: none;
  letter-spacing: 1px;
}

a:hover {
  text-decoration: none;
}

.nav-wrapper {
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 12;
}

.navbar {
  width: 100%;
}

.vertical {
  width: 30px;
  display: flex;
  justify-content: center;
}

.vertical-line {
  /* border-right: solid aliceblue 2px; */
  color: aliceblue;
  font-weight: 900;
}

svg {
  width: 26px;
  height: 26px;
}
</style>
