<style>
@import './modal.css';
</style>

<template>
  <div class="modal-backdrop">
    <div class="modal w-[500px] p-[20px] border border-[5px]">
      <h1 class="text-center text-[30px] font-bold bg-[#eeeeee] py-[5px]">Add New Demand Source</h1>
      <div class="flex w-full mt-[20px] gap-3">
        <div class="w-[100px] flex items-center">
          <h1 class="font-bold">Name</h1>
        </div>

        <div class="w-full">
        <input type="text" class="w-full border border-black rounded-[4px] px-[5px] py-[4px]" v-model="name" />
          <!-- <input type="text" class="w-full border border-black rounded-[4px] px-[5px] py-[4px]" v-model="value.name"
              v-else-if="value != null" /> -->
          <span class="text-red" v-if="isNameValid">Please enter a valid name.</span>
        </div>
      </div>
      <div class="flex mt-[20px] gap-3">
        <div class="w-[100px] flex items-center">
          <h1 class="font-bold">Status</h1>
        </div>
      <v-switch class="flex" label="Active" color="secondary" v-model="status" hide-details></v-switch>
        <!-- <v-switch class="flex" label="Active" color="secondary" v-model="value.status" v-else-if="value != null"
            hide-details></v-switch> -->
      </div>
      <div class="flex w-full mt-[20px] gap-3">
        <div class="w-[100px] flex items-center">
          <h1 class="font-bold">Floor[cpm]</h1>
        </div>
        <div class="w-full">
        <input class="w-full border border-black rounded-[4px] px-[5px] py-[4px]" v-model="floor" />
          <!-- <input class="w-full border border-black rounded-[4px] px-[5px] py-[4px]" v-model="value.floor"
              v-else-if="value != null" /> -->
          <span class="text-red" v-if="isFloorValid">Please enter a valid Floor.</span>
        </div>
      </div>
      <div class="flex w-full mt-[20px] gap-3">
        <div class="w-[100px] flex items-center">
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
        <div class="w-[100px] flex items-center">
          <h1 class="font-bold">VAST Url</h1>
        </div>
        <div class="w-full">
        <input class="w-full border border-black rounded-[4px] px-[5px] py-[4px]" v-model="vast_url" />
          <!-- <input class="w-full border border-black rounded-[4px] px-[5px] py-[4px]" v-model="value.vast_url"
              v-else-if="value != null" /> -->
          <span class="text-red" v-if="isVastValid">Please enter a valid Vast URL.</span>
        </div>
      </div>
      <div class="flex w-full mt-[20px] gap-3">
        <div class="w-[100px] flex items-center">
          <h1 class="font-bold">Fill Rate</h1>
        </div>
      <input class="w-full border border-black rounded-[4px] px-[5px] py-[4px]" v-model="fill_rate" />
        <!-- <input class="w-full border border-black rounded-[4px] px-[5px] py-[4px]" v-model="value.fill_rate"
            v-else-if="value != null" /> -->
      </div>
      <div class="flex w-full mt-[20px] gap-3">
        <div class="w-[100px] flex items-center">
          <h1 class="font-bold">Revenue</h1>
        </div>
      <input class="w-full border border-black rounded-[4px] px-[5px] py-[4px]" v-model="revenue" />
        <!-- <input class="w-full border border-black rounded-[4px] px-[5px] py-[4px]" v-model="value.revenue"
            v-else-if="value != null" /> -->
      </div>

      <div class="flex justify-between mt-[30px]">
        <button type="button" class="text-[20px] px-[30px] py-[10px]  rounded-[40px] border border-black" @click="close">
          CANCEL
        </button>
        <button type="button"
          class="text-[20px] px-[30px] py-[10px] border rounded-[40px] border-black font-bold text-white bg-black "
          v-if="value != null" @click="edit">
          EDIT
        </button>
        <button type="button"
          class="text-[20px] px-[30px] py-[10px] border rounded-[40px] border-black font-bold text-white bg-black "
          v-else-if="value === null" @click="create">
          CREAT
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue';
import axios from 'axios';
import { watchEffect } from 'vue'

