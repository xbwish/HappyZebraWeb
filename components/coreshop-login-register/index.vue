<template>
  <div>
    <div class="logo">
      <!-- <Image src="/images/logoMin.png" width="50" height="80" fit="cover" /> -->
      <Image
        src="/images/login/login-logo.png"
        width="158"
        height="158"
        fit="cover"
      />
      <!-- <div class="shop-name">快樂搬馬</div> -->
    </div>

    <ul class="cs-font-size-20">
      <li class="cs-m-b-20">
        <Field
          class="phone"
          center
          type="number"
          v-model="mobile"
          @update:model-value="onPhoneChange($event)"
          :placeholder="$t('请输入手机号')"
        ></Field>
      </li>
      <li
        class="cs-m-b-20 cs-display-flex cs-justify-content-space-between cs-align-self-center"
      >
        <Field
          class="verify"
          center
          type="number"
          v-model="code"
          @update:model-value="onVerifyCode($event)"
          :placeholder="$t('请输入验证码')"
        ></Field>

        <CoreshopButton
          class="cs-m-l-20 cs-w-120 btn-code"
          @click="handleSendCode"
          :disabled="sendSmsCodeDisabled"
          :bgColor="sendSmsCodeDisabled ? '#000' : '#404040'"
        >
          <div v-if="sendSmsCodeDisabled">
            <CountDown
              ref="countdown"
              :time="59 * 1000"
              :onFinish="onFinish"
              format="ss"
            >
              <template #default="timeData">
                <span class="time">{{ timeData.seconds }}</span>
              </template>
            </CountDown>
          </div>
          <div v-else>
            {{ $t("获取验证码") }}
          </div>
        </CoreshopButton>
      </li>
      <li class="cs-m-b-20">
        <CoreshopButton
          class="cs-percent-w-100 login"
          :text="$t(props.buttonTitile)"
          :size="btnSize.large"
          @click="handleLogin"
        ></CoreshopButton>
      </li>
      <slot />
    </ul>
  </div>
</template>

<script setup lang="ts">
import { Ref } from "vue";
import { sendSmsCode, smsCodeLogin, queryGetLineToken, queryGetLineProfile, queryLineLogin } from "@/composables/smsService";
import { CountdownProps, CountdownInst } from "naive-ui";
import { ILogin, IAuth } from "@/model/login";
import { Result } from "@/model/result";
import { useAccountStore } from "@/store";
import { showToast, Image, Field, CountDown, showLoadingToast } from "vant";
import { btnSize } from "@/enum";
import { invitecode } from "@/consts";

const rotue = useRoute();

const props = withDefaults(
  defineProps<{
    title?: string;
    buttonTitile?: string;
  }>(),
  {
    title: "用户登录",
    buttonTitile: "立即登录",
  }
);

const countdown = ref<CountdownInst | null>();
const sendSmsCodeDisabled: Ref<boolean> = ref<boolean>(false);
const accountStore = useAccountStore();
let mobile = ref<number>();
let code = ref<number>();

const loginState = reactive<ILogin>({
  loginType: 2,
  platform: 1,
});

if (rotue.query.sessionAuthId) {
  loginState["sessionAuthId"] = rotue.query?.sessionAuthId as string;
}

const renderCountdown: CountdownProps["render"] = ({ seconds }) => {
  return `${String(seconds).padStart(2, "0")}s`;
};

const lineCallbackLogin = async () => {
  const loading = showLoadingToast({
    message: '加载中...',
    forbidClick: true,
    loadingType: 'spinner',
    overlay: true,
    duration: 0,
  });
  const { data: tokenInfo } = await queryGetLineToken({
    grant_type: 'authorization_code', // 固定值
    code: rotue.query.code as string, // 从 LINE 平台收到的授权码
    client_id: '2004706479',
    client_secret: 'ca01e5ba49b52750c49adaca1edc9c51',
    redirect_uri: 'http://aa.xs1888.cc/login' // 与授权请求redirect_uri中指定的值相同
  })

  const { data: userinfo } = await queryGetLineProfile({
    'Authorization': `${(tokenInfo as any).value?.token_type} ${(tokenInfo as any).value?.access_token}`
  })

  let data: any = {
    nickname: (userinfo as any).value?.displayName,
    sessionAuthId: (userinfo as any).value?.userId,
    avatar: (userinfo as any).value?.pictureUrl,
    platform: loginState.platform,
    invitecode: useCookie(invitecode).value || undefined,
  };
  
  const loginResult: Result<any> = await queryLineLogin(data);
  if (!loginResult.status || !loginResult.data?.success) {
    showToast(loginResult.msg || "网络异常，登录失败");
    return;
  }
  loading && loading.close()
  accountStore.setAccountInfo(loginResult.data);
  return navigateTo(
    rotue.query?.backUrl ? (rotue.query.backUrl as string) : "/"
  );
}

onMounted(() => {
  if (rotue.query.code && rotue.query.state) {
    lineCallbackLogin()
  }
})

const onFinish = () => {
  sendSmsCodeDisabled.value = false;
};

const onPhoneChange = (phone: number) => {
  mobile.value = phone;
};

const onVerifyCode = (verifyCode: number) => {
  code.value = verifyCode;
};

const handleSendCode = async () => {
  if (!mobile.value) {
    showToast("请输入手机号码");
    return;
  }
  /* 
	if (!mobileReg.test(`${mobile.value}`)) {
		showToast("请输入正确手机号码");
		return;
	} */

  const sendResult: Result = await sendSmsCode({
    mobile: mobile.value,
    code: "login",
  });
  if (sendResult.code !== 0) {
    showToast(sendResult.msg || "发送验证码失败");
    return;
  }
  sendSmsCodeDisabled.value = true;
};

const handleLogin = async () => {
  if (!mobile.value) {
    showToast("请输入手机号码");
    return;
  }

  if (!code.value) {
    showToast("请输入验证码");
    return;
  }

  if (`${code.value}`.length !== 6) {
    showToast("验证码错误");
    return;
  }
  let data: any = {
    ...loginState,
    mobile: mobile.value,
    code: code.value,
  };
  if (useCookie(invitecode).value != "") {
    data[invitecode] = useCookie(invitecode).value;
  }

  const loginResult: Result<IAuth> = await smsCodeLogin(data);
  if (!loginResult.status || !loginResult.data?.success) {
    showToast(loginResult.msg || "网络异常，登录失败");
    return;
  }
  accountStore.setAccountInfo(loginResult.data);
  return navigateTo(
    rotue.query?.backUrl ? (rotue.query.backUrl as string) : "/"
  );
};
</script>

<style lang="scss" scoped>
.logo {
  text-align: center;
  margin-top: 65px;

  .shop-name {
    font-size: 20px;
    font-weight: 400;
    color: #191919;
    letter-spacing: 6px;
    margin: 16px 0 20px 0;
  }
}

.btn-code {
  height: 50px;
  border-radius: 25px;
}

.login {
  height: 44px;
  box-shadow: 0 0 6px 0 #ff7354;
  border-radius: 22px;
  background: #d33123;
}

.phone,
.verify {
  border-radius: 25px;
  height: 50px;
  box-sizing: border-box;
  border: 0.5px solid #dbdbdb;
  background: #f7f7f7;
  font-size: 16px;
}
.time {
  color: #ffffff;
}
</style>
