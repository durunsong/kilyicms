export interface MetaInfo {
    title: string;
    keywords: string;
    description: string;
  }
  export interface UserPromotionState {
    userInfo: Record<string, any>;
    isCollapse: boolean;
    affcode: string;
    tuiguangURL: string;
    hagobuy: string;
    hagobuyURL: string;
    hagobuyLoginURL:string;
    hagobuyURLforwarding: string;
    imageUrl: string;
    metaInfo: MetaInfo;
    m_hagobuyLoginURL:string, 
    m_hagobuyURL:string,
    m_hagobuy:string,
  }
  
  export type UserPromotionStateKeys = keyof UserPromotionState;
  export interface Options {
    lock?: boolean;
    text?: string;
    background?: string;
  }