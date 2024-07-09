import { ElLoading, LoadingOptions } from "element-plus";
import type { Options } from "@/types/store"

const defaultOptions: Options = {
  lock: true,
  text: "正在加载...",
  background: "rgba(0, 0, 0, 0.1)",
};

/**
 * 传入一个方法 fn，在它执行周期内，加上全屏 loading
 * 如果：
 * 1. fn 是同步方法，结束后隐藏 loading
 * 2. 如果是异步方法，resolve 后隐藏 loading
 * 3. 报错后隐藏 loading 并抛出错误
 * @param fn 函数
 * @param options loading 配置项
 * @returns 一个新的函数，去执行它吧
 */
export const useLoading = <T extends (...args: any[]) => any>(
  fn: T,
  options: Options = {}
): ReturnType<T> | Promise<ReturnType<T>> => {
  let loading: any;

  const showLoading = (options: Options) => {
    loading = ElLoading.service(options as LoadingOptions);
  };

  const hideLoading = () => {
    if (loading) {
      loading.close();
    }
  };

  const _options: Options = { ...defaultOptions, ...options };

  const newFn:any = (
    ...args: Parameters<T>
  ): ReturnType<T> | Promise<ReturnType<T>> => {
    try {
      showLoading(_options);
      const result = fn(...args);
      const isPromise = result instanceof Promise;
      if (!isPromise) {
        hideLoading();
        return result as ReturnType<T>;
      }
      return result
        .then((res) => {
          hideLoading();
          return res;
        })
        .catch((err) => {
          hideLoading();
          throw err;
        }) as Promise<ReturnType<T>>; 
    } catch (err) {
      hideLoading();
      throw err;
    }
  };

  return newFn;
};

/** 用法
 * 
 * import { getBirds, getCars } from './mock';
   import { useLoading } from './hooks/loading';
   import { ElMessage } from 'element-plus';
   const queryBirds = async () => {
   const birds = await useLoading(getBirds)()
   ElMessage.success(birds.map(t => t.name).join())}
 * 
 * */ 
