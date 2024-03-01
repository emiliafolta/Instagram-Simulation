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
    webId?: string,
    isLoggedIn?: boolean,
    name?: string,
    selectedCategories: string[],
    categoryInteractions: CategoryInteractions[],
    categoryMomentum: CategoryMomentum[],
    gender?: UserGender,
    age?: number,
    location?: string,  
}

export interface CategoryInteractions {
    categoryName: string,
    likes: number,
}

export interface CategoryMomentum {
    categoryName: string,
    momentum: number,
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

// Add weights to the interactions with different post categories displayed on the feed
export const selectionWeight = 5
export const likeWeight = 1
export const dislikeWeight = -1