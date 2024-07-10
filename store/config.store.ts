import type { Config } from '@/model/config';
import { defineStore } from 'pinia';
import { coreshopNT, coreshopZH, coreshopLanguage, coreshopSystemConfig } from '@/consts';
import { setSessionStorage } from '@/utils';

export const useConfigStore = defineStore('configStore', {
    state: () => ({
        config: {} as Config,
        // todo
        language: coreshopNT as string,
    }),
    getters: {
        getConfig: (state) => state.config || {},
        getLanguage: (state) => useCookie(coreshopLanguage).value || state.language
    },
    actions: {
        setConfig(config?: Config) {
            this.config = config ||{};
            setSessionStorage(coreshopSystemConfig, config)
        },
        setLanguage(lang: string) {
            this.language = lang;
            useCookie(coreshopLanguage).value = lang;
        }
    },

    persist: {
        enabled: true,
        strategies: [
            {
                key: 'configStore',
                storage: process.client ? sessionStorage : undefined,
                paths: ['config']
            },
        ]
    }
})