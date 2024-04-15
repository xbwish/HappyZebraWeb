import { defineStore } from 'pinia'
export const useCommonStore = defineStore('common-store', {
    state: () => ({
        fromRoutePath: '' as string,
    }),
    getters: {
        get_from_route_path: (state) => state.fromRoutePath
    },
    actions: {
        set_from_route_path(fromRoutePath: string) {
            this.fromRoutePath = fromRoutePath;
        }
    }
})