<style>
@import './modal.css';
</style>

<template>
  <div class="modal-backdrop">
  <div class="modal w-[500px] p-[20px] border border-[5px]">
    <!-- <header class="modal-header">
        <slot name="header">
          <h1 class="text-center">Add New Demand Sourc</h1>
        </slot>
        <button
          type="button"
          class="btn-close"
          @click="close"
        >
          x
                      </button>
                    </header> -->
      <h1 class="text-center text-[30px] font-bold bg-[#eeeeee] py-[5px]">Add New Demand Source</h1>
      <div class="flex w-full mt-[20px] gap-3">
        <div class="w-[100px] flex items-center">
          <h1 class="font-bold">Name</h1>
        </div>
        <input class="w-full border border-black rounded-[4px] px-[5px] py-[4px]" />
      </div>
      <div class="flex mt-[20px] gap-3">
        <div class="w-[100px] flex items-center">
          <h1 class="font-bold">Status</h1>
        </div>
        <v-switch class="flex" label="Active" color="secondary" hide-details></v-switch>
      </div>
      <div class="flex w-full mt-[20px] gap-3">
        <div class="w-[100px] flex items-center">
          <h1 class="font-bold">Floor[cpm]</h1>
        </div>
        <input class="w-full border border-black rounded-[4px] px-[5px] py-[4px]" />
      </div>
      <div class="flex w-full mt-[20px] gap-3">
        <div class="w-[100px] flex items-center">
          <h1 class="font-bold">Bid Type</h1>
        </div>
        <div class="flex gap-2">
          <div class="flex justify-center items-center">
            <h1>Static</h1>
          </div>
          <v-switch class="flex" hide-details></v-switch>
          <div class="flex justify-center items-center">
            <h1>Dynamic</h1>
          </div>
        </div>
      </div>
      <div class="flex w-full mt-[20px] gap-3">
        <div class="w-[100px] flex items-center">
          <h1 class="font-bold">VAST Url</h1>
        </div>
        <input class="w-full border border-black rounded-[4px] px-[5px] py-[4px]" />
      </div>

      <div class="flex justify-between mt-[30px]">
        <button type="button" class="text-[20px] px-[30px] py-[10px]  rounded-[40px] border border-black" @click="close">
          CANCEL
        </button>
        <button type="button"
          class="text-[20px] px-[30px] py-[10px] border rounded-[40px] border-black font-bold text-white bg-black "
          @click="close">
          CREAT
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>