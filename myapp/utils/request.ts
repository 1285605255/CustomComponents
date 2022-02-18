
/**
 * 作为整个系统的网络请求库
 */
 import { extend } from 'umi-request';
 import { notification } from 'antd';
 
 /**
  * 网络连接超时时间(ms)
  */
 const NET_CONNECTION_TIME_OUT = 120 * 100;
 
 const codeMessage: any = {
   '404': '您访问的资源不存在',
   '500': '服务器发生错误，请检查服务器',
 };
 /**
  * 异常处理程序
  */
 const errorHandler = (error: { response: Response }): Response => {
   const { response } = error;
 
   if (response && response.status) {
     // 1、确定错误信息
     const errorText = codeMessage[response.status] || response.statusText;
     const { status, url } = response;
     // 2、提示错误信息
     // notification.error({
     //   message: `请求错误 ${status}: ${url}`,
     //   description: errorText,
     // });
     // 3、抛出错误异常
     throw errorText;
 
   } else if (!response) {
     // notification.error({
     //   description: '您的网络发生异常，无法连接服务器',
     //   message: '网络异常',
     // });
   }
   return response;
 };
 
 
 const _commonNetRequestConfigs: any = {
   errorHandler, // 默认错误处理
   credentials: 'include', // 默认请求是否带上cookie
   timeout: NET_CONNECTION_TIME_OUT, // 请求超时
   charset: 'utf8', //编码
   crossDomain: true,
   getResponse: false,
   /** 'useCache' 是否使用缓存，当值为 true 时，GET 请求在 ttl 毫秒内将被缓存，缓存策略唯一 key 为 url + params 组合 **/
   useCache: false, // default
 }
 
 /**
  * 配置request请求时的默认参数
  */
 const request = extend({
   ..._commonNetRequestConfigs,
 });
 
 /**
  * 请求前拦截 request
  */
 request.interceptors.request.use((url: string, options?: object) => {
   const headers = {
     Authorization: 'Basic dGVzdDAxOjEyMzQ1Ng==',
     Source: 'screen',
   };
   return {
     url: url,
     options: { ...options, headers: headers }
   }
 })
 /**
  * response 拦截
  */
 request.interceptors.response.use(async (response) => {
   return response;
 })
 
 //普通 get 请求
 export const GETRequest = (url: string, params?: object) => {
   return request.get(url, { params });
 }
 
 /**
  * 普通 post 请求
  */
 export const POSTRequest = (url: string, data?: object) => {
   return request.post(url, { data });
 }
 