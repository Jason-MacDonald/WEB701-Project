<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <router-link class="mx-3" style="text-decoration: none; color: inherit;" to="/">
        <h2>NGC Nelson Galleries Collective</h2>
      </router-link>

      <v-spacer></v-spacer>

      <router-link class="mx-3" style="text-decoration: none; color: inherit;" to="/events">
        <h3>Events</h3>
      </router-link>
      <router-link class="mx-3" style="text-decoration: none; color: inherit;" to="/members">
        <h3>Members</h3>
      </router-link>
      <router-link class="mx-3" style="text-decoration: none; color: inherit;" to="/items">
        <h3>Items</h3>
      </router-link>

      

      <div class="mx-3" v-if="this.$store.state.token == null">
        <router-link class="mx-3" style="text-decoration: none; color: inherit;" to="/login">
          <h3>Login</h3>
        </router-link>
      </div>
      <div class="mx-3" v-if="this.$store.state.token != null">
        <router-link style="text-decoration: none; color: inherit;" to="/account">
          <h3>Account</h3>
        </router-link>
      </div>
      <div class="mx-3" v-if="this.$store.state.token != null">
        <v-btn style="text-decoration: none; color: inherit;" @click="logout()">
          <h3>Logout</h3>
        </v-btn>
      </div>
    </v-app-bar>
    <br />
    <br />
    <br />

    <div :v-if="buttonEnabled == true">
      <v-btn @click="subscription">
        {{pushButtonText}}
      </v-btn>
    </div>

    <router-view />end
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    loggedIn: false,

    swRegistration: "",
    pushButtonText: "Push Messaging Not Available",
    buttonEnabled: false,
    isSubscribed: false
  }),
  created() {
    if (localStorage.getItem("jwt") != "null") {
      this.loggedIn = true;
      console.log(localStorage.getItem("jwt"));
    } else {
      this.loggedIn = false;
      console.log(localStorage.getItem("jwt"));
    }

    
  },
  methods: {
    logout() {
      this.$store.commit("setToken", null);
      this.$store.commit("clearAccount", null);
      this.$router.push("/login");
      var storage = window.localStorage;
      storage.clear();
    },
    subscription (){
      if(this.isSubscribed){
        alert("unsubscribing");
        this.unsubscribeUser();
      }
      else{
        alert("subscribing");
        this.buttonEnabled == false;
        this.subscribeUser();
      }
    },
    subscribeUser() {
      let _this = this;
      const applicationServerPublicKey = this.urlB64ToUint8Array('BKpP09O0gtV3MIlztTaGgzLFw5M69UXuHzwqjhZL3QpxsaQDUP2z_GJllH8L7NKWNeUUlYGmD0Oyu2NfKxcAacI');
      this.swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerPublicKey
      })
      .then(function(subscription) {
        console.log("User is subscribed");
        _this.updateSubscriptionOnServer(subscription);
        _this.isSubscribed = true;
        _this.buttonEnabled = true;
        _this.pushButtonText = 'Disable Push Messaging';
      })
      .catch(function(err) {
        console.error("Failed to subscribe the user: ", err)
      });
    },
    unsubscribeUser() {
      let _this = this;
      this.swRegistration.pushManager.getSubscription()
      .then(function(subscription){
        if(subscription){
          return subscription.unsubscribe();
        }
      })
      .catch(function(error) {
        console.log("Error unsubscribing", error);
      })
      .then(function() {
        _this.updateSubscriptionOnServer(null);
        console.log("User is unsubscribed");
        _this.isSubscribed = false;
        _this.pushButtonText = 'Enable Push Messaging';
      })
    },
    updateSubscriptionOnServer(a) {
      console.log(a);
    },
    serviceWorker() {
      //let isSubscribed = false;
      // eslint-disable-next-line no-unused-vars
      //let swRegistration = null;
      let _this = this;

      if ('serviceWorker' in navigator && 'PushManager' in window) {
        console.log('Service Worker and Push is supported');

        navigator.serviceWorker.register('./sw.js')
        .then(function(swReg) {
          console.log('Service Worker is registered', swReg);

          _this.swRegistration = swReg;
          initializeUI();
        })
        .catch(function(error) {
          console.error('Service Worker Error', error);
        });
      } else {
        console.warn('Push messaging is not supported');
        _this.pushButtonText = 'Push Not Supported';
      }

      function initializeUI() {
        // Set the initial subscription value
        _this.swRegistration.pushManager.getSubscription()
        .then(function(subscription) {
          _this.isSubscribed = !(subscription === null);

          if (_this.isSubscribed) {
            _this.buttonEnabled = true;
            console.log('User IS subscribed!');
            _this.pushButtonText = 'Disable Push Messaging';
            _this.subscribed = true;
          } else {
            console.log('User is NOT subscribed!');
            _this.pushButtonText = 'Enable Push Messaging';
            _this.subscribed = false;
          }
        });
      }
    },
    urlB64ToUint8Array(base64String) {
      const padding = '='.repeat((4 - base64String.length % 4) % 4);
      const base64 = (base64String + padding)
        //eslint-disable-next-line no-useless-escape
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

      const rawData = window.atob(base64);
      const outputArray = new Uint8Array(rawData.length);

      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
      }
      return outputArray;
    },
  },
  
  mounted() { 
      this.serviceWorker();
  },
};
</script>

<style scoped>
li a {
  text-decoration: none;
  color: black;
}
</style>
