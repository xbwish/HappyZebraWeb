import { Base } from "../base";

export interface CommentData {
    commentsCount?: number;
    totalPages?: number;
    list?: Array<Comment>
}

export interface Comment extends Base {
    addon?: string;
    avatarImage?: string;
    commentId?: number;
    contentBody?: string;
    createTime?: string;
    goodName?: string;
    goodsId?: number;
    images?: string;
    imagesArr?: string;
    isDisplay: boolean;
    mobile?: string;
    nickName?: string;
    orderId?: string;
    score?: number;
    sellerContent?: string;
    userId?: number;
    commentImage?: Array<string>;
}