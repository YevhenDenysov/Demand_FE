<script setup>
import stytch from "../stytch";
import router from "../router";

// Look for the Stytch token in query params.
const queryParams = new URLSearchParams(window.location.search);
const token = queryParams.get("token");
const tokenType = queryParams.get("stytch_token_type");

// If a token is found, authenticate it with the appropriate method.
if (token && tokenType) {
  if (tokenType === "magic_links") {
    stytch.magicLinks
      .authenticate(token, {
        session_duration_minutes: 60,
      })
      .then(() => {
        console.log("Successful authentication: Email magic link");
        router.push({ name: "dashboard" });
      })
      .catch((err) => {
        console.error(err);
        alert(
          "Email Magic Link authentication failed. See console for details."
        );
      });
  } else if (tokenType === "oauth") {
    console.log("token==", token);
    stytch.oauth
      .authenticate(token, {
        session_duration_minutes: 60,
      })
      .then(() => {
        console.log("Successful authentication: OAuth");
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
      })
      .catch((err) => {
        console.error(err);
      });
  }
} else {
  // If query params are not found, announce that something went wrong.
  alert("Something went wrong. No token found to authenticate.");
}
</script>
<template>
  <div class="container">Authenticating...</div>
</template>
