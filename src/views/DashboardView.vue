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
    <div class="card border-none">
      <div class="flex justify-between w-full">
        <div>
          <h1 class="font-bold text-[40px]">{{ company.name }}</h1>
          <h1 class="font-bold text-[20px]">
            Header Bidding URL: <span>{{ company.header_bidding_url }}</span>
          </h1>
          <div class="flex gap-2">
            <h1 class="font-bold text-[20px] flex items-center">Status:</h1>
            <div class="flex gap-2">
              <div class="flex justify-center items-center">
                <h1>Test</h1>
              </div>
              <v-switch class="flex" v-model="status" hide-details inset></v-switch>
              <!-- <v-switch class="flex" v-model="value.bid_type" hide-details v-else-if="value != null"></v-switch> -->
              <div class="flex justify-center items-center">
                <h1>Production</h1>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="flex justify-between">
            <div></div>
            <v-btn icon variant="tonal" @click="showSettingModal">
              <v-icon>mdi-cog</v-icon>
            </v-btn>
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
      </div>

      <div class="grid grid-cols-5 gap-4 w-full mt-[40px]">
        <div class="border border-[2px] !border-black rounded-[4px] p-[10px]">
          <h1 class="font-bold text-[20px] text-center">Auctions</h1>
          <h1 class="text-[30px] text-center">123.2M</h1>
        </div>
        <div class="border border-[2px] !border-black rounded-[4px] p-[10px]">
          <h1 class="font-bold text-[20px] text-center">Impressions</h1>
          <h1 class="text-[30px] text-center">43.2M</h1>
        </div>
        <div class="border border-[2px] !border-black rounded-[4px] p-[10px]">
          <h1 class="font-bold text-[20px] text-center">Fill Rate</h1>
          <h1 class="text-[30px] text-center">41.4%</h1>
        </div>
        <div class="border border-[2px] !border-black rounded-[4px] p-[10px]">
          <h1 class="font-bold text-[20px] text-center">Revenue</h1>
          <h1 class="text-[30px] text-center">$15.9k</h1>
        </div>
        <div class="border border-[2px] !border-black rounded-[4px] p-[10px]">
          <h1 class="font-bold text-[20px] text-center">Waterfall Lift</h1>
          <h1 class="text-[30px] text-center">12.9%</h1>
        </div>
      </div>

      <div class="flex justify-between w-full mt-[30px]">
        <button
          type="button"
          class="bg-gray-800 text-white px-[10px] py-[10px] font-bold rounded-[20px]"
          @click="showModal"
        >
          +ADD New Demand
        </button>
        <div></div>
      </div>

      <div class="grid grid-cols-8 w-full mt-[40px]" id="header">
        <div
          class="bg-gray-800 text-white border !border-black border-[2px] text-[15px] py-[20px] font-bold text-center"
        >
          Name
        </div>
        <div
          class="bg-gray-800 text-white border !border-black border-[2px] text-[15px] py-[20px] font-bold text-center"
        >
          Status
        </div>
        <div
          class="bg-gray-800 text-white border !border-black border-[2px] text-[15px] py-[20px] font-bold text-center"
        >
          Floor[cpm]
        </div>
        <div
          class="bg-gray-800 text-white border !border-black border-[2px] text-[15px] py-[20px] font-bold text-center"
        >
          Bid Type
        </div>
        <div
          class="bg-gray-800 text-white border !border-black border-[2px] text-[15px] py-[20px] font-bold text-center"
        >
          VAST Url
        </div>
        <div
          class="bg-gray-800 text-white border !border-black border-[2px] text-[15px] py-[20px] font-bold text-center"
        >
          Fill Rate
        </div>
        <div
          class="bg-gray-800 text-white border !border-black border-[2px] text-[15px] py-[20px] font-bold text-center"
        >
          Revenue
        </div>
        <div
          class="bg-gray-800 text-white border !border-black border-[2px] text-[15px] py-[20px] font-bold text-center"
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
          class="bg-white text-black border !border-black border-[2px] text-[15px] py-[20px] font-bold text-center"
        >
          {{ demand.name }}
        </div>
        <div
          class="bg-white text-black border !border-black border-[2px] text-[15px] py-[20px] font-bold text-center"
        >
          <h1 class="text-green-500" v-if="demand.status === 'Active'">
            {{ demand.status }}
          </h1>
          <h1 class="text-red-300" v-if="demand.status === 'Inactive'">
            {{ demand.status }}
          </h1>
        </div>
        <div
          class="bg-white text-black border !border-black border-[2px] text-[15px] py-[20px] font-bold text-center"
        >
          ${{ demand.floor }}
        </div>
        <div
          class="bg-white text-black border !border-black border-[2px] text-[15px] py-[20px] font-bold text-center"
        >
          {{ demand.bid_type }}
        </div>
        <div
          class="bg-white text-black border !border-black border-[2px] text-[15px] py-[20px] font-bold text-center"
        >
          {{ String(demand.vast_url).slice(0, 11) }}..
        </div>
        <div
          class="bg-white text-black border !border-black border-[2px] text-[15px] py-[20px] font-bold text-center"
        >
          {{ demand.fill_rate ? demand.fill_rate : 0 }}%
        </div>
        <div
          class="bg-white text-black border !border-black border-[2px] text-[15px] py-[20px] font-bold text-center"
        >
          ${{ demand.revenue ? demand.revenue : 0 }}k
        </div>
        <div
          class="bg-white text-black border !border-black border-[2px] text-[10px] px-[5px] py-[20px] font-bold text-center flex gap-2"
        >
          <v-btn
            variant="tonal"
            class="text-[12px]"
            @click="editModalShow(demand.id)"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn
            variant="tonal"
            class="text-[12px]"
            @click="deleteItem(demand.id)"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
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
    <SettingModal
      v-show="isSettingModalVisible"
      :isSettingModalVisible="isSettingModalVisible"
      @close="closeSettingModal"
    />
  </div>
