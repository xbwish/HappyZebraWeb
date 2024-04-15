import { queryShopConfig } from "@/composables/config";
import { Result } from "@/model/result";
import { Config } from "@/model/config";
import { useCartStore, useConfigStore } from "@/store";

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.hook('app:beforeMount', async () => {
        //查询配置
        const config: Result<Config> = await queryShopConfig();
        if (!config.status) {
            return;
        }
        useConfigStore().setConfig(config.data);
        useCartStore().setCartProductTotal();
    });
    nuxtApp.hook('app:mounted', async () => {
        useCartStore().setCartProductTotal();
    });
})