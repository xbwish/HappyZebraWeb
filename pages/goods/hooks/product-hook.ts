import type { UnwrapRef } from "vue"
import { GoodDescription, Product, SkuItem } from "@/model/product"
import type { Result } from "@/model/result"
import { useAccountStore } from "@/store"
import {
  queryGoodsDetailByToken,
  queryProductDetial,
  queryServiceDescription,
} from "@/composables/productService"
import { queryGoodsParams } from "@/composables/activity"
import { IWxShare, IShareParams, IShareMessageArguments } from "@/model"
import {
  ShareType,
  UrlSharePageType,
  UrlShareClentType,
  shareUrl,
} from "@/enum"
export const useProduct = () => {
  const route = useRoute()
  const detailData: UnwrapRef<{
    img: string
    value: number
    page: number
    isFav: boolean
    serviceDescription: GoodDescription
    goodParams: Array<any> // 收藏
    showSku: boolean
    showShare: boolean
    goodDetail: Product
    goodDetailExtendInfo: { [key: string]: any }
    wxShare: IWxShare
    shareParams: IShareParams
  }> = reactive({
    img: "",
    value: 1,
    page: 1,
    isFav: false, // 商品是否收藏
    serviceDescription: {
      commonQuestion: [],
      delivery: [],
      service: [],
    },
    goodParams: [],
    showSku: false,
    showShare: false,
    goodDetail: {},
    goodDetailExtendInfo: {},
    wxShare: {},
    shareParams: {
      params: {},
    },
  })

  const productDetailState: UnwrapRef<{
    chooseProductImage: string
    chooseSku?: SkuItem
    nums?: number
  }> = reactive({
    chooseProductImage: "",
    chooseSku: {},
    nums: 1,
  })

  const queryProductDetail = async () => {
    let goodDetialResult: Result<Product> = { data: [], msg: "", status: false }
    const _params = { id: route?.params?.id, data: true }

    if (useAccountStore().getToken) {
      goodDetialResult = await queryGoodsDetailByToken(_params)
    } else {
      goodDetialResult = await queryProductDetial(_params)
    }

    const goodDetail: Product = goodDetialResult?.data || {}

    // 分享信息
    getShareUrl({
      title: goodDetail.name || "",
      desc: goodDetail.brief || "",
      imgUrl: goodDetail.image || "",
      id: goodDetail.id,
    })

    const defaultSku: SkuItem =
      goodDetail.skuList?.sku_list?.find(
        (x) => parseFloat(x._id as string) === goodDetail.product?.id
      ) || {}
    productDetailState.chooseSku = defaultSku
    detailData.isFav = goodDetail.isFav
    detailData.goodDetail = goodDetail
    detailData.goodDetailExtendInfo = goodDetialResult.otherData

    //#region 获取商品关键词
    const goodDescription: Result<GoodDescription> =
      await queryServiceDescription()
    detailData.serviceDescription.commonQuestion =
      goodDescription.data?.commonQuestion || []
    detailData.serviceDescription.delivery =
      goodDescription.data?.delivery || []
    detailData.serviceDescription.service = goodDescription.data?.service || []

    const goodParams: Result<any> = await queryGoodsParams({
      id: route?.params?.id,
    })
    detailData.goodParams = goodParams.data
  }

  // 分享接口参数
  const getShareUrl = (data: IShareMessageArguments) => {
    detailData.shareParams.client = UrlShareClentType.wxofficial
    detailData.shareParams.page = UrlSharePageType.goods
    if (process.client) {
      detailData.shareParams.url = `${window.location.origin}${shareUrl}`
    }
    detailData.shareParams.type = ShareType.url
    detailData.shareParams.params.goodsId = data.id

    // 分享信息
    detailData.wxShare.title = data.title
    detailData.wxShare.desc = data.desc
    detailData.wxShare.imgUrl = data.imgUrl
  }

  return { queryProductDetail, detailData, productDetailState }
}
