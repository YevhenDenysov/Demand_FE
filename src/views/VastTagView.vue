<template>
    <div class="w-[680px] justify-center border rounded-[8px] relative">
      <span class="absolute -mt-[10px] ml-[20px] text-gray-600 bg-white"
        >Vast Tag</span
      >
      <v-form ref="form" class="m-[30px]">
        <v-text-field
          v-model="vastTag"
          :rules="vastTagRules"
          label="Vast Tag"
          required
        ></v-text-field>
        <div class="d-flex flex-column">
          <v-btn color="success" class="mt-4" block @click="validate">
            Submit
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
      vastTag: "",
      vastTagRules: [
        (v) => !!v || "VAST tag is required",
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
          const vast_tag = this.vastTag;
          const request = { user_email: user_email, vast_tag: vast_tag  }
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
    }
  };
  </script>
  