export interface MetaInfo {
    title: string;
    keywords: string;
    description: string;
  }
  export interface UserPromotionState {
    is_screen_full: boolean;
    dark_and_light:boolean;
    userInfo: Record<string, any>;
    isCollapse: boolean;
    affcode: string;
    tuiguangURL: string;
    kilyimall: string;
    kilyimallURL: string;
    kilyimallLoginURL:string;
    kilyimallURLforwarding: string;
    imageUrl: string;
    metaInfo: MetaInfo;
    m_kilyimallLoginURL:string, 
    m_kilyimallURL:string,
    m_kilyimall:string,
  }
  
  export type UserPromotionStateKeys = keyof UserPromotionState;
  export interface Options {
    lock?: boolean;
    text?: string;
    background?: string;
  }