<style>
@import "./modal.css";
</style>

<template>
  <div class="modal-backdrop">
    <div class="modal w-[500px] p-[20px] border border-[5px]">
      <h1 class="text-center text-[30px] font-bold bg-[#eeeeee] py-[5px]">
        Add New Demand Source
      </h1>
      <div class="flex w-full mt-[20px] gap-3">
        <div class="w-[180px] flex items-center">
          <h1 class="font-bold">Name</h1>
        </div>

        <div class="w-full">
          <input
            type="text"
            class="w-full border border-black rounded-[4px] px-[5px] py-[4px]"
            v-model="name"
          />
          <!-- <input type="text" class="w-full border border-black rounded-[4px] px-[5px] py-[4px]" v-model="value.name"
              v-else-if="value != null" /> -->
          <span class="text-red" v-if="isNameValid"
            >Please enter a valid name.</span
          >
        </div>
      </div>
      <div class="flex mt-[20px] gap-3">
        <div class="w-[180px] flex items-center">
          <h1 class="font-bold">Status</h1>
        </div>
        <div class="w-full">
          <v-switch
            class="flex"
            label="Active"
            color="green"
            v-model="status"
            hide-details
          ></v-switch>
        </div>
        <!-- <v-switch class="flex" label="Active" color="green" v-model="value.status" v-else-if="value != null"
            hide-details></v-switch> -->
      </div>
      <div class="flex w-full mt-[20px] gap-3">
        <div class="w-[180px] flex items-center">
          <h1 class="font-bold">Floor[cpm]</h1>
        </div>
        <div class="w-full">
          <input
            type="number"
            class="w-full border border-black rounded-[4px] px-[5px] py-[4px]"
            v-model="floor"
          />
          <!-- <input class="w-full border border-black rounded-[4px] px-[5px] py-[4px]" v-model="value.floor"
              v-else-if="value != null" /> -->
          <span class="text-red" v-if="isFloorValid"
            >Please enter a valid Floor.</span
          >
        </div>
      </div>
      <div class="flex w-full mt-[20px] gap-3">
        <div class="w-[130px] flex items-center">
          <h1 class="font-bold">Bid Type</h1>
        </div>
        <div class="flex gap-2">
          <div class="flex justify-center items-center">
            <h1>Fixed</h1>
          </div>
          <v-switch class="flex" v-model="bid_type" hide-details></v-switch>
          <!-- <v-switch class="flex" v-model="value.bid_type" hide-details v-else-if="value != null"></v-switch> -->
          <div class="flex justify-center items-center">
            <h1>Dynamic</h1>
          </div>
        </div>
      </div>
      <div class="flex w-full mt-[20px] gap-3">
        <div class="w-[180px] flex items-center">
          <h1 class="font-bold">VAST Url</h1>
        </div>
        <div class="w-full">
          <input
            class="w-full border border-black rounded-[4px] px-[5px] py-[4px]"
            v-model="vast_url"
          />
          <!-- <input class="w-full border border-black rounded-[4px] px-[5px] py-[4px]" v-model="value.vast_url"
              v-else-if="value != null" /> -->
          <span class="text-red" v-if="isVastValid == 1"
            >Please enter a valid Vast URL.</span
          >
          <span class="text-red" v-else-if="isVastValid == 2"
            >URL is not required.</span
          >
        </div>
      </div>

      <div class="flex w-full mt-[20px] gap-3">
        <div class="w-[180px] flex items-center">
          <h1 class="font-bold">Source Fee</h1>
        </div>
        <div class="w-full">
          <v-switch
            class="flex"
            label="Active"
            color="green"
            v-model="sourceFee"
            hide-details
          ></v-switch>
          <!-- <input class="w-full border border-black rounded-[4px] px-[5px] py-[4px]" v-model="value.vast_url"
              v-else-if="value != null" /> -->
        </div>
      </div>

      <div class="flex w-full mt-[20px] gap-3">
        <div class="w-[180px] flex items-center">
          <h1 class="font-bold">Percentage</h1>
        </div>
        <div class="w-full flex">
          <v-switch
            class="flex"
            label="True"
            color="green"
            v-model="sourceFeePercentage"
            :disabled="isSourceFeePercentageDisable"
            hide-details
          ></v-switch>
          <!-- <input class="w-full border border-black rounded-[4px] px-[5px] py-[4px]" v-model="value.vast_url"
              v-else-if="value != null" /> -->
        </div>
      </div>

      <div class="flex w-full mt-[20px] gap-3">
        <div class="w-[180px] flex items-center">
          <h1 class="font-bold">SourceFee Value</h1>
        </div>
        <div class="w-full">
          <input
            type="number"
            class="w-full border border-black rounded-[4px] px-[5px] py-[4px]"
            v-model="sourceFeeValue"
            :disabled="isSourceFeeValueDisable"
          />
          <!-- <input class="w-full border border-black rounded-[4px] px-[5px] py-[4px]" v-model="value.floor"
              v-else-if="value != null" /> -->
          <span class="text-red" v-if="isFloorValid"
            >Please enter a valid Floor.</span
          >
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
          v-if="value != null"
          @click="edit"
        >
          EDIT
        </button>
        <button
          type="button"
          class="text-[20px] px-[30px] py-[10px] border rounded-[40px] border-black font-bold text-white bg-gray-800"
          v-else-if="value === null"
          @click="create"
        >
          CREATE
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
  name: "Modal",
  props: ["value", "isModalVisible", "getDemands"],
  data() {
    return {
      name: "",
      status: false,
      floor: 0,
      bid_type: false,
      vast_url: "",
      sourceFee: false,
      sourceFeePercentage: false,
      isSourceFeePercentageDisable: true,
      sourceFeeValue: 0,
      isSourceFeeValueDisable: true,
      fill_rate: 0,
      revenue: 0,
      id: 0,
      isNameValid: false,
      isVastValid: false,
      isFloorValid: false,
    };
  },
  methods: {
    close: function () {
      this.$emit("close");
      this.name = "";
      this.status = false;
      this.floor = 0;
      this.bid_type = false;
      this.vast_url = "";
      this.fill_rate = 0;
      this.revenue = 0;
      this.isNameValid = false;
      this.isVastValid = 0;
      this.source_fee = false;
      this.sourceFeePercentage = false;
      this.isSourceFeePercentageDisable = true;
      this.sourceFeeValue = 0;
      this.isSourceFeeValueDisable = true;
      this.getDemands();
    },
    create: function () {
      let validflag = 0;
      if (this.name == "") {
        this.isNameValid = true;
        validflag = 1;
      } else this.isNameValid = false;

      const urlPattern =
        /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w\.-]*)*\/?$/;

      console.log("TestUrl: ", urlPattern.test(this.vast_url));

      if (this.vast_url == "") {
        this.isVastValid = 1;
        validflag = 1;
      } else if (!urlPattern.test(this.vast_url)) {
        validflag = 1;
        this.isVastValid = 2;
      } else this.isVastValid = 0;

      if (validflag) return;

      const data = localStorage.getItem(
        "stytch_sdk_state_" + import.meta.env.VITE_STYTCH_PUBLIC_TOKEN
      );
      const jsonData = JSON.parse(data);

      const user_email = jsonData.user.emails[0].email;
      const name = this.name;
      const status = this.status ? "Active" : "Inactive";
      const floor = this.floor ? this.floor : 0;
      const bid_type = this.bid_type ? "Fixed" : "Dynamic";
      const vast_url = this.vast_url;
      const source_fee = this.sourceFee;
      const source_fee_type_percentage = this.sourceFeePercentage;
      const source_fee_value = this.sourceFeeValue;
      const fill_rate = this.fill_rate ? this.fill_rate : 0;
      const revenue = this.revenue ? this.revenue : 0;

      const request = {
        user_email: user_email,
        name: name,
        status: status,
        floor: String(floor),
        bid_type: bid_type,
        vast_url: vast_url,
        source_fee: source_fee,
        source_fee_type_percentage: source_fee_type_percentage,
        source_fee_value: source_fee_value,
        fill_rate: String(fill_rate),
        revenue: String(revenue),
      };
      console.log(request);
      const path = "https://6e9c-65-109-52-221.eu.ngrok.io/api/demands";
      axios
        .post(path, request, {
          headers: {
            "Content-Type": "application/json",
            withCredentials: true,
            "ngrok-skip-browser-warning": "any",
          },
        })
        .then(() => {
          console.log("OK");
          this.name = "";
          this.status = false;
          this.floor = 0;
          this.bid_type = false;
          this.vast_url = "";
          this.fill_rate = 0;
          this.revenue = 0;
          this.isNameValid = false;
          this.isVastValid = false;
          this.sourceFee = false;
          this.sourceFeePercentage = false;
          this.isSourceFeePercentageDisable = true;
          this.sourceFeeValue = 0;
          this.isSourceFeeValueDisable = true;
          this.$emit("close");
          this.getDemands();
        })
        .catch((err) => {
          console.error(err);
        });
    },
    edit: function () {
      let validflag = 0;
      if (this.name == "") {
        this.isNameValid = true;
        validflag = 1;
      } else this.isNameValid = false;

      if (this.vast_url == "") {
        this.isVastValid = true;
        validflag = 1;
      } else this.isVastValid = false;

      if (validflag) return;

      const data = localStorage.getItem(
        "stytch_sdk_state_" + import.meta.env.VITE_STYTCH_PUBLIC_TOKEN
      );
      const jsonData = JSON.parse(data);

      const user_email = jsonData.user.emails[0].email;
      const name = this.name;
      const status = this.status ? "Active" : "Inactive";
      const floor = this.floor ? this.floor : 0;
      const bid_type = this.bid_type ? "Dynamic" : "Fixed";
      console.log(bid_type);
      const vast_url = this.vast_url;
      const fill_rate = this.fill_rate ? this.fill_rate : 0;
      const revenue = this.revenue ? this.revenue : 0;
      const source_fee = this.sourceFee;
      const source_fee_type_percentage = this.sourceFeePercentage;
      const source_fee_value = this.sourceFeeValue; 

      const request = {
        user_email: user_email,
        name: name,
        status: status,
        floor: String(floor),
        bid_type: bid_type,
        vast_url: vast_url,
        source_fee: source_fee,
        source_fee_type_percentage: source_fee_type_percentage,
        source_fee_value: source_fee_value,
        fill_rate: String(fill_rate),
        revenue: String(revenue),
      };
      console.log(request);
      const path =
        "https://6e9c-65-109-52-221.eu.ngrok.io/api/demands/" +
        String(this.value.id);
      const config = {
        headers: {
          "Content-Type": "application/json",
          withCredentials: true,
          "ngrok-skip-browser-warning": "any",
        },
      };
      axios
        .put(path, request, config)
        .then(() => {
          console.log("OK");
          this.name = "";
          this.status = false;
          this.floor = 0;
          this.bid_type = false;
          this.vast_url = "";
          this.fill_rate = 0;
          this.revenue = 0;
          this.isNameValid = false;
          this.isVastValid = false;
          this.sourceFee = false;
          this.sourceFeePercentage = false;
          this.isSourceFeePercentageDisable = true;
          this.sourceFeeValue = 0;
          this.isSourceFeeValueDisable = true;
          this.$emit("close");
          this.getDemands();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  watch: {
    isModalVisible(newVal) {
      console.log(this.value);
      if (this.value && newVal) {
        this.name = this.value.name;
        this.status = this.value.status;
        this.floor = this.value.floor;
        this.bid_type = this.value.bid_type;
        this.vast_url = this.value.vast_url;
        this.sourceFee = this.value.source_fee;
        this.sourceFeePercentage = this.value.source_fee_type_percentage;
        this.sourceFeeValue = this.value.source_fee_value
      }
    },
    sourceFee: function (newVal) {
      console.log(newVal);
      this.isSourceFeeValueDisable = !newVal;
      this.isSourceFeePercentageDisable = !newVal;
      if (newVal === false) {
        this.sourceFeePercentage = false;
        this.sourceFeeValue = 0;
      }
    },
  },
};
</script>
