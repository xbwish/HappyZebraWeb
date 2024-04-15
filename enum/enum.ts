
	/** 多端划分 */
	const enum coreShopSystemCategory {
		admin = 0,
		api = 1,
		pc = 2,
		h5 = 3,
	}
	/** 缓存优先级:低、普通、高、永不移除 */
	const enum cacheItemPriority {
		low = 0,
		normal = 1,
		high = 2,
		neverRemove = 3,
	}
	/** 用户登录方式 */
	const enum loginType {
		common = 1,
		sms = 2,
		weChatPhoneNumber = 3,
	}
	/** 订单编号类型大全 */
	const enum serialNumberType {
		订单编号 = 1,
		支付单编号 = 2,
		商品编号 = 3,
		货品编号 = 4,
		售后单编号 = 5,
		退款单编号 = 6,
		退货单编号 = 7,
		发货单编号 = 8,
		提货单号 = 9,
		服务订单编号 = 10,
		服务券兑换码 = 11,
	}
	/** 来源订单来源[对应CoreCmsOrder表source字段] */
	const enum source {
		pC页面 = 1,
		h5页面 = 2,
		微信小程序 = 3,
		支付宝小程序 = 4,
		aPP = 5,
		头条 = 6,
	}
	/** 用户登录日志类型 */
	const enum loginRecordType {
		登录成功 = 0,
		登录失败 = 1,
		退出登录 = 2,
		刷新Token = 0,
	}
	/** 附件存储支持类型 */
	const enum filesStorageOptionsType {
		localStorage = 0,
		aliYunOSS = 1,
		qCloudOSS = 2,
		qiNiuKoDo = 3,
	}
	/** 本地存储位置 */
	const enum filesStorageLocation {
		admin = 0,
		aPI = 1,
	}
	/** 性别[1男2女3未知]对应CoreCmsUserWX表的gender类型 */
	const enum userSexTypes {
		男 = 1,
		女 = 2,
		未知 = 3,
	}
	/** 用户状态 */
	const enum userStatus {
		正常 = 1,
		停用 = 2,
	}
	/** 第三方账号来源[对应CoreCmsUserWX表的type类型] */
	const enum userAccountTypes {
		微信公众号 = 1,
		微信小程序 = 2,
		支付宝小程序 = 3,
		微信APP快捷登陆 = 4,
		qQ在APP中快捷登陆 = 5,
		头条系小程序 = 6,
	}
	/** 用户余额变动来源类型【对应CoreCmsUserBalance.type字段】 */
	const enum userBalanceSourceTypes {
		/** 用户消费 */
		pay = 1,
		/** 用户退款 */
		refund = 2,
		/** 充值 */
		recharge = 3,
		/** 提现 */
		tocash = 4,
		/** 三级分销佣金 */
		distribution = 5,
		/** 平台调整 */
		admin = 6,
		/** 奖励 */
		prize = 7,
		/** 服务项目 */
		service = 8,
		/** 代理商提成 */
		agent = 9,
		/** 日历签到 */
		checkIn = 10,
	}
	/** 用户积分变动来源类型对应CoreCmsUserPointLog表type字段 */
	const enum userPointSourceTypes {
		/** 签到 */
		pointTypeSign = 1,
		/** 购物返积分 */
		pointTypeRebate = 2,
		/** 购物使用积分 */
		pointTypeDiscount = 3,
		/** 后台编辑 */
		pointTypeAdminEdit = 4,
		/** 奖励积分 */
		pointTypePrize = 5,
		/** 积分兑换 */
		pointTypeExchange = 6,
		/** 售后退款返还 */
		pointRefundReturn = 7,
		/** 取消订单返还 */
		pointCanCelOrder = 8,
		/** 邀请用户注册 */
		pointTypeInviterUser = 9,
	}
	/** 用户签到积分类型 */
	const enum userPointSignTypes {
		/** 签到固定积分 */
		fixedPoint = 1,
		/** 签到随机积分 */
		randomPoint = 2,
	}
	/** 用户日志状态[对应CoreCmsUserLog表的state字段] */
	const enum userLogTypes {
		登录 = 1,
		退出 = 2,
		注册 = 3,
	}
	/** 用户提现状态[对应CoreCmsUserTocash表的status字段] */
	const enum userTocashStatus {
		待审核 = 1,
		提现成功 = 2,
		提现失败 = 3,
		提现异常 = 4,
	}
	/** 用户提现状态[对应CoreCmsUserTocash表的type字段] */
	const enum userTocashType {
		银行线下转账 = 0,
		微信付款到零钱 = 1,
		微信付款到银行卡 = 2,
	}


	
	/** 开票类型 */
	const enum orderTaxCategory {
		/** 订单 */
		order = 1,
	}
	/** 订单开票类型[对应CoreCmsOrder表taxType字段] */
	const enum orderTaxType {
		/** 不开发票 */
		no = 1,
		/** 个人发票 */
		personal = 2,
		/** 公司发票 */
		company = 3,
	}
	/** 订单开票状态 */
	const enum orderTaxStatus {
		/** 未开票 */
		no = 1,
		/** 已开票 */
		yes = 2,
	}
	/** 订单用户性别[1男2女3未知] */
	const enum orderUserSex {
		男 = 1,
		女 = 2,
		未知 = 3,
	}
	/** 订单评价状态 */
	const enum orderIsComment {
		/** 没有评价 */
		noComment = 1,
		/** 已经评价 */
		alreadyComment = 2,
	}
	
	/** 发货单状态 */
	const enum orderLogisticsState {
		在途中 = 0,
		已揽收 = 1,
		疑难 = 2,
		已签收 = 3,
	}
	/** 售后类型 */
	const enum aftersaleTypes {
		退款 = 1,
		退款退货 = 2,
	}
	/** 库存改变机制类型 */
	const enum orderChangeStockType {
		/** 下单 */
		order = 1,
		/** 发货 */
		send = 2,
		/** 退款 */
		refund = 3,
		/** 退货 */
		return = 4,
		/** 取消订单 */
		cancel = 5,
		/** 完成订单 */
		complete = 6,
	}
	/** 后台订单列表类型(用于html切换) */
	const enum orderCountType {
		/** 全部 */
		all = 0,
		/** 待支付 */
		payment = 1,
		/** 待发货 */
		delivered = 2,
		/** 待收货 */
		receive = 3,
		/** 已评价 */
		evaluated = 4,
		/** 待评价 */
		noevaluat = 5,
		/** 已完成 */
		complete = 6,
		/** 已取消 */
		cancel = 7,
		/** 已删除 */
		delete = 999,
	}
	/** 订单打印类别 */
	const enum orderPrintType {
		/** 购物清单 */
		shopping = 1,
		/** 配货单 */
		distribution = 2,
		/** 联合打印 */
		union = 3,
		/** 联合打印快递单 */
		express = 4,
	}
	
	/** 购物车数量设置方式(1是直接增加/2是赋值) */
	const enum cartSetNumType {
		/** 增加 */
		increase = 1,
		/** 设置 */
		set = 2,
	}
	/** 订单日志状态[对应CoreCmsOrderLog表Type字段] */
	const enum orderLogTypes {
		/** 订单创建 */
		lOG_TYPE_CREATE = 1,
		/** 订单支付 */
		lOG_TYPE_PAY = 2,
		/** 订单发货 */
		lOG_TYPE_SHIP = 3,
		/** 订单签收 */
		lOG_TYPE_SIGN = 4,
		/** 订单评价 */
		lOG_TYPE_EVALUATION = 5,
		/** 订单完成 */
		lOG_TYPE_COMPLETE = 6,
		/** 订单取消 */
		lOG_TYPE_CANCEL = 7,
		/** 订单编辑 */
		lOG_TYPE_EDIT = 8,
		/** 订单自动签收 */
		lOG_TYPE_AUTO_SIGN = 9,
		/** 订单自动评价 */
		lOG_TYPE_AUTO_EVALUATION = 10,
		/** 订单自动完成 */
		lOG_TYPE_AUTO_COMPLETE = 11,
		/** 订单自动取消 */
		lOG_TYPE_AUTO_CANCEL = 12,
	}
	/** 优惠券状态 */
	const enum couponStatus {
		启用 = 1,
		禁用 = 2,
	}
	/** 领取状态 */
	const enum couponIsUsedStatus {
		未使用 = 1,
		已使用 = 2,
	}
	/** 前端领取优惠券状态 */
	const enum couponIsUsedStatusText {
		noUsed = 1,
		yesUsed = 2,
		invalid = 3,
	}
	/** 支付方式 */
	const enum paymentsIsOnline {
		/** 线上支付 */
		paymentOnline = 1,
		/** 线下支付 */
		paymentOffline = 2,
	}
	/** 支付启用状态 */
	const enum paymentsStatus {
		启用 = 1,
		禁用 = 2,
	}
	
	/** 付款单类型 【对应CoreCmsBillPayments.type】 */
	const enum billPaymentsType {
		/** 充值 */
		recharge = 201,
		/** 表单订单 */
		formOrder = 302,
		/** 表单付款码 */
		formPay = 301,
		/** 服务订单 */
		serviceOrder = 501,
		/** 普通 */
		common = 1,
		/** 拼团 */
		pinTuan = 2,
		/** 团购 */
		group = 3,
		/** 秒杀 */
		seckill = 4,
		/** 砍价 */
		bargain = 6,
		/** 赠品 */
		giveaway = 7,
		/** 接龙 */
		solitaire = 8,
		/** 微信交易组件 */
		transactionComponent = 10,
	}
	/** 付款单状态【对应CoreCmsBillPayments.status字段】 */
	const enum billPaymentsStatus {
		/** 待支付 */
		noPay = 1,
		/** 已支付 */
		payed = 2,
		/** 其他 */
		other = 3,
	}
	/** 售后单类型 */
	const enum billAftersalesType {
		售后中 = 1,
		售后通过 = 2,
		售后拒绝 = 3,
	}
	
	/** 是否收货 */
	const enum billAftersalesIsReceive {
		/** 未收到货 */
		refund = 1,
		/** 已收到货 */
		reship = 2,
	}
	
	/** 退款单类型 */
	const enum billRefundType {
		/** 订单 */
		order = 1,
		/** 充值 */
		recharge = 2,
		/** 表单订单 */
		formOrder = 3,
		/** 表单付款码 */
		formPay = 4,
		/** 服务订单 */
		serviceOrder = 5,
	}
	
	/** 提货单状态 */
	const enum billLadingStatus {
		/** 未提货 */
		order = 1,
		/** 已提货 */
		recharge = 2,
	}
	/** 发货单状态 */
	const enum billDeliveryStatus {
		/** 准备发货 */
		ready = 1,
		/** 已发货 */
		already = 2,
		/** 已确认 */
		confirm = 3,
		/** 其它 */
		other = 4,
	}
	/** 拼团记录状态表[对应CoreCmsPinTuanRecord表status字段] */
	const enum pinTuanRecordStatus {
		/** 拼团中 */
		inProgress = 1,
		/** 开团成功 */
		succeed = 2,
		/** 开团失败 */
		defeated = 3,
	}
	/** 拼团规则是否在时间范围内的状态 */
	const enum pinTuanRuleStatus {
		/** 已开始 */
		begin = 1,
		/** 未开始 */
		notBegun = 2,
		/** 已过期 */
		haveExpired = 3,
	}
	/** 自定义表单类型 */
	const enum formTypes {
		订单 = 1,
		付款码 = 2,
		留言 = 3,
		反馈 = 4,
		登记 = 5,
		调研 = 6,
	}
	/** 表单头部类型 */
	const enum formHeadTypes {
		图片 = 1,
		轮播 = 2,
		视频 = 3,
	}
	/** 表单字段类型 */
	const enum formFieldTypes {
		/** 单选 */
		radio = 1,
		/** 复选 */
		checbox = 2,
		/** 文本框 */
		text = 3,
		/** 文本域 */
		textarea = 4,
		/** 日期 */
		date = 5,
		/** 时间 */
		time = 6,
		/** 商品 */
		goods = 7,
		/** 金额 */
		money = 8,
		/** 密码 */
		password = 9,
		/** 省市区 */
		area = 10,
		/** 图片 */
		image = 11,
		/** 坐标 */
		coordinate = 12,
	}
	/** 表单验证类型 */
	const enum formValidationTypes {
		字符串 = 1,
		数字 = 2,
		整数 = 3,
		价格 = 4,
		邮箱 = 5,
		手机号 = 6,
		多数据 = 7,
	}
	/** 商品参数表类型 */
	const enum goodsParamTypes {
		/** 文本框 */
		text = 1,
		/** 单选 */
		radio = 2,
		/** 复选框 */
		checkbox = 3,
	}
	/** 商品分销方式 */
	const enum productsDistributionType {
		/** 全局设置 */
		global = 1,
		/** 单独设置 */
		detail = 2,
	}
	/** 配送区域类型 */
	const enum shipAreaType {
		/** 全部地区 */
		all = 1,
		/** 部分地区 */
		part = 2,
	}
	/** 配送状态正常还是停用 */
	const enum shipStatus {
		/** 正常 */
		yes = 1,
		/** 停用 */
		no = 2,
	}
	/** 配送方式重量 */
	const enum shipUnit {
		/** 500克 */
		k500 = 500,
		/** 1公斤 */
		k1000 = 1000,
		/** 1.2公斤 */
		k1200 = 1200,
		/** 2公斤 */
		k2000 = 2000,
		/** 5公斤 */
		k5000 = 5000,
		/** 10公斤 */
		k10000 = 10000,
		/** 20公斤 */
		k20000 = 20000,
		/** 50公斤 */
		k50000 = 50000,
	}
	/** 模板列表类型[对应CoreCmsTemplate表type字段] */
	const enum templateTypes {
		小程序 = 1,
	}
	/** 短信消息分类 */
	const enum smsMessageTypes {
		/** 账户注册 */
		reg = 1,
		/** 账户登录 */
		login = 2,
		/** 验证验证码 */
		veri = 3,
	}
	/** 平台消息分类 */
	const enum platformMessageTypes {
		/** 下单成功时 */
		createOrder = 4,
		/** 订单支付成功时 */
		orderPayed = 5,
		/** 订单催付提醒 */
		remindOrderPay = 6,
		/** 订单发货通知 */
		deliveryNotice = 7,
		/** 售后确认通过 */
		afterSalesPass = 8,
		/** 用户退款成功通知 */
		refundSuccess = 9,
		/** 订单付款成功平台通知 */
		sellerOrderNotice = 10,
		/** 通用类型 */
		common = 11,
	}
	/** 商家消息类型 */
	const enum shopMessageTypes {
		/** 有新的售后订单了 */
		aftersalesAdd = 1,
	}
	/** 授权方认证类型[关联CoreCmsWeixinAuthor表verifyTypeInfo字段] */
	const enum weiChatAuthorVerifyTypes {
		未认证,
		微信认证 = 0,
	}
	/** 微信消息类型[关联CoreCmsWeixinMessage表type字段] */
	const enum weiChatMessageTypes {
		文本消息 = 1,
		图片消息 = 2,
		图文消息 = 3,
	}
	/** 微信支付交易类型 */
	const enum weiChatPayTradeType {
		jSAPI = 1,
		jSAPI_OFFICIAL = 2,
		nATIVE = 3,
		aPP = 4,
		mWEB = 5,
	}
	/** 价格类型 */
	const enum priceType {
		/** 销售价 */
		price = 1,
		/** 市场价 */
		mktprice = 2,
		/** 成本价 */
		costprice = 3,
	}
	/** 广告表类型【关联CoreCmsAdvertisement.type字段】 */
	const enum advertPositionType {
		/** 网址URL */
		url = 1,
		/** 商品 */
		good = 2,
		/** 文章 */
		article = 3,
		/** 文章分类 */
		articleType = 4,
		/** 智能表单 */
		intelligenceForm = 5,
	}
	/** 广告模板编码 */
	const enum advertTemplateCode {
		/** 首页幻灯片广告位 */
		tplSlider = 1,
		/** 首页广告位1 */
		tplIndexBanner1 = 2,
		/** 首页广告位2 */
		tplIndexBanner2 = 3,
		/** 首页广告位3 */
		tplIndexBanner3 = 4,
		/** 分类页广告位 */
		tplClassBanner1 = 5,
	}
	/** 促销形式类型【对应CoreCmsPromotion.type字段】 */
	const enum promotionType {
		/** 促销 */
		promotion = 1,
		/** 优惠券 */
		coupon = 2,
		/** 团购 */
		group = 3,
		/** 秒杀 */
		seckill = 4,
	}
	/** 团购秒杀活动状态 */
	const enum groupSeckillStatus {
		/** 即将开始 */
		upcoming = 0,
		/** 进行中 */
		inProgress = 1,
		/** 已结束 */
		finished = 2,
	}
	
	
	
	/** 区域深度 */
	const enum areaDepth {
		/** 省 */
		province = 1,
		/** 市 */
		city = 2,
		/** 县 */
		county = 3,
		/** 根节点 */
		provinceParentId = 0,
	}
	/** 评价类型 */
	const enum commentTypes {
		好评 = 1,
		中评 = 2,
		差评,
	}
	/** 用户银行卡类型[对应CoreCmsUserBankCard的cardType字段] */
	const enum bankType {
		/** 储蓄卡 */
		bankTypeDc = 1,
		/** 信用卡 */
		bankTypeCc = 2,
	}
	const enum bankDefault {
		/** 默认 */
		defaultYes = 1,
		/** 不默认 */
		defaultNo = 2,
	}
	/** 银行名称及编码列表 */
	const enum bankList {
		sRCB,
		bGB,
		sHRCB,
		bJBANK,
		wHCCB,
		bOZK,
		kORLABANK,
		sPABANK,
		sDEB,
		hURCB,
		wRCB,
		bOCY,
		cZBANK,
		hDBANK,
		bOC,
		bOD,
		cCB,
		zYCBANK,
		sXCB,
		gZRCU,
		zJKCCB,
		bOJZ,
		bOP,
		hKB,
		sPDB,
		nXRCU,
		nYNB,
		gRCB,
		bOSZ,
		hZCB,
		hSBK,
		hBC,
		jXBANK,
		hRXJB,
		bODD,
		aYCB,
		eGBANK,
		cDB,
		tCRCB,
		nJCB,
		zZBANK,
		dYCB,
		yBCCB,
		sCRCU,
		kLB,
		lSBANK,
		yDRCB,
		cCQTGB,
		fDB,
		jSRCU,
		jNBANK,
		cMB,
		jINCHB,
		fXCB,
		wHRCB,
		hBYCBANK,
		tZCB,
		tACCB,
		xCYH,
		cEB,
		nXBANK,
		hSBANK,
		jJBANK,
		nHQS,
		mTBANK,
		lANGFB,
		aSCB,
		kSRB,
		yXCCB,
		dLB,
		dRCBCL,
		gCB,
		nBBANK,
		bOYK,
		sXRCCU,
		gLBANK,
		bOQH,
		cDRCB,
		qDCCB,
		hKBEA,
		hBHSBANK,
		wZCB,
		tRCB,
		qLBANK,
		gDRCC,
		zJTLCB,
		gZB,
		gYCB,
		cQBANK,
		dAQINGB,
		cGNB,
		sCCB,
		cSRCB,
		sHBANK,
		jLBANK,
		cZRCB,
		bANKWF,
		zRCBANK,
		fJHXBC,
		zJNX,
		lZYH,
		jSB,
		bOHAIB,
		cZCB,
		yQCCB,
		sJBANK,
		xABANK,
		bSB,
		jSBANK,
		fSCB,
		hNRCU,
		cOMM,
		xTB,
		cITIC,
		hXBANK,
		hNRCC,
		dYCCB,
		oRBANK,
		bJRCB,
		xYBANK,
		zGCCB,
		cDCB,
		hANABANK,
		cMBC,
		lYBANK,
		gDB,
		zBCB,
		cBKF,
		h3CB,
		cIB,
		cRCBANK,
		sZSBK,
		dZBANK,
		sRBANK,
		lSCCB,
		jXRCU,
		iCBC,
		jZBANK,
		hZCCB,
		nHB,
		xXBANK,
		jRCB,
		yNRCC,
		aBC,
		gXRCU,
		pSBC,
		bZMD,
		aRCU,
		gSRCU,
		lYCB,
		jLRCU,
		uRMQCCB,
		xLBANK,
		cSCB,
		jHBANK,
		bHB,
		nBYZ,
		lSBC,
		bOCD,
		sDRCU,
		nCB,
		tCCB,
		wJRCB,
		cBBQS,
		hBRCU,
	}
	/** 分销商申请审核状态 */
	const enum distributionVerifyStatus {
		/** 审核通过 */
		verifyYes = 1,
		/** 等待审核 */
		verifyWait = 2,
		/** 审核拒绝 */
		verifyRefuse = 3,
	}
	/** 分销商订单记录表是否结算状态 */
	const enum distributionOrderSettlementStatus {
		/** 已结算 */
		settlementYes = 1,
		/** 未结算 */
		settlementNo = 2,
		/** 已失效 */
		settlementCancel = 3,
	}
	/** 分销升级相关编码类型 */
	const enum distributionConditions {
		/** 购买所有商品 */
		gOODS_ALL = 1,
		/** 购买指定商品 */
		gOODS_IDS = 2,
		/** 个人消费总额 */
		uSER_ORDERS = 3,
		/** 个人订单数量 */
		uSER_ORDERSNUM = 4,
		/** 团队消费总额 */
		gROUP_ORDERS = 5,
		/** 直推几个指定用户等级 */
		uSER_GRADE = 6,
	}
	/** 分销升级条件类型 */
	const enum distributionConditionsCode {
		/** 个人消费总额 */
		uSER_ORDERS = 3,
		/** 个人订单数量 */
		uSER_ORDERSNUM = 4,
		/** 所有商品满足条件 */
		gOODS_ALL = 1,
		/** 购买指定商品 */
		gOODS_IDS = 2,
	}
	/** 分销升级结果类型 */
	const enum distributionCommissiontype {
		/** 百分比 */
		cOMMISSION_TYPE_PRE = 1,
		/** 固定 */
		cOMMISSION_TYPE_FIXED = 2,
	}
	/** 成为分销商条件 */
	const enum distributionConditionType {
		/** 无条件（需审核） */
		unconditional = 1,
		/** 申请（需审核） */
		apply = 2,
		/** 无需审核 */
		noReview = 3,
	}
	/** 快递100api接口返回状态码说明 */
	const enum kuaiDi100ApiResultStatus {
		/** 查询成功 */
		status200,
		/** 提交的数据不完整，或者贵公司没授权 */
		status400,
		/** 表示查询失败，或没有POST提交 */
		status500,
		/** 服务器错误，快递100服务器压力过大或需要升级，暂停服务 */
		status501,
		/** 服务器繁忙 */
		status502,
		/** 验证签名失败 */
		status503,
	}
	/** 快递100api接口运单签收状态服务说明 */
	const enum kuaiDi100ApiResultState {
		在途 = 0,
		揽收 = 1,
		疑难 = 2,
		签收 = 3,
		退签 = 4,
		派件 = 5,
		退回 = 6,
		转投 = 7,
		待清关 = 10,
		清关中 = 11,
		已清关 = 12,
		清关异常 = 13,
		收件人拒签 = 14,
	}
	const enum weChatMsgTemplateType {
		/** 下单通知 */
		order,
		/** 催付通知 */
		cancel,
		/** 支付通知 */
		pay,
		/** 发货通知 */
		ship,
		/** 售后通知 */
		aftersale,
		/** 退款通知 */
		refund,
	}
	const enum thirdPartyEquipment {
		/** 易联云打印机 */
		yiLianYun,
	}
	const enum hangFireQueuesConfig {
		/** 默认 */
		default = 1,
		/** 接口 */
		apis = 2,
		/** 网站 */
		web = 3,
		/** 循环时间 */
		recurring = 4,
	}
	/** 服务项目核销有效期类型 */
	const enum servicesValidityType {
		/** 不限，就是不限制，永久可以使用。 */
		unlimited = 1,
		/** 限时间段  ，就是买了之后，某个时间段才能用。 */
		timeFrame = 2,
	}
	/** 服务项目状态 */
	const enum servicesStatus {
		/** 上架 */
		shelve = 0,
		/** 下架 */
		unShelve = 1,
		/** 售罄 */
		soldOut = 2,
	}
	/** 服务券状态 */
	const enum servicesTicketStatus {
		/** 正常 */
		正常 = 0,
		/** 过期 */
		过期 = 1,
		/** 作废 */
		作废 = 2,
		/** 已核销 */
		已核销 = 3,
	}
	/** 服务订单状态 */
	const enum servicesOrderStatus {
		/** 正常 */
		正常 = 1,
		/** 作废 */
		作废 = 2,
		/** 过期 */
		过期 = 3,
		/** 用罄 */
		用罄 = 4,
	}
	/** 服务是否在时间范围内的状态 */
	const enum servicesOpenStatus {
		/** 已开始 */
		begin = 1,
		/** 未开始 */
		notBegun = 2,
		/** 已过期 */
		haveExpired = 3,
	}
	/** 是否默认 */
	const enum pagesType {
		/** 是 */
		mobile = 1,
		/** 否 */
		否 = 2,
	}
	/** 布局样式编码 */
	const enum pagesLayout {
		/** 移动端 */
		mobile = 1,
		/** PC端 */
		pC = 2,
	}
	const enum shopServiceNoteType {
		/** 常见问题 */
		commonQuestion = 1,
		/** 服务 */
		service = 2,
		/** 发货 */
		delivery = 3,
	}
	/** 库存操作单类型 */
	const enum stockType {
		/** 入库 */
		in = 1,
		/** 出库 */
		out = 2,
		/** 库存盘点 */
		checkGoods = 3,
		/** 发货 */
		deliverGoods = 4,
		/** 退货 */
		returnedGoods = 5,
	}
	/** 代理商申请审核状态 */
	const enum agentVerifyStatus {
		/** 审核通过 */
		verifyYes = 1,
		/** 等待审核 */
		verifyWait = 2,
		/** 审核拒绝 */
		verifyRefuse = 3,
	}
	/** 代理商订单记录表是否结算状态 */
	const enum agentOrderSettlementStatus {
		/** 已结算 */
		settlementYes = 1,
		/** 未结算 */
		settlementNo = 2,
		/** 已失效 */
		settlementCancel = 3,
	}
	/** 代理默认价格加成方式 */
	const enum agentDefaultSalesPriceType {
		/** 百分比 */
		commissionTypePre = 1,
		/** 固定 */
		commissionTypeFixed = 2,
	}
	const enum solitaireStatus {
		/** 开启 */
		open = 1,
		/** 关闭 */
		close = 2,
	}
	const enum accessTokenEnum {
		/** 微信小程序 */
		wxOpenAccessToken = 1,
		/** 微信公众号 */
		weiXinAccessToken = 2,
		/** 易联云打印机 */
		yiLianYunAccessToken = 3,
	}
	/** 售后订单状态 */
	const enum shopAftersaleAddStatus {
		未受理 = 0,
		用户取消 = 1,
		商家受理中 = 2,
		商家逾期未处理 = 3,
		商家拒绝退款 = 4,
		商家拒绝退货退款 = 5,
		待买家退货 = 6,
		退货退款关闭 = 7,
		待商家收货 = 8,
		商家退款中 = 11,
		商家逾期未退款 = 12,
		退款完成 = 13,
		退货退款完成 = 14,
		换货完成 = 15,
		待商家发货 = 16,
		待用户确认收货 = 17,
		商家拒绝换货 = 18,
		商家已收到货 = 19,
	}
	/** 售后类型 */
	const enum shopAftersaleAddType {
		退款 = 0,
		退款退货 = 1,
		换货 = 2,
	}
	/** 品牌审核-认证审核类型 */
	const enum registerType {
		国内品牌申请R标 = 1,
		国内品牌申请TM标 = 2,
		海外品牌申请R标 = 3,
		海外品牌申请TM标 = 4,
	}
	/** 品牌审核-商标分类 */
	const enum trademarkType {
		第1类 = 1,
		第2类 = 2,
		第3类 = 3,
		第4类 = 4,
		第5类 = 5,
		第6类 = 6,
		第7类 = 7,
		第8类 = 8,
		第9类 = 9,
		第10类 = 10,
		第11类 = 11,
		第12类 = 12,
		第13类 = 13,
		第14类 = 14,
		第15类 = 15,
		第16类 = 16,
		第17类 = 17,
		第18类 = 18,
		第19类 = 19,
		第20类 = 20,
		第21类 = 21,
		第22类 = 22,
		第23类 = 23,
		第24类 = 24,
		第25类 = 25,
		第26类 = 26,
		第27类 = 27,
		第28类 = 28,
		第29类 = 29,
		第30类 = 30,
		第31类 = 31,
		第32类 = 32,
		第33类 = 33,
		第34类 = 34,
		第35类 = 35,
		第36类 = 36,
		第37类 = 37,
		第38类 = 38,
		第39类 = 39,
		第40类 = 40,
		第41类 = 41,
		第42类 = 42,
		第43类 = 43,
		第44类 = 44,
		第45类 = 45,
	}
	/** 品牌审核-品牌经营类型 */
	const enum brandManagementType {
		自有品牌 = 1,
		代理品牌 = 2,
		无品牌 = 3,
	}
	/** 品牌审核-商品产地是否进口 */
	const enum commodityOriginType {
		是 = 1,
		否 = 2,
	}


	/** 下单前置检查-商户订单类型（原则上只能是1，应为官方文档说以后只有1，所以我们也只是用1） */
	const enum payMethodType {
		微信支付 = 0,
		货到付款 = 1,
		商家会员储蓄卡 = 2,
	}
	/** 代理分销通道判定 */
	const enum commissionChannel {
		仅代理 = 1,
		仅分销 = 2,
		先代理后分销 = 3,
		先分销后代理 = 4,
	}
	/** 每天签到赠送-签到赠送类型 */
	const enum checkInCommonType {
		积分 = 1,
		余额 = 2,
	}
	/** 清除连续签到次数 */
	const enum continuousCheckInPeriodType {
		不限 = 0,
		每周末 = 1,
		每月末 = 2,
	}
	/** 系统常用枚举类 */
	interface globalEnumVars {
	}

