interface CustomMeta {
  title: string;
  hidden?: boolean;
  icon?: string;
}

export interface CustomRouteRecordRaw {
  path: string;
  name?: string;
  label?: string;
  meta?: CustomMeta;
  redirect?: string;
  component?: any;
  children?: CustomRouteRecordRaw[];
}
