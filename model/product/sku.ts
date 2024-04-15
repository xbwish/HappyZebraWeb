import { Product } from "./product";

export interface SKU extends Product {
    freezeStock?: number;
    goodsId?: number;
    isDefalut?: boolean;
    points?: number;
    totalStock?: number;
}