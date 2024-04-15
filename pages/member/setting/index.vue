<template>
  <NuxtLayout name="personal-center">
    <coreshop-title :title="$t('设置')"></coreshop-title>
    <div class="set-box">
      <ul>
        <li>
          <nuxt-link to="/member/setting/userInfo">
            <div>
              <NIcon color="#000" :size="20">
                <CoreshopIconSettings24Regular />
              </NIcon>
              <p>{{$t('个人资料')}}</p>
            </div>
            <NIcon color="#000" :size="20">
              <CoreshopIconChevronRight28Regular />
            </NIcon>
          </nuxt-link>
        </li>
        <li v-if="isWechat()">
          <nuxt-link to="">
            <div>
              <NIcon color="#000" :size="20">
                <CoreshopIconArrowClockwise20Regular />
              </NIcon>
              <p>{{$t('同步微信昵称头像')}}</p>
            </div>
            <NIcon color="#000" :size="20">
              <CoreshopIconChevronRight28Regular />
            </NIcon>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/about">
            <div>
              <NIcon color="#000" :size="20">
                <CoreshopIconTextBulletListSquare24Regular />
              </NIcon>
              <p>{{$t('关于我们')}}</p>
            </div>
            <NIcon color="#000" :size="20">
              <CoreshopIconChevronRight28Regular />
            </NIcon>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/agreement">
            <div>
              <NIcon color="#000" :size="20">
                <CoreshopIconNotepad32Regular />
              </NIcon>
              <p>{{$t('用户协议')}}</p>
            </div>
            <NIcon color="#000" :size="20">
              <CoreshopIconChevronRight28Regular />
            </NIcon>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/privacyPolicy">
            <div>
              <NIcon color="#000" :size="20">
                <CoreshopIconEye20Filled />
              </NIcon>
              <p>{{$t('隐私政策')}}</p>
            </div>
            <NIcon color="#000" :size="20">
              <CoreshopIconChevronRight28Regular />
            </NIcon>
          </nuxt-link>
        </li>
        <li v-if="isWechat()">
          <nuxt-link to="">
            <div>
              <NIcon color="#000" :size="20">
                <CoreshopIconDelete20Regular />
              </NIcon>
              <p>{{$t('清除缓存')}}</p>
            </div>
            <NIcon color="#000" :size="20">
              <CoreshopIconChevronRight28Regular />
            </NIcon>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/login">
            <div>
              <NIcon color="#000" :size="20">
                <CoreshopIconDirections20Regular />
              </NIcon>
              <p>{{$t('切换账号')}}</p>
            </div>
            <NIcon color="#000" :size="20">
              <CoreshopIconChevronRight28Regular />
            </NIcon>
          </nuxt-link>
        </li>
      </ul>
    </div>
    <div class="login-out">
      <CoreshopButton class="cs-percent-w-100" size="medium" @on-click="handleLogOut">
        <CoreshopLanguage :text="$t('登出')" />
      </CoreshopButton>
    </div>
   
  </NuxtLayout>
</template>

<script setup lang="ts">
import { NIcon } from "naive-ui";
import { useAccountStore } from "@/store";

definePageMeta({
  layout: false,
});

const handleChangeAccount = () => {};
/** 退出 */
const handleLogOut = () => {
  useAccountStore().setClearAccountInfo();
  window.location.href = "/";
};
</script>

<style lang="scss" scoped>
.set-box {
  width: 9rem;
  padding: 0.25rem 0.3rem;
  border-radius: 5px;
  margin: 0.25rem auto 0.5rem auto;
  background: #ffffff;
  box-shadow: 10px 24px 54px rgba(15, 13, 35, 0.04);
  border-radius: 8px;

  ul {
    li {
      width: 100%;
      // border-bottom: 1px solid #eee;
      a {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.3rem 0;

        div:nth-of-type(1) {
          display: flex;
          align-items: center;

          img {
            width: 0.6rem;
          }

          p {
            font-size: 0.35rem;
            color: #000;
            margin-left: 0.3rem;
            margin-top: 0.05rem;
          }
        }
      }
    }

  }
}
.login-out{
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.55rem;
  margin: 0 0.3rem;
  overflow: hidden;
  .cs-percent-w-100{
    background: #D33123;
    height: 1.1rem;
  }
}
</style>
