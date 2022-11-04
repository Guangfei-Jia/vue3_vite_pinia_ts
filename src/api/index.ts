/*
 * @Descripttion: 
 * @version: 
 * @Author: fei
 * @Date: 2021-07-30 15:22:18
 * @LastEditors: fei
 * @LastEditTime: 2021-12-16 14:47:35
 */
//角色api
export const roleUrl = {
    list: '/role/list',
    add: '/role/add',
    update: '/role/update',
    delete: '/role/delete',
    menuAdd: '/limit/menu/add',
    roleList: '/limit/role/list',
    roleAdd: '/limit/role/add',
}
//菜单api
export const menuUrl = {
    list: '/menu/list',
    add: '/menu/add',
    update: '/menu/update',
    delete: '/menu/delete',
    getRoleMenu: '/limit/menu/list',
}
//用户api
export const userUrl = {
    list: '/user/list',
    add: '/user/add',
    update: '/user/update',
    delete: '/user/delete',
}
//商品api
export const goodsUrl = {
    list: '/goods/list',
    add: '/goods/add',
    update: '/goods/update',
    delete: '/goods/delete',
}
//字典管理模块
export const dectionaryUrl = {
    list: '/dectionary/list',
    add: '/dectionary/add',
    update: '/dectionary/update',
    delete: '/dectionary/delete',
}
export const dectionaryChildUrl = {
    list: '/dectionaryChild/list',
    add: '/dectionaryChild/add',
    update: '/dectionaryChild/update',
    delete: '/dectionaryChild/delete',
}

export const publicUrl = {
    home: '/home',
    login: '/login',
    register: '/register',
    sendMail: '/sendMail',
    userMenuList: '/userMenuList',
    refreshAccessToken: '/refreshAccessToken',
    userDetail: '/user/detail'
}
//首页



//   //刷新token
//   export function refreshAccessToken(refreshToken) {
//     return axios.post('/refreshAccessToken', { refreshToken: refreshToken });
//   }

//   //个人设置
//   export function updateSelf(data){
//     return axios.put('/user/updateSelf', data);
//   }

//   //根据id获取当前登陆用户信息
//   export function userDetail(id){
//     return axios.get('/user/detail/' + id);
//   }