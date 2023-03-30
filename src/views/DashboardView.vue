<script setup>
import stytch from "../stytch";
import { mdiHome } from "@mdi/js";

let user = stytch.user.getSync();
let session = stytch.session.getSync();

function logout() {
  stytch.session.revoke();
}
</script>
<template>
  <div class="w-[1440px]">
    <!-- <button @click="logout"
      class="w-[100px] bg-indigo-500 text-white rounded-[4px] font-bold mb-3 py-[10px] text-[20px]">Log out</button> -->
    <div class="card border-none">
      <div class="flex justify-between w-full">
        <div>
          <button
            type="button"
            class="bg-gray-800 text-white px-[5px] py-[10px] font-bold rounded-[10px]"
            @click="showModal"
          >
            +ADD New Demand
          </button>
        </div>
        <div class="flex gap-4">
          <div>
            <h1>Start Date</h1>
            <VueDatePicker
              v-model="startDate"
              placeholder="Start Typing ..."
              text-input
            />
          </div>
          <div>
            <h1>End Date</h1>
            <VueDatePicker
              v-model="endDate"
              placeholder="Start Typing ..."
              text-input
            />
          </div>
        </div>
      </div>

      <div class="grid grid-cols-5 gap-4 w-full mt-[40px]">
        <div class="border border-[2px] border-black rounded-[4px] p-[10px]">
          <h1 class="font-bold text-[20px] text-center">Auctions</h1>
          <h1 class="text-[30px] text-center">123.2M</h1>
        </div>
        <div class="border border-[2px] border-black rounded-[4px] p-[10px]">
          <h1 class="font-bold text-[20px] text-center">Impressions</h1>
          <h1 class="text-[30px] text-center">43.2M</h1>
        </div>
        <div class="border border-[2px] border-black rounded-[4px] p-[10px]">
          <h1 class="font-bold text-[20px] text-center">Fill Rate</h1>
          <h1 class="text-[30px] text-center">41.4%</h1>
        </div>
        <div class="border border-[2px] border-black rounded-[4px] p-[10px]">
          <h1 class="font-bold text-[20px] text-center">Revenue</h1>
          <h1 class="text-[30px] text-center">$15.9k</h1>
        </div>
        <div class="border border-[2px] border-black rounded-[4px] p-[10px]">
          <h1 class="font-bold text-[20px] text-center">Waterfall Lift</h1>
          <h1 class="text-[30px] text-center">12.9%</h1>
        </div>
      </div>

      <div class="grid grid-cols-8 w-full mt-[40px]" id="header">
        <div
          class="bg-gray-800 text-white border border-black border-[2px] text-[15px] py-[20px] font-bold text-center"
        >
          Name
        </div>
        <div
          class="bg-gray-800 text-white border border-black border-[2px] text-[15px] py-[20px] font-bold text-center"
        >
          Status
        </div>
        <div
          class="bg-gray-800 text-white border border-black border-[2px] text-[15px] py-[20px] font-bold text-center"
        >
          Floor[cpm]
        </div>
        <div
          class="bg-gray-800 text-white border border-black border-[2px] text-[15px] py-[20px] font-bold text-center"
        >
          Bid Type
        </div>
        <div
          class="bg-gray-800 text-white border border-black border-[2px] text-[15px] py-[20px] font-bold text-center"
        >
          VAST Url
        </div>
        <div
          class="bg-gray-800 text-white border border-black border-[2px] text-[15px] py-[20px] font-bold text-center"
        >
          Fill Rate
        </div>
        <div
          class="bg-gray-800 text-white border border-black border-[2px] text-[15px] py-[20px] font-bold text-center"
        >
          Revenue
        </div>
        <div
          class="bg-gray-800 text-white border border-black border-[2px] text-[15px] py-[20px] font-bold text-center"
        >
          Edit
        </div>
      </div>

      <div
        class="grid grid-cols-8 w-full"
        id="header"
        v-for="(demand, index) in demands"
        :key="index"
      >
        <div
          class="bg-white text-black border border-black border-[2px] text-[15px] py-[20px] font-bold text-center"
        >
          {{ demand.name }}
        </div>
        <div
          class="bg-white text-black border border-black border-[2px] text-[15px] py-[20px] font-bold text-center"
        >
          <h1 class="text-green-500" v-if="demand.status === 'Active'">
            {{ demand.status }}
          </h1>
          <h1 class="text-red-300" v-if="demand.status === 'Inactive'">
            {{ demand.status }}
          </h1>
        </div>
        <div
          class="bg-white text-black border border-black border-[2px] text-[15px] py-[20px] font-bold text-center"
        >
          ${{ demand.floor }}
        </div>
        <div
          class="bg-white text-black border border-black border-[2px] text-[15px] py-[20px] font-bold text-center"
        >
          {{ demand.bid_type }}
        </div>
        <div
          class="bg-white text-black border border-black border-[2px] text-[15px] py-[20px] font-bold text-center"
        >
          {{ String(demand.vast_url).slice(0, 11) }}..
        </div>
        <div
          class="bg-white text-black border border-black border-[2px] text-[15px] py-[20px] font-bold text-center"
        >
          {{ demand.fill_rate }}%
        </div>
        <div
          class="bg-white text-black border border-black border-[2px] text-[15px] py-[20px] font-bold text-center"
        >
          ${{ demand.revenue }}k
        </div>
        <div
          class="bg-white text-black border border-black border-[2px] text-[10px] px-[5px] py-[20px] font-bold text-center flex gap-2"
        >
          <v-btn
            variant="tonal"
            class="text-[12px]"
            @click="editModalShow(demand.id)"
            >Edit</v-btn
          >
          <v-btn
            variant="tonal"
            class="text-[12px]"
            @click="deleteItem(demand.id)"
            >Delete</v-btn
          >
        </div>
      </div>
    </div>
    <Modal
      v-show="isModalVisible"
      :value="value"
      :isModalVisible="isModalVisible"
      :getDemands="getDemands"
      @close="closeModal"
    />
  </div>