export default {
  name: 'Modal',
  props: ['value', 'isModalVisible', 'getDemands'],
  data() {
    return {
      name: '',
      status: false,
      floor: 0,
      bid_type: false,
      vast_url: '',
      fill_rate: 0,
      revenue: 0,
      id: 0,
      isNameValid: false,
      isVastValid: false,
      isFloorValid: false
    }
  },
  methods: {
    close: function () {
      this.$emit('close');
      this.name = '';
      this.status = false;
      this.floor = 0;
      this.bid_type = false;
      this.vast_url = '';
      this.fill_rate = 0;
      this.revenue = 0;
      this.isNameValid = false;
      this.isVastValid = false;
      this.getDemands();
    },
    create: function () {
      let validflag = 0;
      if (this.name == "") {
        this.isNameValid = true
        validflag = 1;
      }
      else this.isNameValid = false

      if (this.vast_url == "") {
        this.isVastValid = true
        validflag = 1;
      }
      else this.isVastValid = false
      if (validflag)
        return;

      const data = localStorage.getItem('stytch_sdk_state_' + import.meta.env.VITE_STYTCH_PUBLIC_TOKEN)
      const jsonData = JSON.parse(data)

      const user_email = jsonData.user.emails[0].email;
      const name = this.name;
      const status = this.status ? 'Active' : 'Inactive'
      const floor = this.floor ? this.floor : 0;
      const bid_type = this.bid_type ? 'Fixed' : 'Dynamic';
      const vast_url = this.vast_url
      const fill_rate = this.fill_rate ? this.fill_rate : 0;
      const revenue = this.revenue ? this.revenue : 0

      const request = { user_email: user_email, name: name, status: status, floor: String(floor), bid_type: bid_type, vast_url: vast_url, fill_rate: String(fill_rate), revenue: String(revenue) };
      console.log(request);
      const path = 'http://localhost:3002/api/demands';
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      axios.post(path, request, config)
        .then(() => {
          console.log("OK")
          this.name = '';
          this.status = false;
          this.floor = 0;
          this.bid_type = false;
          this.vast_url = '';
          this.fill_rate = 0;
          this.revenue = 0;
          this.isNameValid = false;
          this.isVastValid = false;
          this.$emit('close');
          this.getDemands()
        })
        .catch((err) => {
          console.error(error);
        })
    },
    edit: function () {
      let validflag = 0;
      if (this.name == "") {
        this.isNameValid = true
        validflag = 1;
      }
      else this.isNameValid = false

      if (this.vast_url == "") {
        this.isVastValid = true
        validflag = 1;
      }
      else this.isVastValid = false

      if (validflag)
        return;

      const data = localStorage.getItem('stytch_sdk_state_' + import.meta.env.VITE_STYTCH_PUBLIC_TOKEN)
      const jsonData = JSON.parse(data)

      const user_email = jsonData.user.emails[0].email;
      const name = this.name;
      const status = this.status ? 'Active' : 'Inactive'
      const floor = this.floor ? this.floor : 0;
      const bid_type = this.bid_type ? 'Dynamic' : 'Fixed';
      console.log(bid_type)
      const vast_url = this.vast_url
      const fill_rate = this.fill_rate ? this.fill_rate : 0
      const revenue = this.revenue ? this.revenue : 0

      const request = { user_email: user_email, name: name, status: status, floor: String(floor), bid_type: bid_type, vast_url: vast_url, fill_rate: String(fill_rate), revenue: String(revenue) };
      console.log(request);
      const path = 'http://localhost:3002/api/demands/' + String(this.value.id);
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      axios.put(path, request, config)
        .then(() => {
          console.log("OK")
          this.name = '';
          this.status = false;
          this.floor = 0;
          this.bid_type = false;
          this.vast_url = '';
          this.fill_rate = 0;
          this.revenue = 0;
          this.isNameValid = false;
          this.isVastValid = false;
          this.$emit('close');
          this.getDemands();
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  watch: {
    isModalVisible(newVal) {
      console.log(this.value);
      if (this.value && newVal) {
        this.name = this.value.name 
        this.status = this.value.status
        this.floor = this.value.floor
        this.bid_type = this.value.bid_type
        this.vast_url = this.value.vast_url
        this.fill_rate = this.value.fill_rate
        this.revenue = this.value.revenue
      } 
    }
  }
};
</script>