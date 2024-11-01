const SYSTEM_NAME = "kilyicms";

/** 缓存数据时用到的 Key */
class CACHE_KEY {
  static readonly TOKEN = `${SYSTEM_NAME}_token`;
  static readonly CONFIG_LAYOUT = `${SYSTEM_NAME}_config_layout`;
  static readonly SIDEBAR_STATUS = `${SYSTEM_NAME}_sidebar_status`;
  static readonly ACTIVE_THEME_NAME = `${SYSTEM_NAME}_active_theme_name`;
  static readonly VISITED_VIEWS = `${SYSTEM_NAME}_visited_views`;
  static readonly CACHED_VIEWS = `${SYSTEM_NAME}_cached_views`;
  static readonly LOCAL_LANG = `${SYSTEM_NAME}_localLang`;
  static readonly USER_INFO = `${SYSTEM_NAME}_userInfo`;
  static readonly REFRESH_TOKEN = `${SYSTEM_NAME}_refreshToken`;
  static readonly TOKEN_ROLE = `${SYSTEM_NAME}_token_role`;
  static readonly IS_LOGIN_KEY = `${SYSTEM_NAME}_is_login`;
  static readonly IS_SHOW_NOTICE = `${SYSTEM_NAME}_is_show_notice`;
  static readonly IS_SHOW_NOTICE_TIPS = `${SYSTEM_NAME}_is_show_notice_tips`;
  static readonly IS_SHOW_Tour_Visible = `${SYSTEM_NAME}_is_show_tour_visible`;
}

export default CACHE_KEY;