</template>

<script>
import Modal from "../components/Demand_modal/Modal.vue";
import axios from "axios";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { watch, ref } from "vue";

export default {
  name: "DashboardView",
  components: {
    Modal,
    value: null,
    VueDatePicker,
  },
  data() {
    return {
      demands: [],
      isModalVisible: false,
      // date: new Date().toISOString().substr(0,10),
      startDate: '',
      endDate: ''
    };
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
      this.value = null;
      console.log(this.value);
    },
    editModalShow(id) {
      console.log("id = ", id);
      const path = "https://6e9c-65-109-52-221.eu.ngrok.io/api/demands";
      axios
        .get(path + "/" + String(id), {
          headers: {
            "Content-Type": "application/json",
            withCredentials: true,
            "ngrok-skip-browser-warning": "any",
          },
        })
        .then((res) => {
          console.log(res.data);
          this.value = {
            id: res.data.id,
            name: res.data.name,
            status: res.data.status == "Active" ? true : false,
            floor: parseFloat(res.data.floor),
            bid_type: res.data.bid_type === "Fixed" ? false : true,
            vast_url: res.data.vast_url,
            fill_rate: parseFloat(res.data.fill_rate),
            revenue: parseFloat(res.data.revenue),
          };
          this.isModalVisible = true;
        })
        .catch((err) => {
          console.log(err);
        });
      this.value = null;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    getDemands() {
      const path = "https://6e9c-65-109-52-221.eu.ngrok.io/api/demands";
      axios
        .get(path, {
          headers: {
            "Content-Type": "application/json",
            withCredentials: true,
            "ngrok-skip-browser-warning": "any",
          },
        })
        .then((res) => {
          this.demands = res.data;
          console.log("demands:", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteItem(id) {
      const path =
        "https://6e9c-65-109-52-221.eu.ngrok.io/api/demands/" + String(id);
      const config = {
        headers: {
          "Content-Type": "application/json",
          withCredentials: true,
          "ngrok-skip-browser-warning": "any",
        },
      };
      axios
        .delete(path, config)
        .then(() => {
          console.log("Ok");
          this.getDemands();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getDemandsByDate(start_date, end_date){
      const request = {startDate: start_date, endDate: end_date}
      console.log(request)
      const path ="https://6e9c-65-109-52-221.eu.ngrok.io/api/demandsByDate"
      axios.post(path, request,{
        headers: {
          'Content-Type': 'application/json',
          withCredentials: true,
          "ngrok-skip-browser-warning": "any",
        }})
        .then((res) => {
          console.log(res.data)
          this.demands = res.data;
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  created() {
    this.getDemands();
  },
  watch: {
    startDate(newVal){
      new Date(newVal).setHours(0,0,0,0)
      const start_date = newVal ? newVal : new Date(1970,1,1);
      const end_date = this.endDate ? this.endDate : new Date(2500,1,1);
      console.log("star_date:", start_date)
      console.log("end_date:", end_date)
      this.getDemandsByDate(start_date,end_date)
    },
    endDate(newVal){
      new Date(newVal).setHours(0,0,0,0)
      const start_date = this.startDate ? this.startDate : new Date(1970,1,1);
      const end_date = this.endDate ? this.endDate : new Date(2500,1,1);
      console.log("star_date:", start_date)
      console.log("end_date:", end_date)
      this.getDemandsByDate(start_date,end_date)
    }
  }
  // setup() {
  //   return {start_date,end_date}
  // }
};

</script>
