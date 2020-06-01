<template>
  <v-container>
    <v-card class="pa-4">
      <v-form>
        <v-text-field label="Event Title" v-model="name" />
        <v-textarea label="Event Description" v-model="description" />

        <!-- ##### Start Date ##### -->
        <div>
          <v-dialog
            ref="dialogStartDate"
            v-model="modalStartDate"
            :return-value.sync="startDate"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="startDate"
                label="Start Date"
                prepend-icon="mdi-calendar"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="startDate" scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="modalStartDate = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.dialogStartDate.save(startDate)">OK</v-btn>
            </v-date-picker>
          </v-dialog>
        </div>

        <!-- ##### Start Time ##### -->
        <v-dialog ref="dialogStartTime" v-model="modalStartTime" :return-value.sync="startTime">
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="startTime"
              label="Start Time"
              prepend-icon="mdi-clock"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker v-if="modalStartTime" v-model="startTime" full-width>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="modalStartTime = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.dialogStartTime.save(startTime)">OK</v-btn>
          </v-time-picker>
        </v-dialog>

        <!-- ##### End Date ##### -->
        <div>
          <v-dialog
            ref="dialogEndDate"
            v-model="modalEndDate"
            :return-value.sync="endDate"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="endDate"
                label="End Date"
                prepend-icon="mdi-calendar"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="endDate" scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="modalEndDate = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.dialogEndDate.save(endDate)">OK</v-btn>
            </v-date-picker>
          </v-dialog>
        </div>

        <!-- ##### End Time ##### -->
        <v-dialog ref="dialogEndTime" v-model="modalEndTime" :return-value.sync="endTime">
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="endTime"
              label="End Time"
              prepend-icon="mdi-clock"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker v-if="modalEndTime" v-model="endTime" full-width>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="modalEndTime = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.dialogEndTime.save(endTime)">OK</v-btn>
          </v-time-picker>
        </v-dialog>

        <v-btn @click="submitNewEvent">Submit Event</v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "NewEvent",
  data: () => ({
    name: "",
    description: "",
    // Picker variables.
    startDate: null,
    startTime: null,
    endDate: null,
    endTime: null,
    modalStartDate: false,
    modalStartTime: false,
    modalEndDate: false,
    modalEndTime: false
  }),
  methods: {
    submitNewEvent() {
      let event = {
        name: this.name,
        description: this.description,
        startDate: this.startDate + " " + this.startTime,
        endDate: this.endDate + " " + this.endTime,
        email: null
      };
      this.$store.dispatch("postNewEvent", event);
      this.$router.push("/events");
      this.name = "";
      this.description = "";
      this.startDate = null;
      this.startTime = null;
      this.endDate = null;
      this.endTime = null;
    }
  }
};
</script>