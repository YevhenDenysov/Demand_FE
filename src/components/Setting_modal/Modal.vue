<style>
@import "./modal.css";
</style>

<template>
  <div class="modal-backdrop">
    <div class="modal w-[500px] p-[20px] border border-[5px]">
      <h1 class="text-center text-[30px] font-bold bg-[#eeeeee] py-[5px]">
        Invite team members
      </h1>
      <div class="flex w-full mt-[20px] gap-3">
        <div class="w-[100px] flex items-center">
          <h1 class="font-bold">Email</h1>
        </div>

        <div class="w-full">
          <input
            type="text"
            class="w-full border border-black rounded-[4px] px-[5px] py-[4px]"
            v-model="email"
          />
          <!-- <input type="text" class="w-full border border-black rounded-[4px] px-[5px] py-[4px]" v-model="value.name"
              v-else-if="value != null" /> -->
          <span class="text-red" v-if="isEmailValid === 0"
            >Email is required.</span
          >
          <span class="text-red" v-else-if="isEmailValid === 1"
            >Must be Email.</span
          >
        </div>
      </div>
      <div class="flex mt-[20px] gap-3">
        <div class="w-[100px] flex items-center">
          <h1 class="font-bold">Env Status</h1>
        </div>
        <div class="flex gap-3">
          <h1 class="flex items-center">Sandbox</h1>
          <v-switch
            class="flex"
            color="green"
            v-model="status"
            hide-details
          ></v-switch>
          <h1 class="flex items-center">Production</h1>
        </div>
      </div>
      <div class="flex justify-between mt-[30px]">
        <button
          type="button"
          class="text-[20px] px-[30px] py-[10px] rounded-[40px] border border-black"
          @click="close"
        >
          CANCEL
        </button>
        <button
          type="button"
          class="text-[20px] px-[30px] py-[10px] border rounded-[40px] border-black font-bold text-white bg-gray-800"
          @click="invite"
        >
          Invite
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import axios from "axios";
import { watchEffect } from "vue";

export default {
  name: "SettingModal",
  props: ["value", "isSettingModalVisible", "getDemands"],
  data() {
    return {
      email: "",
      status: false,
      isEmailValid: -1,
    };
  },
  methods: {
    close: function () {
      this.$emit("close");
      this.email = "";
      this.status = false;
      this.isEmailValid = -1;
    },
    invite: function () {
      let validflag = 0;
      const regex =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      // console.log(this.email)
      console.log(regex.test(this.email));
      if (this.email == "") {
        this.isEmailValid = 0;
        return;
      } else if (!regex.test(this.email)) {
        this.isEmailValid = 1;
        return;
      }
      console.log(this.isEmailValid);

      const data = localStorage.getItem(
        "stytch_sdk_state_" + import.meta.env.VITE_STYTCH_PUBLIC_TOKEN
      );
      const jsonData = JSON.parse(data);

      const user_email = jsonData.user.emails[0].email;

      const request = { user_email: user_email, invite_email: this.email };
      const path =
        "https://6e9c-65-109-52-221.eu.ngrok.io/api/createCompanyAssociation";
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
          this.email = "";
          this.status = false;
          this.isEmailValid = -1;
          this.close()
        })
        .catch((err) => {
          console.log(err.response.data.message);
          this.close()
        });
    },
  },
};
</script>
