// 加密 解密
import CryptoJS from 'crypto-js';
import { JSEncrypt } from 'jsencrypt'
import Pako from 'pako';

const PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCvjWQmr99yagRwudIUyrYsIw0zOk2NuG83MdNKkq2sHDnv6UckXQLWVY+CP6knrf6VL8OIK14A3t2lj/7nFXSIn1Al88AU0afLL/iBYuwXvxnd9q15PY64E1uATewx/dNiZNNR05HblmT+jDcOTab6dvKkKboKhxRzVPtcQTeJAwIDAQAB-----END PUBLIC KEY-----`;
const RSA_ENCRYPT = new JSEncrypt();
RSA_ENCRYPT.setPublicKey(PUBLIC_KEY);

export function initKeyIv() {
  let key = CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Hex);
  let iv = CryptoJS.lib.WordArray.random(8).toString(CryptoJS.enc.Hex);
  return {key, iv};
}

// rsa加密密码
export function rsaEncrypt(data) {
  const str = RSA_ENCRYPT.encrypt(data);
  return str
}

/**
 * AES加密
 * 参考服务端顺序：
 * 1.压缩
 * 2.加密
 * 3.转base64
 */
export function encrypt(plainData, keyStr, ivStr) {
    // 对象转为 json
    const plainJsonStr = JSON.stringify(plainData)
    // 1.压缩，得到Uint8Array
    const plainU8Arr = Pako.deflateRaw(plainJsonStr, {level: 1})
    // 2-1.加密，先转WordArray
    const plainWordArr = CryptoJS.lib.WordArray.create(plainU8Arr)
    // 2-2.加密，得到CipherParams
    const cipherParams = CryptoJS.AES.encrypt(
        plainWordArr,
        CryptoJS.enc.Utf8.parse(keyStr),
        {
            iv: CryptoJS.enc.Utf8.parse(ivStr),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        }
    )
    // 3.转base64，用于网络传输
    const cipherBase64 = cipherParams.toString()
    // RSA 加密 key、iv
    const rsaKey = rsaEncrypt(keyStr);
    const resIv = rsaEncrypt(ivStr);
    return {data: cipherBase64, key: rsaKey, iv: resIv};
}

/**
 * AES解密
 * 参考服务端顺序：
 * 1.解base64
 * 2.解密
 * 3.解压
 */
export function decrypt(cipherBase64, keyStr, ivStr) {
    // 1.免解base64
    // 2.解密，得到明文WordArray
    const plainWordArray = CryptoJS.AES.decrypt(
        cipherBase64,
        CryptoJS.enc.Utf8.parse(keyStr),
        {
            iv: CryptoJS.enc.Utf8.parse(ivStr),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        }
    )
    // 3-1.解压，先转Uint8Array
    const words = plainWordArray.words
    const wordsLen = words.length
    const plainU8Arr = new Uint8Array(wordsLen << 2)
    let offset = 0
    for (let i = 0; i < wordsLen; i++) {
        let word = words[i]
        plainU8Arr[offset++] = word >> 24
        plainU8Arr[offset++] = (word >> 16) & 0xff
        plainU8Arr[offset++] = (word >> 8) & 0xff
        plainU8Arr[offset++] = word & 0xff
    }
    // 3-2.解压，输出为字符串
    const plainStr = Pako.inflateRaw(plainU8Arr, {to: 'string'})
    // json 转为对象
    return JSON.parse(plainStr)
}

// AES服务端加密：
// 1、压缩
// 2、加密
// 3、base64编码
// 加密压缩转码
export function encrypt1(data, key, iv) {
  // 压缩转为JSON的数据，再创建buffer对象转码base64
  data = Buffer.from(Pako.deflateRaw(JSON.stringify(data))).toString('base64');
  // AES加密BASE64转码（以UTF8格式转化key、iv成wordArray）
  data = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(key), {
    iv: CryptoJS.enc.Utf8.parse(iv),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  }).toString();
  // RSA加密key、iv
  const RSAKEY = rsaEncrypt(key);
  const RSAIV = rsaEncrypt(iv);
  return { data: data, key: RSAKEY, iv: RSAIV };
}

// 解码解密解压
export function decrypt1(data, key, iv) {
  // 解码解密、解key和iv、转成wordArray
  data = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(key), { iv: CryptoJS.enc.Utf8.parse(iv), mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7, }).toString(CryptoJS.enc.Latin1);
  // 解压
  data = Pako.inflateRaw(Buffer.from(data, 'base64'), { to: 'string' });
  data = JSON.parse(data)
  return data;
}
