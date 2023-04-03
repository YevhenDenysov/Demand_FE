<template>
  <div class="w-[680px] justify-center border rounded-[8px] relative">
    <span class="absolute -mt-[10px] ml-[20px] text-gray-600 bg-white"
      >Create Account</span
    >
    <v-form ref="form" class="m-[30px]">
      <div class="flex gap-3">
        <v-text-field
          v-model="firstName"
          :rules="firstNameRules"
          label="First Name"
          class="col-6"
          required
        ></v-text-field>
        <v-text-field
          v-model="lastName"
          :rules="lastNameRules"
          label="Last Name"
          class="col-6"
          required
        ></v-text-field>
      </div>
      <v-text-field
        v-model="companyName"
        :rules="companyNameRules"
        label="Company Name"
        required
      ></v-text-field>
      <v-text-field
        v-model="companyWebsite"
        :rules="companyWebsiteRules"
        label="Domain"
        required
      ></v-text-field>
      <v-switch label="Prod env" class="flex"></v-switch>
      <div class="d-flex flex-column">
        <v-btn color="success" class="mt-4" block @click="validate">
          Submit
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router";

export default {
  name: "CreateAccountView",
  data: () => ({
    valid: true,
    firstName: "",
    lastName: "",
    companyName: "",
    companyWebsite: "",
    adserver: false,
    firstNameRules: [(v) => !!v || "First Name is required"],
    lastNameRules: [(v) => !!v || "Last Name is required"],
    companyNameRules: [(v) => !!v || "Company Name is required"],
    companyWebsiteRules: [
      (v) => !!v || "Website URL is required",
      (v) =>
        (v &&
          /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w.-]*)*\/?$/i.test(
            v
          )) ||
        "Must be a valid website",
    ],
    adserverRules: [(v) => !!v || "Adserver is required"],
  }),

  methods: {
    async validate() {
      const { valid } = await this.$refs.form.validate();
      console.log("valid:", valid);
      if (valid) {
        const data = localStorage.getItem(
          "stytch_sdk_state_" + import.meta.env.VITE_STYTCH_PUBLIC_TOKEN
        );
        const jsonData = JSON.parse(data);

        const first_name = this.firstName;
        const last_name = this.lastName;
        const user_email = jsonData.user.emails[0].email;
        const company_name = this.companyName;
        const company_website = this.companyWebsite;
        const company_email = this.companyEmail;
        const adserver = this.adserver;
        const request = {
          first_name: first_name,
          last_name: last_name,
          user_email: user_email,
          company_name: company_name,
          company_website: company_website,
          adserver: adserver,
        };
        const path =
          "https://6e9c-65-109-52-221.eu.ngrok.io/api/createAccounts";
        console.log(path);
        console.log(request);
        axios
          .post(path, request, {
            headers: {
              "Content-Type": "application/json",
              withCredentials: true,
              "ngrok-skip-browser-warning": "any",
            },
          })
          .then((res) => {
            console.log(res.data);
            router.push({ name: "vasttag" });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
  created() {
    const data = localStorage.getItem(
      "stytch_sdk_state_" + import.meta.env.VITE_STYTCH_PUBLIC_TOKEN
    );
    const jsonData = JSON.parse(data);
    const user_email = jsonData.user.emails[0].email;

    console.log("userEmail:", user_email);
    const request = { user_email: user_email };

    const path = "https://6e9c-65-109-52-221.eu.ngrok.io/api/checkEmail";
    axios
      .post(path, request, {
        headers: {
          "Content-Type": "application/json",
          withCredentials: true,
          "ngrok-skip-browser-warning": "any",
        },
      })
      .then((res) => {
        console.log("checkEmail:", res.data);
        if (res.data == "ok") {
          const path1 =
            "https://6e9c-65-109-52-221.eu.ngrok.io/api/checkVastTag";
          axios
            .post(path1, request, {
              headers: {
                "Content-Type": "application/json",
                withCredentials: true,
                "ngrok-skip-browser-warning": "any",
              },
            })
            .then((res) => {
              console.log("checkvastTag:", res.data);
              if (res.data == "ok") router.push({ name: "dashboard" });
              else router.push({ name: "vasttag" });
            })
            .catch((err) => {
              console.log(err);
              router.push({ name: "vasttag" });
            });
        }
      })
      .catch((err) => {
        console.log(err);
        router.push({ name: "createaccount" });
      });
  },
};
</script>
