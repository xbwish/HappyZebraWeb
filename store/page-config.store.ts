import { defineStore } from 'pinia'

export const usePageConfig = defineStore('page-config-store', {
    state: () => ({
        showBack: true as boolean,
        style: {} as { [key: string]: any }
    }),
    getters: {
        get_show_back: (state) => state.showBack,
        get_back_style: (state) => state.style
    },
    actions: {
        set_show_back(showBack: boolean = true) {
            this.showBack = showBack;
        },
        set_back_style(style: { [key: string]: any }) {
            this.style = style;
        }
    }
})

