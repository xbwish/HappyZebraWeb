<template>
  <div></div>
</template>
<script setup lang="ts">
import { queryDeshare } from "@/composables/shareService"
import { UrlSharePageType } from "@/enum/share.enum"
import type { Result } from "@/model/result"
import type { Share } from "@/model/share"
import { invitecode } from "@/consts"
import { sleep } from "@/utils/common"

const route = useRoute()
const router = useRouter()

//跳转到首页
const handleNavigateToHome = () => {
  router.push("/")
}

//跳转到商品----------------
const handleGoToGoods = (id: string | undefined) => {
  if (id) {
    return navigateTo(`/goods/detail/${id}?goodsId=${id}`, { replace: true })
  } else {
    handleNavigateToHome()
  }
}
//跳转到文章-----------------------
const handleGoToArticle = (
  id: string | undefined,
  idType: string | undefined
) => {
  if (id) {
    return navigateTo(`/article/detail/${id}?idType=${idType}`, {
      replace: true,
    })
  } else {
    handleNavigateToHome()
  }
}
//跳转到拼团------------------------
const hadnleGoToPinTuan = (
  id: string | undefined,
  teamId: string | undefined
) => {
  if (id) {
    return navigateTo(`/activity/pinTuan/detail?id=${id}&teamId=${teamId}`, {
      replace: true,
    })
  } else {
    handleNavigateToHome()
  }
}
//跳转到团购-----------------------
const handleGoToGroup = (groupId: string | undefined) => {
  if (groupId) {
    return navigateTo(`/activity/groupBuying/detail?id=${groupId}`, {
      replace: true,
    })
  } else {
    handleNavigateToHome()
  }
}

//跳转到秒杀----------------------------
const handleGoToSeckill = (groupId: string | undefined) => {
  if (groupId) {
    return navigateTo(`/member/distribution/detail?id=${groupId}`, {
      replace: true,
    })
  } else {
    handleNavigateToHome()
  }
}
//跳转到自定义页
const handleGoToCustom = (pageCode: string | undefined) => {
  if (pageCode && pageCode != "") {
    // let url = '/pages/index/custom/custom?pageCode=' + pageCode;
    // this.$u.route({ type: 'redirectTo', url: url });
  } else {
    handleNavigateToHome()
  }
}
// 店铺邀请--------------------
const handleGoToStore = (id: string | undefined) => {
  if (id) {
    return navigateTo(`/member/distribution/myStore?store=${id}`, {
      replace: true,
    })
  } else {
    handleNavigateToHome()
  }
}
// 代理商-----------------------
const handleGoToAgentStore = (id: string | undefined) => {
  if (id) {
    return navigateTo(`/member/agent/myStore?store=${id}`, { replace: true })
  } else {
    handleNavigateToHome()
  }
}
//跳转表单------------------------
const handleGoToForm = (id: string | undefined) => {
  if (id) {
    return navigateTo(`/form/detail/${id}`, { replace: true })
  } else {
    handleNavigateToHome()
  }
}
//跳转接龙-------------------------
const handleGoToSolitaire = (id: string | undefined) => {
  if (id) {
    return navigateTo(`/activity/solitaire/detail?id=${id}`, { replace: true })
  } else {
    handleNavigateToHome()
  }
}

//服务商品-------------------------
const handleGoToServiceGoods = (id: string | undefined) => {
  if (id) {
    return navigateTo(`/serviceGood/detail?id=${id}&goodsId=${id}`, {
      replace: true,
    })
  } else {
    handleNavigateToHome()
  }
}

//存储邀请码
const saveInviteCode = (code: string = "") => {
  useCookie(invitecode).value = code
}

const getDeshare = async () => {
  await sleep(50)

  const deshareData: Result<Share> = await queryDeshare({
    code: route?.query.scene,
  })

  if (!deshareData.status) {
    return handleNavigateToHome()
  }
  saveInviteCode(deshareData.data?.userShareCode) //存储邀请码
  const shareType: UrlSharePageType = Number(
    deshareData.data.page
  ) as UrlSharePageType
  switch (shareType) {
    case UrlSharePageType.index: //首页
      handleNavigateToHome() //正常
      break
    case UrlSharePageType.goods: //商品
      handleGoToGoods(deshareData.data?.params?.goodsId) //正常
      break
    case UrlSharePageType.pinTuan: //拼团
      hadnleGoToPinTuan(
        deshareData.data.params?.groupId,
        deshareData.data.params?.teamId
      ) //正常
      break
    case UrlSharePageType.inv: //店铺邀请
      handleGoToStore(deshareData.data.params?.store) //正常
      break
    case UrlSharePageType.article: //文章页面
      handleGoToArticle(
        deshareData.data.params?.articleId,
        deshareData.data.params?.articleType
      ) //正常
      break
    case UrlSharePageType.addPinTuan: //参团页面
      // gotoInvitationGroup(deshareData.data.params.goodsId, deshareData.data.params.groupId, deshareData.data.params.teamId)
      break
    case UrlSharePageType.page: //自定义页面
      handleGoToCustom(deshareData.data.params?.pageCode)
      break
    case UrlSharePageType.form: //智能表单
      handleGoToForm(deshareData.data.params?.id)
      break
    case UrlSharePageType.group: //团购
      handleGoToGroup(deshareData.data.params?.groupId) //正常
      break
    case UrlSharePageType.seckill: //秒杀
      handleGoToSeckill(deshareData.data.params?.groupId) //正常
      break
    case UrlSharePageType.agent: //代理商
      handleGoToAgentStore(deshareData.data.params?.store) //正常
      break
    case UrlSharePageType.solitaire: //接龙
      handleGoToSolitaire(deshareData.data.params?.id) //正常
      break
    case UrlSharePageType.serviceGoods: //服务商品
      handleGoToServiceGoods(deshareData.data.params?.serviceGoodsId) //正常
      break
    default:
      handleNavigateToHome() //正常
      break
  }
}

if (route.query?.scene) {
  getDeshare()
} else {
  handleNavigateToHome()
}
</script>
