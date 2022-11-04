/*
 * 路由跳转统一维护
 */
import { useRouter } from 'vue-router'

const baseRoutre = () => {
    const router = useRouter()
    //登陆页
    const toLogin = () => {
        router.push('/logins/login');
    }
    //首页
    const toIndex = () => {
        router.push('/');
    }
    //个人设置页
    const toSelf = () => {
        router.push('/system/self');
    }
    //注册页
    const toRegister = () => {
        router.push('/logins/register');
    };
    //修改密码页
    const toReset = () => {
        router.push('/logins/reset');
    };

    return {
        toLogin,
        toIndex,
        toRegister,
        toReset,
        toSelf,
        router
    }
}
export default baseRoutre;