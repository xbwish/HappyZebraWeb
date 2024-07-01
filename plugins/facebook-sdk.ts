import { Plugin } from "@nuxt/types"

declare global {
  interface Window {
    fbAsyncInit: () => void
    FB: any
  }
}

const facebookSDKPlugin: Plugin = (context, inject) => {
  console.log("inject: ", inject)
  if (process.client) {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "1104419370665861",
        cookie: true, // Enable cookies to allow the server to access the session.
        xfbml: true, // Parse social plugins on this webpage.
        version: "v20.0", // Use this Graph API version for this call.
      })

      inject?.("FB", window.FB)
    }

    const script = document.createElement("script")
    script.src = "https://connect.facebook.net/en_US/sdk.js"
    script.async = true
    script.defer = true
    document.head.appendChild(script)
  }
}

export default facebookSDKPlugin
