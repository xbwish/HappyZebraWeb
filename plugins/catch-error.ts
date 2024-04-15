

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.hook('app:error', (err) => {
        console.log('err', err);
    });
})