</template>

<script>
import axios from "axios";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { watch, ref } from "vue";
import Modal from "../components/Demand_modal/Modal.vue";
import SettingModal from "../components/Setting_modal/Modal.vue";
import router from "../router";

export default {
  name: "DashboardView",
  components: {
    Modal,
    SettingModal,
    value: null,
    VueDatePicker,
  },
  data() {
    return {
      demands: [],
      company: {},
      isModalVisible: false,
      isSettingModalVisible: false,
      status: false,
      // date: new Date().toISOString().substr(0,10),
      startDate: "",
      endDate: "",
    };
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
      this.value = null;
      console.log(this.value);
    },
    showSettingModal() {
      this.isSettingModalVisible = true;
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
            source_fee: res.data.source_fee,
            source_fee_type_percentage: res.data.source_fee_type_percentage,
            source_fee_value: res.data.source_fee_value,
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
    closeSettingModal() {
      this.isSettingModalVisible = false;
    },
    getDemands() {
      const path = "https://6e9c-65-109-52-221.eu.ngrok.io/api/demandsByEmail";
      const data = localStorage.getItem(
        "stytch_sdk_state_" + import.meta.env.VITE_STYTCH_PUBLIC_TOKEN
      );
      const jsonData = JSON.parse(data);

      const user_email = jsonData.user.emails[0].email;
      const request = { user_email: user_email };
      console.log("request:", request);
      axios
        .post(path, request, {
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
    getDemandsByDate(start_date, end_date) {
      const data = localStorage.getItem(
        "stytch_sdk_state_" + import.meta.env.VITE_STYTCH_PUBLIC_TOKEN
      );
      const jsonData = JSON.parse(data);

      const user_email = jsonData.user.emails[0].email;

      const request = {
        user_email: user_email,
        startDate: start_date,
        endDate: end_date,
      };
      console.log(request);
      const path = "https://6e9c-65-109-52-221.eu.ngrok.io/api/demandsByDate";
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
          this.demands = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    console.log("Dahsboard started");
    const data = localStorage.getItem(
      "stytch_sdk_state_" + import.meta.env.VITE_STYTCH_PUBLIC_TOKEN
    );
    const jsonData = JSON.parse(data);
    const user_email = jsonData.user.emails[0].email;

    console.log("userEmail:", user_email);
    const request = { user_email: user_email };
    const path = "https://6e9c-65-109-52-221.eu.ngrok.io/api/checkVastTag";
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
        if (res.data == "ok") this.getDemands();
      })
      .catch((err) => {
        console.log(err);
        const path1 = "https://6e9c-65-109-52-221.eu.ngrok.io/api/checkEmail";
        axios
          .post(path1, request, {
            headers: {
              "Content-Type": "application/json",
              withCredentials: true,
              "ngrok-skip-browser-warning": "any",
            },
          })
          .then((res) => {
            if (res.data == "ok") router.push({ name: "vasttag" });
          })
          .catch((err) => {
            router.push({ name: "createaccount" });
          });
      });

    const path1 = "https://6e9c-65-109-52-221.eu.ngrok.io/api/getUserByEmail";
    axios
      .post(path1, request, {
        headers: {
          "Content-Type": "application/json",
          withCredentials: true,
          "ngrok-skip-browser-warning": "any",
        },
      })
      .then((res) => {
        console.log(res.data);
        this.company = res.data;
        this.status = res.data.prod_env
      })
      .catch((err) => {
        console.log(err);
      });
  },
  watch: {
    startDate(newVal) {
      new Date(newVal).setHours(0, 0, 0, 0);
      const start_date = newVal ? newVal : new Date(1970, 1, 1);
      const end_date = this.endDate ? this.endDate : new Date(2500, 1, 1);
      console.log("star_date:", start_date);
      console.log("end_date:", end_date);
      this.getDemandsByDate(start_date, end_date);
    },
    endDate(newVal) {
      new Date(newVal).setHours(0, 0, 0, 0);
      const start_date = this.startDate ? this.startDate : new Date(1970, 1, 1);
      const end_date = this.endDate ? this.endDate : new Date(2500, 1, 1);
      console.log("star_date:", start_date);
      console.log("end_date:", end_date);
      this.getDemandsByDate(start_date, end_date);
    },
  },
};
</script>
