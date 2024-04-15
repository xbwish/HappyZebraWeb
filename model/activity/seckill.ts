import { Product } from '@/model/product';

export interface ISeckillDetail extends Product{   
    groupId?: number;
    isMarketable?: boolean;
    [key: string]: any;
}