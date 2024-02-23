export interface IUser {
    id: number,
    name: string,
    image: string,
}

export interface IFeed {
    posts: IPost[]
}

export interface ICategory {
    id: number,
    name: string,
    image: string, // assuming URL to image is provided
}

export interface IPost {
    id: number,
    category: ICategory,
    caption: string,
    like_count: number,
    media_type: IMediaType,
    media_name: string, 
    location: string,    
}

export enum IMediaType {
    IMAGE=0,
    CAROUSEL_ALBUM=1,
    VIDEO=2,
}

export enum Page {
    HOME=0,
    USER=1,
}