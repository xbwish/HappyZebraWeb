import { useConfigStore } from "@/store";
import { createI18n } from 'vue-i18n'

import en from '../locales/en.json'
import zh from '../locales/zh.json'
import nt from '../locales/nt.json'
export default defineNuxtPlugin(({ vueApp }) => {
   const i18n = createI18n({
        legacy: false,
        globalInjection: true,
        locale: (useRoute().query.lang as string) || useConfigStore().getLanguage,
        messages: {
            en,
            zh,
            nt
        }
    })
    vueApp.use(i18n);
})