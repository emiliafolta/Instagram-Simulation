import { CategoryLikes } from "../ldo/solidProfile.typings";

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
    media_type: MediaType,
    media_url: string, 
    location: string,    
}

export interface IUserProfile {
    webid?: number,
    selectedCategories?: string[],
    likedCategories?: CategoryLikes[],
    gender?: UserGender,
    age?: string,
    location?: string,  
}

export enum MediaType {
    IMAGE="IMAGE",
    CAROUSEL_ALBUM="CAROUSEL_ALBUM",
    VIDEO="VIDEO",
}

export enum UserGender {
    MALE=0,
    FEMALE=1,
    OTHER=2,
    NOT_SPECIFIED=3,
}

export enum Page {
    HOME=0,
    USER=1,
}