<template>
  <v-container>
    <v-card class="px-4 py-4">
      <v-card class="px-4 pt-4 pb-1">
        
        <!-- ##### ACCOUNT TITLE #####  -->
        <h2 class="px-2 pt-1">
          Account - {{account.type}}
        </h2>
        
        <!-- ##### USERNAME INPUT ##### -->
        <div>
          <v-text-field class="px-2 pt-1" label="Username" v-model="account.name" />     
        </div>
        
        <!-- ##### UPDATE USERNAEME BUTTON -->
        <v-btn class="px-2 pt-1" @click="updateUserName">
            Update Username
        </v-btn>

        <!-- ##### EMAIL DISPLAY ###### -->
        <v-text-field class="px-2 pt-1" disabled v-model="account.email" />
        
      </v-card>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Account",
  data: () => ({
    account: {} 
  }),
  created() {
    try{
      this.$store.dispatch("getAccount");
      this.account = this.$store.state.account;
    }
    catch(ex) {
      console.log("Error ACC001: " + ex.message);
      alert("Error ACC001: The system was unable to get account information.");
    }   
  },
  methods: {
    updateUserName() {
      // TODO: can do without all this....
      let account = {
        id: this.account.id,
        name: this.account.name,
        email: this.account.email
      };

      try{
        this.$store.dispatch("putAccount", account);
      }
      catch(ex) {
        console.log("Error ACC002: " + ex.message);
        alert("Error ACC002: The system was unable to update your account.");
      }
      
    }
  }
};
</script>