import { post } from '@/utils/http';
import { Notice } from '@/model/member';
import { ArticleList,Article } from '@/model/article';

const GetNoticeList: string = 'api/Notice/NoticeList';
const noticeInfo: string = 'api/Notice/NoticeInfo';
const articleList: string = 'api/Article/GetArticleList';
const articleInfo: string = 'api/Article/GetArticleDetail';
const messageDetail: string = 'api/Articles/GetWeChatMessage';

/** 获取公告列表 */
export const queryNoticeList = (params: any) => post<Array<Notice>>(GetNoticeList, params);

/** 获取公告详情 */
export const queryNoticeInfo= (params: any) => post<Notice>(noticeInfo, params);

/** 获取文章列表 */
export const queryArticleList= (params: any) => post<ArticleList>(articleList, params);

/** 获取文章详情 */
export const queryArticleInfo= (params: any) => post<Article>(articleInfo, params);

/** 获取图文消息 */
export const queryMessageDetail= (params: any) => post<any>(messageDetail, params);
