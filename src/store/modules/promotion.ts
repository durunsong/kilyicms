import { defineStore } from 'pinia';
import type { MetaInfo, UserPromotionState, UserPromotionStateKeys } from '@/types/store';

export const userPomotionStore = defineStore('promotion', {
  state: (): UserPromotionState => {
    return {
      userInfo: {},
      isCollapse: false,
      metaInfo: {
        title: '',
        keywords: '',
        description: '',
      },
      affcode: '',
      hagobuyLoginURL: 'https://www.hagobuy.com/login',
      tuiguangURL: 'https://cfstatic.hagoby.com/tg',
      hagobuy: 'https://www.hagobuy.com',
      hagobuyURL: 'https://www.hagobuy.com/register',
      hagobuyURLforwarding: 'https://www.hagobuy.com/forwarding',
      imageUrl: 'https://cfstatic.hagoby.com/www/pic',
      m_hagobuyLoginURL: 'https://www.hagobuy.com/login',
      m_hagobuyURL: 'https://www.hagobuy.com/register',
      m_hagobuy: 'https://www.hagobuy.com',
    };
  },
  getters: {
    dynamicURLKeys: (state) => (property: UserPromotionStateKeys): string => {
      if (state.affcode !== '') {
        return `${state[property]}?${state.affcode}`;
      } else {
        return (state[property] as string) || '';
      }
    },
    dynamicAffcode(state): string {
      if (state.affcode !== '') {
        return `&${state.affcode}`;
      } else {
        return '';
      }
    },
  },
  actions: {
    setUserInfo(data: any) {
      this.userInfo = data;
    },
    // 展开折叠
    statusChange() {
      this.isCollapse = !this.isCollapse;
    },
    // 动态设置meta信息的方法
    setMetaInfo(metaInfo: MetaInfo): void {
      this.metaInfo = metaInfo;
    },
    // setState
    setState(payload: { [key: string]: any }) {
      for (const key in payload) {
        if (Object.prototype.hasOwnProperty.call(payload, key)) {
          (this as any)[key] = payload[key];
        }
      }
    },
  },
  persist: {
    // 使用默认配置进行持久化
    storage: localStorage,
    paths: ['userInfo', 'isCollapse']
  },
});
