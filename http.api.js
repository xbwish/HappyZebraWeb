
// 此文件是用来参考接口调用，后期将会删除


    // 获取店铺配置
    //let shopConfig = (params, config = {}) => http.post('/Api/Common/GetConfig', params, { custom: { methodName: 'common.shopConfig', needToken: false } });
    let shopConfigV2 = (params, config = {}) => http.post('/Api/Common/GetConfigV2', params, {custom: {methodName: 'common.shopConfigV2', needToken: false}});
    //获取商城关键词说明
    let getServiceDescription = (params, config = {}) => http.post('/Api/Common/GetServiceDescription', params, {custom: {methodName: 'common.getServiceDescription', needToken: false}});
    // 用户信息
    let userInfo = (params, config = {}) => http.post('/Api/User/GetUserInfo', params, {custom: {methodName: 'user.info', needToken: true}});
    // 上传头像
    let changeAvatar = (params, config = {}) => http.post('/Api/User/ChangeAvatar', params, {custom: {methodName: 'user.changeavatar', needToken: true}});
    // 编辑用户信息
    let editInfo = (params, config = {}) => http.post('/Api/User/EditInfo', params, {custom: {methodName: 'user.editinfo', needToken: true}});
    // 发送短信验证码
    let sms = (params, config = {}) => http.post('/Api/User/SendSms', params, {custom: {methodName: 'user.sms', needToken: false}});
    // 短信验证码登录
    let smsLogin = (params, config = {}) => http.post('/Api/User/SmsLogin', params, {custom: {methodName: 'user.smslogin', needToken: false}});
    // 退出登录
    let logout = (params, config = {}) => http.post('/Api/User/LogOut', params, {custom: {methodName: 'user.logout', needToken: true}});
    // 获取首页幻灯片
    let slider = (params, config = {}) => http.post('/Api/Advert/GetAdvertList', params, {custom: {methodName: 'advert.getAdvertList', needToken: false}});
    // 获取广告
    let advert = (params, config = {}) => http.post('/Api/Advert/GetPositionList', params, {custom: {methodName: 'advert.getcarousellists', needToken: false}});
    // 获取公告列表
    let notice = (params, config = {}) => http.post('/Api/Notice/NoticeList', params, {custom: {methodName: 'notice.noticeList', needToken: false}});
    // 获取公告详情
    let noticeInfo = (params, config = {}) => http.post('/Api/Notice/NoticeInfo', params, {custom: {methodName: 'notice.noticeInfo', needToken: false}});
    // 获取文章详情
    let articleInfo = (params, config = {}) => http.post('/Api/Article/GetArticleDetail', params, {custom: {methodName: 'articles.getArticleDetail', needToken: false}});
    // 获取文章列表
    let articleList = (params, config = {}) => http.post('/Api/Article/GetArticleList', params, {custom: {methodName: 'articles.getArticleList', needToken: false}});


    // 获取商品分类
    let categories = (params, config = {}) => http.post('/Api/Good/GetAllCategories', params, {custom: {methodName: 'categories.getallcat', needToken: false}});
    // 获取商品列表
    let goodsList = (params, config = {}) => http.post('/Api/Good/GetGoodsPageList', params, {custom: {methodName: 'goods.goodsList', needToken: false}});
    //获取随机推荐商品
    let getGoodsRecommendList = (params, config = {}) => http.post('/Api/Good/GetGoodsRecommendList', params, {custom: {methodName: 'goods.getGoodsRecommendList', needToken: false}});
    // 获取商品参数信息
    let goodsParams = (params, config = {}) => http.post('/Api/Good/GetGoodsParams', params, {custom: {methodName: 'goods.getgoodsparams', needToken: false}});
    // 获取设置默认货品
    let getProductInfo = (params, config = {}) => http.post('/Api/Good/GetProductInfo', params, {custom: {methodName: 'goods.getproductinfo', needToken: false}});
    // 获取商品评论信息
    let goodsComment = (params, config = {}) => http.post('/Api/Good/GetGoodsComment', params, {custom: {methodName: 'goods.getgoodscomment', needToken: false}});
    // 获取商品详情
    let goodsDetail = (params, config = {}) => http.post('/Api/Good/GetDetial', params, {custom: {methodName: 'goods.getdetial', needToken: false}});
    // 获取商品详情
    let goodsDetailByToken = (params, config = {}) => http.post('/Api/Good/GetDetialByToken', params, {custom: {methodName: 'goods.getDetialByToken', needToken: true}});

    // 获取商品详情
    let goodsSku = (params, config = {}) => http.post('/Api/Good/GetSku', params, {custom: {methodName: 'goods.getdetial', needToken: false}});
    // 获取商品详情
    let goodsSkuByToken = (params, config = {}) => http.post('/Api/Good/GetSkuByToken', params, {custom: {methodName: 'goods.getDetialByToken', needToken: true}});





    // 添加购物车
    let addCart = (params, config = {}) => http.post('/Api/Cart/AddCart', params, {custom: {methodName: 'cart.add', needToken: true}});
    // 移除购物车
    let removeCart = (params, config = {}) => http.post('/Api/Cart/DoDelete', params, {custom: {methodName: 'cart.del', needToken: true}});
    // 获取购物车列表
    let cartList = (params, config = {}) => http.post('/Api/Cart/GetList', params, {custom: {methodName: 'cart.getlist', needToken: true}});
    // 设置购物车商品数量
    let setCartNum = (params, config = {}) => http.post('/Api/Cart/SetCartNum', params, {custom: {methodName: 'cart.setnums', needToken: true}});
    // 获取购物车数量
    let getCartNum = (params, config = {}) => http.post('/Api/User/GetCartNumber', params, {custom: {methodName: 'cart.getnumber', needToken: true}});
    // 获取购物车数量和商品总价格
    let getCartNumAndMoney = (params, config = {}) => http.post('/Api/User/GetCartNumberAndMoney', params, {custom: {methodName: 'cart.getnumber', needToken: true}});
    // 根据购物车已有数据获取能够使用的优惠券
    let getCartCoupon = (params, config = {}) => http.post('/Api/Cart/GetCartAvailableCoupon', params, {custom: {methodName: 'cart.getCartCoupon', needToken: true}});

    // 获取用户的收货地址列表
    let userShip = (params, config = {}) => http.post('/Api/User/GetUserShip', params, {custom: {methodName: 'user.getusership', needToken: true}});
    // 获取用户默认收货地址
    let userDefaultShip = (params, config = {}) => http.post('/Api/User/GetUserDefaultShip', params, {custom: {methodName: 'user.getuserdefaultship', needToken: true}});
    // 存储用户收货地址
    let saveUserShip = (params, config = {}) => http.post('/Api/User/SaveUserShip', params, {custom: {methodName: 'user.vuesaveusership', needToken: true}});
    // 微信存储收货地址
    let saveUserShipWx = (params, config = {}) => http.post('/Api/User/SaveUserShip', params, {custom: {methodName: 'user.saveusership', needToken: true}});
    //获取区域ID
    let getAreaId = (params, config = {}) => http.post('/Api/User/GetAreaId', params, {custom: {methodName: 'user.getareaid', needToken: false}});
    //根据区/县名称获取城市id信息
    let getAreaIdByName = (params, config = {}) => http.post('/Api/User/GetAreaIdByName', params, {custom: {methodName: 'user.getareaid', needToken: false}});
    // 获取收货地址详情
    let shipDetail = (params, config = {}) => http.post('/Api/User/GetShipDetail', params, {custom: {methodName: 'user.getshipdetail', needToken: true}});
    // 收货地址编辑
    let editShip = (params, config = {}) => http.post('/Api/User/SaveUserShip', params, {custom: {methodName: 'user.editship', needToken: true}});
    // 收货地址删除
    let removeShip = (params, config = {}) => http.post('/Api/User/RemoveShip', params, {custom: {methodName: 'user.removeship', needToken: true}});
    // 设置默认收货地址
    let setDefShip = (params, config = {}) => http.post('/Api/User/SetDefShip', params, {custom: {methodName: 'user.setdefship', needToken: true}});

    // 生成订单
    let createOrder = (params, config = {}) => http.post('/Api/Order/CreateOrder', params, {custom: {methodName: 'order.create', needToken: true}});
    // 取消订单
    let cancelOrder = (params, config = {}) => http.post('/Api/Order/CancelOrder', params, {custom: {methodName: 'order.cancel', needToken: true}});
    // 删除订单
    let delOrder = (params, config = {}) => http.post('/Api/Order/DeleteOrder', params, {custom: {methodName: 'order.del', needToken: true}});
    // 获取订单详情
    let orderDetail = (params, config = {}) => http.post('/Api/Order/OrderDetails', params, {custom: {methodName: 'order.details', needToken: true}});
    // 确认收货
    let confirmOrder = (params, config = {}) => http.post('/Api/Order/OrderConfirm', params, {custom: {methodName: 'order.confirm', needToken: true}});
    // 获取配送方式
    let orderShip = (params, config = {}) => http.post('/Api/Order/GetShip', params, {custom: {methodName: 'order.getship', needToken: true}});
    // 获取全部订单列表
    let orderList = (params, config = {}) => http.post('/Api/Order/GetOrderList', params, {custom: {methodName: 'order.getorderlist', needToken: true}});
    // 获取订单不同状态的数量
    let getOrderStatusSum = (params, config = {}) => http.post('/Api/Order/GetOrderStatusNum', params, {custom: {methodName: 'order.getorderstatusnum', needToken: true}});
    // 获取不同类型营销下单支持的配送方式
    let getOrderDistributionModel = (params, config = {}) => http.post('/Api/Order/GetOrderDistributionModel', params, {custom: {methodName: 'order.getOrderdistributionmodel', needToken: true}});

    // 售后单列表
    let afterSalesList = (params, config = {}) => http.post('/Api/Order/AftersalesList', params, {custom: {methodName: 'order.aftersaleslist', needToken: true}});
    // 售后单详情
    let afterSalesInfo = (params, config = {}) => http.post('/Api/Order/Aftersalesinfo', params, {custom: {methodName: 'order.aftersalesinfo', needToken: true}});
    // 添加售后单
    let addAfterSales = (params, config = {}) => http.post('/Api/Order/AddAftersales', params, {custom: {methodName: 'order.addaftersales', needToken: true}});
    // 用户发送退货包裹
    let sendShip = (params, config = {}) => http.post('/Api/Order/SendReship', params, {custom: {methodName: 'order.sendreship', needToken: true}});

    // 添加商品浏览足迹
    let addGoodsBrowsing = (params, config = {}) => http.post('/Api/User/AddGoodsBrowsing', params, {custom: {methodName: 'user.addgoodsbrowsing', needToken: true}});
    // 删除商品浏览足迹
    let delGoodsBrowsing = (params, config = {}) => http.post('/Api/User/DelGoodsBrowsing', params, {custom: {methodName: 'user.delgoodsbrowsing', needToken: true}});
    // 获取商品浏览足迹
    let goodsBrowsing = (params, config = {}) => http.post('/Api/User/Goodsbrowsing', params, {custom: {methodName: 'user.goodsbrowsing', needToken: true}});
    // 商品收藏 关注/取消
    let goodsCollection = (params, config = {}) => http.post('/Api/User/GoodsCollectionCreateOrDelete', params, {custom: {methodName: 'user.goodscollection', needToken: true}});
    // 获取商品收藏关注列表
    let goodsCollectionList = (params, config = {}) => http.post('/Api/User/GoodscollectionList', params, {custom: {methodName: 'user.goodscollectionlist', needToken: true}});

    // 获取店铺支付方式列表
    let paymentList = (params, config = {}) => http.post('/Api/Payments/GetList', params, {custom: {methodName: 'payments.getlist', needToken: false}});
    // 获取支付单详情
    let paymentInfo = (params, config = {}) => http.post('/Api/Payments/GetInfo', params, {custom: {methodName: 'payments.getinfo', needToken: true}});
    // 支付接口
    let pay = (params, config = {}) => http.post('/Api/User/Pay', params, {custom: {methodName: 'user.pay', needToken: true}});
    // 订单评价接口
    let orderEvaluate = (params, config = {}) => http.post('/Api/User/OrderEvaluate', params, {custom: {methodName: 'user.orderevaluate', needToken: true}});

    // 判断是否签到（作废）
    //let isSign = (params, config = {}) => http.post('/Api/User/IsSign', params, { custom: { methodName: 'user.issign', needToken: true } });
    // 签到接口（作废）
    //let sign = (params, config = {}) => http.post('/Api/User/Sign', params, { custom: { methodName: 'user.sign', needToken: true } });

    // 签到接口
    let userCheckIn = (params, config = {}) => http.post('/Api/CheckIn/DoUserCheckIn', params, {custom: {methodName: 'user.doUserCheckIn', needToken: true}});
    //获取用户按月签到数据
    let getUserCheckByMonth = (params, config = {}) => http.post('/Api/CheckIn/GetUserCheckByMonth', params, {custom: {methodName: 'user.getUserCheckByMonth', needToken: true}});
    //获取用户总签到次数
    let getUserCheckCount = (params, config = {}) => http.post('/Api/CheckIn/GetUserCheckCount', params, {custom: {methodName: 'user.getUserCheckCount', needToken: true}});


    // 积分记录
    let pointLog = (params, config = {}) => http.post('/Api/User/UserPointLog', params, {custom: {methodName: 'user.userpointlog', needToken: true}});
    // 物流信息接口
    let logistics = (params, config = {}) => http.post('/Api/Order/LogisticsByApi', params, {custom: {methodName: 'order.logisticbyapi', needToken: true}});
    // 优惠券列表
    let couponList = (params, config = {}) => http.post('/Api/Coupon/CouponList', params, {custom: {methodName: 'coupon.couponlist', needToken: false}});
    // 优惠券详情
    let couponDetail = (params, config = {}) => http.post('/Api/Coupon/CouponDetail', params, {custom: {methodName: 'coupon.coupondetail', needToken: false}});
    // 用户领取优惠券
    let getCoupon = (params, config = {}) => http.post('/Api/Coupon/GetCoupon', params, {custom: {methodName: 'coupon.getcoupon', needToken: true}});
    // 用户已领取的优惠券列表
    let userCoupon = (params, config = {}) => http.post('/Api/Coupon/UserCoupon', params, {custom: {methodName: 'coupon.usercoupon', needToken: true}});
    // 获取我的银行卡列表
    let getBankCardList = (params, config = {}) => http.post('/Api/User/GetMyBankcardsList', params, {custom: {methodName: 'user.getbankcardlist', needToken: true}});
    // 获取默认的银行卡
    let getDefaultBankCard = (params, config = {}) => http.post('/Api/User/GetDefaultBankCard', params, {custom: {methodName: 'user.getdefaultbankcard', needToken: true}});
    // 添加银行卡
    let addBankCard = (params, config = {}) => http.post('/Api/User/AddBankCards', params, {custom: {methodName: 'user.addbankcard', needToken: true}});
    // 删除银行卡
    let removeBankCard = (params, config = {}) => http.post('/Api/User/Removebankcard', params, {custom: {methodName: 'user.removebankcard', needToken: true}});
    // 设置默认银行卡
    let setDefaultBankCard = (params, config = {}) => http.post('/Api/User/SetDefaultBankCard', params, {custom: {methodName: 'user.setdefaultbankcard', needToken: true}});
    // 获取银行卡信息
    let getBankCardInfo = (params, config = {}) => http.post('/Api/User/GetBankCardInfo', params, {custom: {methodName: 'user.getbankcardinfo', needToken: true}});
    // 获取银行卡组织信息
    let getBankCardOrganization = (params, config = {}) => http.post('/Api/User/GetBankCardsOrganization', params, {custom: {methodName: 'user.getbankcardorganization', needToken: true}});
    // 用户修改密码
    let editPwd = (params, config = {}) => http.post('/Api/User/EditPwd', params, {custom: {methodName: 'user.editpwd', needToken: true}});
    // 用户找回密码
    let forgotPwd = (params, config = {}) => http.post('/Api/Common/InterFaceTest', params, {custom: {methodName: 'user.forgotpwd', needToken: true}});
    // 获取用户余额明细
    let getBalanceList = (params, config = {}) => http.post('/Api/User/UserBalance', params, {custom: {methodName: 'user.balancelist', needToken: true}});
    // 用户推荐列表
    let recommendUserList = (params, config = {}) => http.post('/Api/User/Recommend', params, {custom: {methodName: 'user.recommend', needToken: true}});
    // 邀请码
    let shareCode = (params, config = {}) => http.post('/Api/User/ShareCode', params, {custom: {methodName: 'user.sharecode', needToken: true}});
    // 用户提现
    let userToCash = (params, config = {}) => http.post('/Api/User/Cash', params, {custom: {methodName: 'user.cash', needToken: true}});
    // 用户提现列表
    let cashList = (params, config = {}) => http.post('/Api/User/CashList', params, {custom: {methodName: 'user.cashlist', needToken: true}});
    // 判断用户下单可以使用多少积分
    let usablePoint = (params, config = {}) => http.post('/Api/User/GetUserPoint', params, {custom: {methodName: 'user.getuserpoint', needToken: true}});

    // 门店列表
    let storeList = (params, config = {}) => http.post('/Api/Store/GetStoreList', params, {custom: {methodName: 'store.getstorelist', needToken: false}});
    //根据用户序列获取门店数据
    let getStoreByUserId = (params, config = {}) => http.post('/Api/Store/GetStoreByUserId', params, {custom: {methodName: 'store.getStoreByUserId', needToken: true}});
     //获取单个用户能管理的门店列表
     let getStoreListForUser = (params, config = {}) => http.post('/Api/Store/GetStoreListForUser', params, { custom: { methodName: 'store.GetStoreListForUser', needToken: true } });
    //根据序列获取门店数据
    let getStoreById = (params, config = {}) => http.post('/Api/Store/GetStoreById', params, {custom: {methodName: 'store.getStoreByUserId', needToken: false}});
    //获取门店订单列表
    let getOrderPageByMerchant = (params, config = {}) => http.post('/Api/Store/GetOrderPageByMerchant', params, {custom: {methodName: 'store.getOrderPageByMerchant', needToken: true}});
    //获取门店订单列表
    let getOrderPageByMerchantSearch = (params, config = {}) => http.post('/Api/Store/GetOrderPageByMerchantSearch', params, {custom: {methodName: 'store.getOrderPageByMerchantSearch', needToken: true}});

    // 判断是否开启门店自提
    let switchStore = (params, config = {}) => http.post('/Api/Store/GetStoreSwitch', params, {custom: {methodName: 'store.getstoreswitch', needToken: false}});
    // 获取默认的门店
    let defaultStore = (params, config = {}) => http.post('/Api/Store/GetDefaultStore', params, {custom: {methodName: 'store.getdefaultstore', needToken: false}});
    // 判断是否开启积分
    let isPoint = (params, config = {}) => http.post('/Api/User/isPoint', params, {custom: {methodName: 'user.ispoint', needToken: false}});
    // 用户输入code领取优惠券
    let couponKey = (params, config = {}) => http.post('/Api/Coupon/GetCouponKey', params, {custom: {methodName: 'coupon.getcouponkey', needToken: true}});
    // 判断是否是店员
    let isStoreUser = (params, config = {}) => http.post('/Api/Store/IsClerk', params, {custom: {methodName: 'store.isclerk', needToken: true}});
    // 获取店铺提货单列表
    let storeLadingList = (params, config = {}) => http.post('/Api/Store/StoreLadingList', params, {custom: {methodName: 'store.storeladinglist', needToken: true}});
    // 获取提货单详情
    let ladingInfo = (params, config = {}) => http.post('/Api/Store/LadingInfo', params, {custom: {methodName: 'store.ladinginfo', needToken: true}});
    // 店铺提单核销操作
    let ladingExec = (params, config = {}) => http.post('/Api/Store/Lading', params, {custom: {methodName: 'store.lading', needToken: true}});
    // 提货单删除
    let ladingDel = (params, config = {}) => http.post('/Api/Store/LadingDelete', params, {custom: {methodName: 'store.ladingdel', needToken: true}});



    // 获取活动列表
    let activityList = (params, config = {}) => http.post('/Api/Group/GetList', params, {custom: {methodName: 'group.getlist', needToken: false}});
    // 获取活动详情
    let activityDetail = (params, config = {}) => http.post('/Api/Group/GetGoodsDetial', params, {custom: {methodName: 'group.getgoodsdetial', needToken: false}});
    //小程序解析code
    let onLogin = (params, config = {}) => http.post('/Api/User/OnLogin', params, {custom: {methodName: 'user.wxappOnlogin', needToken: false}});
    //小程序登录第二步（核验数据并获取用户详细资料）
    let loginByDecodeEncryptedData = (params, config = {}) => http.post('/Api/User/DecodeEncryptedData', params, {custom: {methodName: 'user.wxapploginByDecodeEncryptedData', needToken: false}});
    //小程序同步用户数据
    let syncWeChatInfo = (params, config = {}) => http.post('/Api/User/SyncWeChatInfo', params, {custom: {methodName: 'user.SyncWeChatInfo', needToken: true}});
    //小程序手机授权（拉取手机号码）
    let loginByGetPhoneNumber = (params, config = {}) => http.post('/Api/User/DecryptPhoneNumber', params, {custom: {methodName: 'user.wxapploginByGetPhoneNumber', needToken: false}});
    //取下级地址列表
    let getAreaList = (params, config = {}) => http.post('/Api/Common/GetAreas', params, {custom: {methodName: 'user.getarealist', needToken: false}});
    //取搜索页推荐关键字
    let getRecommendKeys = (params, config = {}) => http.post('/Api/Common/GetRecommendKeys', params, {custom: {methodName: 'common.getrecommendkeys', needToken: false}});
    // 获取我的邀请信息
    let myInvite = (params, config = {}) => http.post('/Api/User/MyInvite', params, {custom: {methodName: 'user.myinvite', needToken: true}});
    // 设置我的上级邀请人
    let setMyInvite = (params, config = {}) => http.post('/Api/User/SetMyInvite', params, {custom: {methodName: 'user.SetMyInvite', needToken: true}});
    // 获取我的上级邀请人
    let getMyInvite = (params, config = {}) => http.post('/Api/User/GetMyInvite', params, {custom: {methodName: 'user.GetMyInvite', needToken: true}});
    //获取我的下级发展用户数量
    let getMyChildSum = (params, config = {}) => http.post('/Api/User/GetMyChildSum', params, {custom: {methodName: 'user.GetMyChildSum', needToken: true}});
    // 获取秒杀团购
    let getGroup = (params, config = {}) => http.post('/Api/Group/GetList', params, {custom: {methodName: 'group.getlist', needToken: false}});
    // 获取秒杀团购详情
    let groupInfo = (params, config = {}) => http.post('/Api/Group/GetGoodsDetial', params, {custom: {methodName: 'group.getgoodsdetial', needToken: false}});
    // 自定义页面
    let getPageConfig = (params, config = {}) => http.post('/Api/Page/GetPageConfig', params, {custom: {methodName: 'pages.getpageconfig', needToken: false}});


    // 获取分销商进度状态
    let getDistributionInfo = (params, config = {}) => http.post('/Api/Distribution/Info', params, {custom: {methodName: 'distribution_center-api-info', needToken: true}});
    // 申请分销商
    let applyDistribution = (params, config = {}) => http.post('/Api/Distribution/ApplyDistribution', params, {custom: {methodName: 'distribution_center-api-applydistribution', needToken: true}});
    // 店铺设置
    let setDistributionStore = (params, config = {}) => http.post('/Api/Distribution/SetStore', params, {custom: {methodName: 'distribution_center-api-setstore', needToken: true}});
    //获取店铺信息
    let getDistributionStoreInfo = (params, config = {}) => http.post('/Api/Distribution/GetStoreInfo', params, {custom: {methodName: 'distribution_center-api-getstoreinfo', needToken: false}});
    //我的分销订单
    let getDistributionOrder = (params, config = {}) => http.post('/Api/Distribution/MyOrder', params, {custom: {methodName: 'distribution_center-api-myorder', needToken: true}});
    //分销团队统计
    let getDistributionTeamSum = (params, config = {}) => http.post('/Api/Distribution/GetTeamSum', params, {custom: {methodName: 'distribution.getTeamSum', needToken: true}});
    //分销订单统计
    let getDistributionOrderSum = (params, config = {}) => http.post('/Api/Distribution/GetOrderSum', params, {custom: {methodName: 'distribution.getOrderSum', needToken: true}});
    //获取分销商排行
    let getDistributionRanking = (params, config = {}) => http.post('/Api/Distribution/getDistributionRanking', params, {custom: {methodName: 'distribution.getDistributionRanking', needToken: true}});

    // 获取代理商进度状态
    let getAgentInfo = (params, config = {}) => http.post('/Api/Agent/Info', params, {custom: {methodName: 'agent_center-api-info', needToken: true}});
    // 申请代理商
    let applyAgent = (params, config = {}) => http.post('/Api/Agent/ApplyAgent', params, {custom: {methodName: 'agent_center-api-applyAgent', needToken: true}});
    // 店铺设置
    let setAgentStore = (params, config = {}) => http.post('/Api/Agent/SetStore', params, {custom: {methodName: 'agent_center-api-setstore', needToken: true}});
    //获取店铺信息
    let getAgentStoreInfo = (params, config = {}) => http.post('/Api/Agent/GetStoreInfo', params, {custom: {methodName: 'agent_center-api-getstoreinfo', needToken: false}});
    //我的代理订单
    let getAgentOrder = (params, config = {}) => http.post('/Api/Agent/MyOrder', params, {custom: {methodName: 'agent_center-api-myorder', needToken: true}});
    //代理团队统计
    let getAgentTeamSum = (params, config = {}) => http.post('/Api/Agent/GetTeamSum', params, {custom: {methodName: 'agent.getTeamSum', needToken: true}});
    //代理订单统计
    let getAgentOrderSum = (params, config = {}) => http.post('/Api/Agent/GetOrderSum', params, {custom: {methodName: 'agent.getOrderSum', needToken: true}});
    //获取代理池商品数据
    let getAgentGoodsPageList = (params, config = {}) => http.post('/Api/Agent/GetGoodsPageList', params, {custom: {methodName: 'agent.getGoodsPageList', needToken: false}});
    //获取代理商排行
    let getAgentRanking = (params, config = {}) => http.post('/Api/Agent/GetAgentRanking', params, {custom: {methodName: 'agent.getAgentRanking', needToken: true}});


    // 拼团列表
    let pinTuanList = (params, config = {}) => http.post('/Api/PinTuan/GetList', params, {custom: {methodName: 'pinTuan.list', needToken: false}});
    // 拼团商品详情
    let pinTuanGoodsInfo = (params, config = {}) => http.post('/Api/PinTuan/GetGoodsInfo', params, {custom: {methodName: 'pinTuan.goodsinfo', needToken: false}});
    // 拼团货品详情
    let pinTuanProductInfo = (params, config = {}) => http.post('/Api/PinTuan/GetProductInfo', params, {custom: {methodName: 'pinTuan.productinfo', needToken: false}});
    //获取我的发票列表
    let myInvoiceList = (params, config = {}) => http.post('/Api/User/UserInvoiceList', params, {custom: {methodName: 'user.myinvoicelist', needToken: true}});
    //获取支付信息
    let paymentsCheckpay = (params, config = {}) => http.post('/Api/Payments/CheckPay', params, {custom: {methodName: 'payments.checkpay', needToken: true}});
    //忘记密码
    let userForgetpwd = (params, config = {}) => http.post('/Api/User/ForgetPwd', params, {custom: {methodName: 'user.forgetpwd', needToken: false}});
    // 根据订单id取拼团信息，用在订单详情页
    let getOrderPinTuanTeamInfo = (params, config = {}) => http.post('/Api/PinTuan/GetPinTuanTeam', params, {custom: {methodName: 'pinTuan.pinTuanteam', needToken: true}});
    //发票模糊查询
    let getTaxInfo = (params, config = {}) => http.post('/Api/Order/GetTaxCode', params, {custom: {methodName: 'order.gettaxcode', needToken: true}});


    // 获取店铺设置
    let getSetting = (params, config = {}) => http.post('/Api/User/GetSetting', params, {custom: {methodName: 'user.getsetting', needToken: false}});
    // 获取商户配置信息
    let getSellerSetting = (params, config = {}) => http.post('/Api/User/GetSellerSetting', params, {custom: {methodName: 'user.getsellersetting', needToken: false}});
    // 获取小程序二维码
    let getInviteQRCode = (params, config = {}) => http.post('/Api/Store/GetInviteQrCode', params, {custom: {methodName: 'store.getinviteqrcode', needToken: false}});
    // 生成海报
    let createPoster = (params, config = {}) => http.post('/Api/User/GetPoster', params, {custom: {methodName: 'user.getposter', needToken: false}});
    //============================================================//万能表单
    let getFormDetial = (params, config = {}) => http.post('/Api/Form/GetFormDetial', params, {custom: {methodName: 'form.getformdetial', needToken: false}});
    //============================================================//提交表单
    let addSubmitForm = (params, config = {}) => http.post('/Api/Form/AddSubmit', params, {custom: {methodName: 'form.addsubmit', needToken: false}});

    //================================================================////抽奖规则
    let lotteryConfig = (params, config = {}) => http.post('/Api/Lottery/GetLotteryConfig', params, {custom: {methodName: 'lottery-api-getLotteryConfig', needToken: true}});
    //================================================================////抽奖操作
    let lottery = (params, config = {}) => http.post('/Api/Lottery/Lottery', params, {custom: {methodName: 'lottery-api-lottery', needToken: true}});
    //================================================================////获取我的抽奖记录
    let myLottery = (params, config = {}) => http.post('/Api/Lottery/LotteryLog', params, {custom: {methodName: 'lottery-api-lotteryLog', needToken: true}});
    //================================================================////生成分享URL
    let createShareUrl = (params, config = {}) => http.post('/Api/User/ShareUrl', params, {custom: {methodName: 'user.shareurl', needToken: false}});
    //================================================================////微信图文消息
    let messageDetail = (params, config = {}) => http.post('/Api/Articles/GetWeChatMessage', params, {custom: {methodName: 'articles.getweixinmessage', needToken: false}});
    //================================================================////获取APP版本
    let getAppVersion = (params, config = {}) => http.post('/Api/Common/GetAppVersions', params, {custom: {methodName: 'Common.checkVersion', needToken: false}});

    //============================================================//公众号授权获取openid（第三方登录）
    let getOpenId = (params, config = {}) => http.post('/Api/User/OfficialLogin', params, {custom: {methodName: 'user.officiallogin', needToken: false}});
    //============================================================// 获取授权登录方式（获取第三方登录列表）
    let getTrustLogin = (params, config = {}) => http.post('/Api/User/GetTrustLogin', params, {custom: {methodName: 'user.gettrustlogin', needToken: false}});
    //============================================================// APP信任登录(app第三方登录方式)
    let appTrustLogin = (params, config = {}) => http.post('/Api/User/UniAppLogin', params, {custom: {methodName: 'user.uniapplogin', needToken: false}});
    //================================================================//// 绑定授权登录
    let trustBind = (params, config = {}) => http.post('/Api/User/TrustBind', params, {custom: {methodName: 'user.trustbind', needToken: false}});
    //================================================================//支付宝小程序解析code（第三方支付宝登录方式）
    let alilogin1 = (params, config = {}) => http.post('/Api/User/AlipayAppLogin1', params, {custom: {methodName: 'user.alipayapplogin1', needToken: false}});
    //================================================================////头条小程序登录
    let ttlogin = (params, config = {}) => http.post('/Api/User/TtLogin', params, {custom: {methodName: 'user.ttlogin', needToken: false}});
    //获取订阅模板
    let getSubscriptionTmplIds = (params, config = {}) => http.post('/Api/WeChatAppletsMessage/Tmpl', params, {custom: {methodName: 'wechat_applets_message-api-tmpl', needToken: true}});
    //订阅状态修改
    let setSubscriptionStatus = (params, config = {}) => http.post('/Api/WeChatAppletsMessage/SetTip', params, {custom: {methodName: 'wechat_applets_message-api-settip', needToken: true}});
    //用户关闭订阅提醒
    let subscriptionCloseTip = (params, config = {}) => http.post('/Api/WeChatAppletsMessage/CloseTip', params, {custom: {methodName: 'wechat_applets_message-api-closetip', needToken: true}});
    //判断用户是否需要显示订阅提醒
    let subscriptionIsTip = (params, config = {}) => http.post('/Api/WeChatAppletsMessage/IsTip', params, {custom: {methodName: 'wechat_applets_message-api-istip', needToken: true}});
    //统一分享
    let share = (params, config = {}) => http.post('/Api/User/Share', params, {custom: {methodName: 'user.share', needToken: false}});
    //统一分享解码
    let deshare = (params, config = {}) => http.post('/Api/User/deshare', params, {custom: {methodName: 'user.deshare', needToken: false}});

    //获取服务列表
    let getServicelist = (params, config = {}) => http.post('/Api/Service/GetPageList', params, {custom: {methodName: 'service.getpagelist', needToken: false}});
    //获取服务详情
    let getServiceDetail = (params, config = {}) => http.post('/Api/Service/GetDetails', params, {custom: {methodName: 'service.getdetail', needToken: false}});
    //生成服务购买订单
    let addServiceOrder = (params, config = {}) => http.post('/Api/Service/AddServiceOrder', params, {custom: {methodName: 'service.addServiceOrder', needToken: true}});

    //获取个人服务订单列表
    let getUserServicesPageList = (params, config = {}) => http.post('/Api/User/GetServicesPageList', params, {custom: {methodName: 'user.getServicesPageList', needToken: true}});
    //获取服务卡下用户券列表
    let getServicesTickets = (params, config = {}) => http.post('/Api/User/GetServicesTickets', params, {custom: {methodName: 'user.getServicesTickets', needToken: true}});


    //门店核销的服务券列表
    let getverificationPageList = (params, config = {}) => http.post('/Api/Service/VerificationPageList', params, {custom: {methodName: 'service.verificationPageList', needToken: true}});
    //删除核销券
    let serviceLogDelete = (params, config = {}) => http.post('/Api/Service/LogDelete', params, {custom: {methodName: 'service.logDelete', needToken: true}});
    // 获取服务券详情准备核销
    let getServiceVerificationTicketInfo = (params, config = {}) => http.post('/Api/Service/GetTicketInfo', params, {custom: {methodName: 'service.getTicketInfo', needToken: true}});
    //核销服务券
    let serviceVerificationTicket = (params, config = {}) => http.post('/Api/Service/VerificationTicket', params, {custom: {methodName: 'service.verificationTicket', needToken: true}});



    //获取接龙列表
    let getSolitairePageList = (params, config = {}) => http.post('/Api/Solitaire/GetList', params, {custom: {methodName: 'solitaire.getList', needToken: false}});
    let getSolitaireDetail = (params, config = {}) => http.post('/Api/Solitaire/GetDetail', params, {custom: {methodName: 'solitaire.getDetail', needToken: false}});



    // 用户注册（废弃，改为自动获取app数据及使用短信验证码登录）建议直接使用smsLogin接口
    //let reg  = (params, config = {}) => http.post('/Api/Common/InterFaceTest', params, { custom: { methodName: 'user.reg', needToken: true } });
    // 用户登录(废弃，改为短信验证码登录)
    //let login  = (params, config = {}) => http.post('/Api/Common/InterFaceTest', params, { custom: { methodName: 'user.login', needToken: true } });
    // 获取用户信息(废弃)
    // let trustLogin  = (params, config = {}) => http.post('/Api/Common/InterFaceTest', params, { custom: { methodName: 'user.trustcallback', needToken: true } });
    // 订单售后状态(废弃方法，建议直接用order.details接口)
    // let afterSalesStatus  = (params, config = {}) => http.post('/Api/Common/InterFaceTest', params, { custom: { methodName: 'order.aftersalesstatus', needToken: true } });
    // 我的积分（弃用）
    //let myPoint  = (params, config = {}) => http.post('/Api/Common/InterFaceTest', params, { custom: { methodName: 'user.mypoint', needToken: true } });

    // 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下


