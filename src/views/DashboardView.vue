<script setup>
import stytch from '../stytch'
import { mdiHome } from '@mdi/js'

let user = stytch.user.getSync()
let session = stytch.session.getSync()

function logout() {
  stytch.session.revoke()
}
</script>
<template>
  <div class="container ">
    <button @click="logout"
      class="w-[100px] bg-indigo-500 text-white rounded-[4px] font-bold mb-3 py-[10px] text-[20px]">Log out</button>
    <div class="card">
      <div class="flex justify-between w-full">
        <div>
          <button type="button" class="bg-gray-800 text-white px-[5px] py-[10px] font-bold rounded-[10px]" @click="showModal">+ADD New Demand</button>
        </div>
        <div class="flex gap-4">
          <h1>Start Date</h1>
          <h1>End Date</h1>
        </div>
      </div>

      <div class="grid grid-cols-5 gap-4 w-full mt-[40px]">
        <div class="border border-[2px] border-black rounded-[4px] p-[10px]">
          <h1 class="font-bold text-[20px] text-center">Auctions</h1>
          <h1 class="text-[30px] text-center">123.2M</h1>
        </div>
        <div class="border border-[2px] border-black rounded-[4px] p-[10px]">
          <h1 class="font-bold text-[20px] text-center">Auctions</h1>
          <h1 class="text-[30px] text-center">123.2M</h1>
        </div>
        <div class="border border-[2px] border-black rounded-[4px] p-[10px]">
          <h1 class="font-bold text-[20px] text-center">Auctions</h1>
          <h1 class="text-[30px] text-center">123.2M</h1>
        </div>
        <div class="border border-[2px] border-black rounded-[4px] p-[10px]">
          <h1 class="font-bold text-[20px] text-center">Auctions</h1>
          <h1 class="text-[30px] text-center">123.2M</h1>
        </div>
        <div class="border border-[2px] border-black rounded-[4px] p-[10px]">
          <h1 class="font-bold text-[20px] text-center">Waterfall Lift</h1>
          <h1 class="text-[30px] text-center">123.2M</h1>
        </div>
      </div>

      <div class="grid grid-cols-8 w-full mt-[40px]" id="header">
        <div class="bg-gray-800 text-white border border-black border-[2px] text-[15px] py-[20px] font-bold text-center">
          Name</div>
        <div class="bg-gray-800 text-white border border-black border-[2px] text-[15px] py-[20px] font-bold text-center">
          Status</div>
        <div class="bg-gray-800 text-white border border-black border-[2px] text-[15px] py-[20px] font-bold text-center">
          Floor[cpm]</div>
        <div class="bg-gray-800 text-white border border-black border-[2px] text-[15px] py-[20px] font-bold text-center">
          Bid Type</div>
        <div class="bg-gray-800 text-white border border-black border-[2px] text-[15px] py-[20px] font-bold text-center">
          VAST Url</div>
        <div class="bg-gray-800 text-white border border-black border-[2px] text-[15px] py-[20px] font-bold text-center">
          Fill Rate</div>
        <div class="bg-gray-800 text-white border border-black border-[2px] text-[15px] py-[20px] font-bold text-center">
          Revenue</div>
      </div>

      <div class="grid grid-cols-8 w-full" id="header">
        <div class="bg-white text-black border border-black border-[2px] text-[15px] py-[20px] font-bold text-center">ACME
          SSP</div>
        <div class="bg-white text-black border border-black border-[2px] text-[15px] py-[20px] font-bold text-center">
          Active</div>
        <div class="bg-white text-black border border-black border-[2px] text-[15px] py-[20px] font-bold text-center">$8
        </div>
        <div class="bg-white text-black border border-black border-[2px] text-[15px] py-[20px] font-bold text-center">
          Fixed</div>
        <div class="bg-white text-black border border-black border-[2px] text-[15px] py-[20px] font-bold text-center">
          https://exa..</div>
        <div class="bg-white text-black border border-black border-[2px] text-[15px] py-[20px] font-bold text-center">
          21.9%</div>
        <div class="bg-white text-black border border-black border-[2px] text-[15px] py-[20px] font-bold text-center">
          $7.1k</div>
        <div class="bg-white text-black text-[15px] py-[20px] font-bold text-center">
          <MdiHome />
        </div>
      </div>
    </div>
    <Modal
      v-show="isModalVisible"
      @close="closeModal"
    />
  </div>
</template>

<script>
  import Modal from '../components/Demand_modal/Modal.vue'

  export default {
    name: 'DashboardView',
    components: {
      Modal,
    },
    data() {
      return {
        isModalVisible: false,
      };
    },
    methods: {
      showModal() {
        this.isModalVisible = true;
      },
      closeModal() {
        this.isModalVisible = false;
      }
    }
  }
</script>