import { Base } from '../base';

export interface Address extends Base {
    address?: string;
    areaId?: number;
    areaName?: string;
    isDefault?: boolean;
    latitude?: string;
    longitude?: string;
    mobile?: string;
    name?: string;
    street?: string;
    updateTime?: string;
    userId?: number;
}