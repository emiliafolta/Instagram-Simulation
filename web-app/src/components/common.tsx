export interface IUser {
    id: number,
    name: string,
    image: string,
}

export interface IFeed {
    posts: IPost[]
}

export interface IPost {
    id: number,
    category: string,
    caption: string,
    like_count: number,
    media_type: IMediaType,
    media_url: string, 
    location: string,    
}

export enum IMediaType {
    IMAGE="IMAGE",
    CAROUSEL_ALBUM="CAROUSEL_ALBUM",
    VIDEO="VIDEO",
}

export enum Page {
    HOME=0,
    USER=1,
}