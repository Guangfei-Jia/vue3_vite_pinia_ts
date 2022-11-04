/*
 * @Descripttion: 
 * @version: 
 * @Author: fei
 * @Date: 2021-08-02 15:20:38
 * @LastEditors: fei
 * @LastEditTime: 2021-12-22 15:25:49
 */
export const PREFIX = 'gf_'; //storage自定义前缀
/**
 * 存储localStorage
 * @param {string} name storage名称--key值
 * @param content 可能是json数据，需要用stringify转换
 * @param duration Storage有效时间，单位：小时
 * @param set_time 是否设置有效时间
 * @returns {void}
 */
export const setStore = (name: string, content: object | string, set_time = false, duration = 0): void => {
  if (!name) return;
  name = PREFIX + name;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  if (set_time) {
    let date = new Date();
    if (duration > 0) {
      content += '&' + (date.getTime() + duration * 3600 * 1e3);
    } else {
      content += '&0';
    }
  }
  window.localStorage.setItem(name, content);
};

/**
 * 获取localStorage
 * @param name Storage名称
 * @returns {string} 存储数据的字符串
 */
export const getStore = (name: string): string => {
  if (!name) return "";
  name = PREFIX + name;
  //判断是否过期，过期则删除storage
  let now = Date.now(),
    val = window.localStorage.getItem(name),
    durations = 0,
    array: (string | number)[] = [];
  if (val) {
    array = val.split('&');
    durations = Number(array[1]);
  }
  if (now >= durations) {
    window.localStorage.removeItem(name);
    return "";
  }
  return array[0] as string;
};

/**
 * 删除localStorage
 * @param storageName localStorage名称
 * @returns 
 */
export const removeStore = (storageName: string): void => {
  if (!storageName) return;
  storageName = PREFIX + storageName;
  window.localStorage.removeItem(storageName);
};

/**
 * 生成cookie
 * @param name cookie名称
 * @param value cookie值
 * @param duration cookie有效时间，单位：小时
 * @return {void}
 */
export const addCookie = (name: string, value: string, duration = 0): void => {
  name = PREFIX + name;
  let n = `${name}=${encodeURIComponent(value)};path=/s`;
  if (duration > 0) {
    let date = new Date;
    date.setTime(date.getTime() + duration * 3600 * 1e3);
    n = n + ';expires=' + date.toUTCString()
  }
  document.cookie = n
};

/**
* 获取cookie
* @param name cookie名称
* @returns {string} cookie值
*/
export const getCookie = (cookieName: string): string => {
  cookieName = PREFIX + cookieName;
  let t = document.cookie;
  let a = t.split('; ');
  for (let n = 0; n < a.length; n++) {
    let r = a[n].split('=');
    if (r[0] === cookieName) {
      return decodeURIComponent(r[1]);
    };
  }
  return ""
};

/**
* 移除cookie
* @param name cookie名称
* @returns {void}
*/
export const delCookie = (cookieName: string): void => {
  cookieName = PREFIX + cookieName;
  let t = new Date();
  t.setTime(t.getTime() - 1);
  let a = getCookie(cookieName);
  if (a !== null) document.cookie = cookieName + '=' + a + '; path=/;expires=' + t.toUTCString()
};