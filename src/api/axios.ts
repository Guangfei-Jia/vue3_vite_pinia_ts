/*
 * @Descripttion: 
 * @version: 
 * @Author: fei
 * @Date: 2021-07-28 13:59:05
 * @LastEditors: fei
 * @LastEditTime: 2021-08-03 16:31:33
 */
import axios from '../utils/request';

const httpAction = (method: any, url: string, params: {}) => {
    if (method == 'delete' || method == 'get') {
        return axios({
            url,
            method,
            params: params
        })
    }
    return axios({
        url,
        method,
        data: params,
    })
}
const getAction = (url: string, params = {}) => {
    return httpAction('get', url, params);
}
const postAction = (url: string, params: object) => {
    return httpAction('post', url, params);
}
const putAction = (url: string, params: object) => {
    return httpAction('put', url, params);
}
const deleteAction = (url: string, params: object) => {
    return httpAction('delete', url, params);
}

export {
    getAction,
    postAction,
    putAction,
    deleteAction
}
