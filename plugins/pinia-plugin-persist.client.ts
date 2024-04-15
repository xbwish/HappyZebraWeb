import piniaPersist from 'pinia-plugin-persist';
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.$pinia?.use(piniaPersist);
});

// import { Context } from '@nuxt/types'
// import piniaPersist from 'pinia-plugin-persist'

// export default ({ app }: Context) => {
//     app.pinia?.use(piniaPersist)
// }