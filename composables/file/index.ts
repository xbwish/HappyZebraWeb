import { UploadFileResult } from "@/model/file";
import { post } from "@/utils/http";

const uploadImageUrl: string = 'api/Common/UploadImages';

/** 上传文件 */
export const uploadImage = (file: File) => {
    let formData = new FormData();
    formData.append('file', file);
    return post<UploadFileResult>(uploadImageUrl, formData, true, null, `${uploadImageUrl}${new Date().getTime()}`);
}