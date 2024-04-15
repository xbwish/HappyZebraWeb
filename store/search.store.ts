import { defineStore } from 'pinia'
import { searchKeyword } from '@/consts'

export const useSearchStore = defineStore('useSearchStore', {
    state: () => ({
        keyword: '' as string
    }),
    getters: {
        getSearchKeyWord: (state) =>   state.keyword,
    },
    actions: {
        setSearchKeyWord(payload: string) {
            this.keyword = payload;
        },
    }
})