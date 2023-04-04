<template>
    <div class="w-[680px] justify-center border rounded-[8px] relative">
      <span class="absolute -mt-[10px] ml-[20px] text-gray-600 bg-white"
        >Vast Tag</span
      >
      <v-form ref="form" class="m-[30px]">
        <h1>What version of VAST does your ad server support?</h1>
        <v-combobox
          :items="['VAST 2.0', 'VAST 3.0', 'VAST 4.0', 'VAST 4.1', 'VAST 4.2']"
          v-model="vastTagVersion"
          :rules="vastTagVersionRules"
        ></v-combobox>
        <h1>How does the ad server pass client IP?</h1>
        <v-combobox
          :items="['Via Macro','Via Header']"
          v-model="serverPassIp"
          :rules="serverPassIpRules"
        ></v-combobox>
        <h1>Does your ad server support a pods?</h1>
        <v-combobox
          :items="['Yes', 'No']"
          v-model="serverSupport"
          :rules="serverSupportRules"
          :disabled="isVastTagVersionDisabled"
        ></v-combobox>
        <div class="d-flex flex-column">
          <v-btn color="success" class="mt-4" block @click="validate">
            That's all the quesions
          </v-btn>
        </div>
      </v-form>
    </div>
  </template>
  
  <script>
  import axios from  'axios'
  import router from '../router'

  export default {
    name: 'VastTagView',
    data: () => ({
      valid: true,
      vastTagVersion: "",
      serverPassIp: "",
      serverSupport: "",
      isVastTagVersionDisabled: true,
      vastTagVersionRules: [
        (v) => !!v || "VAST version tag is required",
      ],
      serverPassIpRules: [
        (v) => !!v || "serverPassIp tag is required",
      ],
      serverSupportRules: [
        (v) => !!v || "serverSupport tag is required",
      ]
    }),
    methods: {
      async validate() {
        const { valid } = await this.$refs.form.validate();
        console.log("valid:",valid);
        if (valid) 
        {
          const data = localStorage.getItem('stytch_sdk_state_' + import.meta.env.VITE_STYTCH_PUBLIC_TOKEN)
          const jsonData = JSON.parse(data)
  
          const user_email = jsonData.user.emails[0].email;
          const vast_tag_version = this.vastTagVersion;
          const server_pass_ip = this.serverPassIp;
          const server_support = this.serverSupport;
          const request = { user_email: user_email, vast_tag_version: vast_tag_version, server_pass_ip: server_pass_ip, server_support: server_support  }
          const path = "https://6e9c-65-109-52-221.eu.ngrok.io/api/createVast";
          console.log(path);
          axios.post(path, request, {
            headers: {
              "Content-Type": "application/json",
              withCredentials: true,
              "ngrok-skip-browser-warning": "any",
            }}).then((res) => {
              console.log(res.data);
              if(res.data === 'ok')
                router.push('/dashboard')
              else router.push('/vastTag')
          })
          .catch((err) => {
              console.log(err)
          })
        }
      }
    },
    created() {
      console.log("vastTag started")
      const data = localStorage.getItem(
      "stytch_sdk_state_" + import.meta.env.VITE_STYTCH_PUBLIC_TOKEN
      );
      const jsonData = JSON.parse(data);
      const user_email = jsonData.user.emails[0].email;
      
      console.log("userEmail:",user_email)
      const request = {user_email: user_email}

      const path = "https://6e9c-65-109-52-221.eu.ngrok.io/api/checkEmail";
      axios.post(path, request, {
          headers: {
            "Content-Type": "application/json",
            withCredentials: true,
            "ngrok-skip-browser-warning": "any",
          },
        }).then((res) => {
          console.log("checkEmail:",res.data)
          if(res.data == 'ok')
          {
            const path1 = "https://6e9c-65-109-52-221.eu.ngrok.io/api/checkVastTag";
            axios.post(path1, request, {
              headers: {
                "Content-Type": "application/json",
                withCredentials: true,
                "ngrok-skip-browser-warning": "any",
              },
            }).then((res) => {
              console.log('checkvastTag:',res.data)
              if(res.data == 'ok')
                router.push({name: 'dashboard'})
            }).catch((err) => {
              console.log(err)
              router.push({name: 'vasttag'})
            })
          }
        }).catch((err) => {
          console.log(err)
          router.push({ name: 'createaccount' })
        })
    },
    watch: {
      vastTagVersion: function (newVal){
        console.log(newVal);
        if (newVal == 'VAST 2.0' || newVal == 'VAST 3.0')
          this.isVastTagVersionDisabled = true;
        else this.isVastTagVersionDisabled = false;
      }
    }
  };
  </script>
  