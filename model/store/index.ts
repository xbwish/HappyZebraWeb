import { Base } from '../base';

export interface Store extends Base {
    address?: string;
    allAddress?: string;
    areaId?: number;
    coordinate?: string;
    createTime?: string;
    distance?: number;
    distanceStr?: string;
    isDefault?: boolean;
    latitude?: string;
    linkMan?: string;
    logoImage?: string;
    longitude?: string;
    mobile?: string;
    storeName?: string;
    updateTime?: string;
}