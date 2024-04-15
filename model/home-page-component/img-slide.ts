export interface ImgSlide {
    height: number;
    duration: number;
    autoplay: boolean;
    loop: boolean;
    list: Array<ImgSlideItem>
}

export interface ImgSlideItem {
    image: string;
    opentype: string;
    url: string;
    title: string;
    linkType: string;
    linkValue: string;
}
