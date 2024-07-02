<template>
  <CoreshopTitle :title="$t('登录')"></CoreshopTitle>
  <NuxtLayout name="coreshop-shop-header-back">
    <div class="layout-login">
      <div class="login-box">
        <CoreshopLoginRegister>
          <div class="other-login">
            <div class="other-login-title">{{ $t("其他登录方式") }}</div>
            <ul class="other-login-list">
              <li class="other-login-item" @click="handleToLineLogin">
                <img
                  src="/images/login/f37bb9112a9f59dd0af172f6caabe612.png"
                  alt=""
                />
              </li>
              <li class="other-login-item" @click="handleToFacebookLogin">
                <img src="/images/login/facebook_icon.png" alt="" />
              </li>
            </ul>
          </div>
        </CoreshopLoginRegister>
      </div>
      <!-- <div class="shop-desc">{{$t('快乐搬馬管理专家')}}</div> -->
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const route = useRoute()

definePageMeta({
  layout: false,
})

function objectToQuery(obj: any) {
  let query = ""
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      let value = obj[key]
      query += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&"
    }
  }
  query = query.slice(0, -1) // 去除最后一个多余的&
  return query
}

const handleToLineLogin = () => {
  const line_auth = "https://access.line.me/oauth2/v2.1/authorize"
  const auth_params = {
    backUrl: route.query.backUrl || '/',
    response_type: "code",
    client_id: "2004706479",
    redirect_uri: location.origin + "/login", // 在LINE Developers Console上注册的回调 URL 的 URL 编码字符串。您可以添加任何查询参数。
    state: "STATE", // 用于防止跨站点请求伪造的唯一字母数字字符串. 您的网络应用应为每个登录会话生成一个随机值。这不能是 URL 编码的字符串。
    scope: "profile openid email", // 向用户请求的权限,查询范围可以看官网(https://developers.line.biz/en/docs/line-login/integrate-line-login/#scopes)
  }
  // 这里使用了第三方库qs来处理参数
  const paramsString = objectToQuery(auth_params)
  window.location.href = `${line_auth}?${paramsString}`
}

const handleToFacebookLogin = () => {
  const { backUrl } = route.query
  window.FB.login((response: any) => {
    if (response.authResponse) {
      console.log("Welcome! Fetching your information.... ")
      window.FB.api("/me", { fields: "id,name,picture" }, (response: any) => {
        console.log("Good to see you ", response)
        const { id, name, picture } = response
        const avatar = (picture as any)?.data?.url || ""
        const paramsString = objectToQuery({
          id,
          name,
          avatar,
          source: "fb",
          backUrl,
        })
        window.location.href = `/login?${paramsString}`
      })
    } else {
      console.log("User cancelled login or did not fully authorize.")
    }
  })
}
</script>

<style lang="scss" scoped>
.layout-login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
}

.login-box {
  padding: 0 22px;
}
.shop-desc {
  text-align: center;
  font-weight: 400;
  color: #797979;
  line-height: 20px;
  position: fixed;
  bottom: 20px;
  width: 100%;
}
.other-login {
  margin-top: 46px;
  &-title {
    font-size: 14px;
    font-weight: 400;
    color: #979797;
    line-height: 20px;
    margin-bottom: 30px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    &::after,
    &::before {
      content: "";
      display: block;
      width: 85px;
      height: 1px;
      background-color: #e5e5e5;
      margin: 0 10px;
    }
    &::before {
      margin-right: 10px;
    }
    &::after {
      margin-left: 10px;
    }
  }
  &-list {
    display: flex;
    justify-content: space-evenly;
  }
  &-item {
    width: 50px;
    height: 50px;
    padding: 12px;
    box-sizing: border-box;
    overflow: hidden;
    background: #f3f3f3;
    border-radius: 100%;
    img {
      width: 100%;
      height: 100%;
      border-radius: 100%;
      overflow: hidden;
    }
  }
}
</style>
