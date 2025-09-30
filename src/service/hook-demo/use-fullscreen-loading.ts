import i18n from "@/i18n";
const { t } = i18n.global;

/** 模拟接口响应数据 */
const SUCCESS_RESPONSE_DATA = {
  code: 0,
  data: {
    list: [] as number[]
  },
  message: t("Get_Success")
};

/** 模拟请求接口成功 */
export function getSuccessApi(list: number[]) {
  return new Promise<typeof SUCCESS_RESPONSE_DATA>((resolve) => {
    setTimeout(() => {
      resolve({ ...SUCCESS_RESPONSE_DATA, data: { list } });
    }, 1000);
  });
}

/** 模拟请求接口失败 */
export function getErrorApi() {
  return new Promise((_resolve, reject) => {
    setTimeout(() => {
      reject(new Error(t("error_occurs")));
    }, 1000);
  });
}
