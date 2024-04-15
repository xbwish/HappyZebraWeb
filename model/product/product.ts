import { Brand } from "../brand";
import { Base } from '../base'
import { SKU } from "./sku";
import { ReturnBaseResult } from "../return-base-result";

export interface ProductData extends ReturnBaseResult {
    brands?: Array<Brand>;
    className?: string;
    list?: Array<Product>;
    order: string;
    where: string;
}

export interface Product extends Base {
    name?: string;
    bn?: string;
    brand?: Brand;
    brief?: string;
    brandId?: string;
    image?: string;
    images?: string;
    imageArr?: Array<string>;
    newSpec?: string;
    spesDesc?: string;
    stock?: number;
    unit?: string;
    video?: string;
    viewCount?: number;
    weight?: number;
    price?: number;
    mktprice?: number;
    skuList?: Sku;
    amount?: number;
    barcode?: string;
    product?: SKU,
    goodsId?:number;
    freezeStock?: number;
    totalStock?: number;
    [key: string]: any;
}


export interface Sku extends Base {
    sku_list: Array<SkuItem>
    [key: string]: any
}

export interface SkuItem {
    _id?: string;
    goods_id?: string;
    goods_name?: string;
    image?: string;
    price?: number;
    sku_name_arr?: Array<string>
    stock?: number;
    [key: string]: any;
}

export interface GoodDescription {
    commonQuestion: Array<any>;
    delivery: Array<any>;
    service: Array<any>;
    [key: string]: any;
}

export interface PromotionList {
    conditions: Array<string>;
    effectiveDays: number;
    effectiveHours: number;
    endTime: string;
    id: number;
    isAutoReceive: boolean;
    isDel: boolean;
    isEnable: boolean;
    isExclusive: boolean;
    maxGoodsNums: number;
    maxNums: number;
    maxRecevieNums: number;
    name: string;
    parameters: any;
    results: Array<string>;
    sort: number;
    startTime: string;
    type: number;
    [key: string]: any;
}