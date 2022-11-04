export const validateEmail = (rule: any, value: string, callback: any) => {
    var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (!reg.test(value)) {
        callback(new Error("请输入正确格式的邮箱！"));
    } else {
        callback();
    }
};
export const validateMobile = (rule: any, value: string, callback: any) => {
    if (!value) {
        callback();
    }
    var reg = /^[1][0-9]{10}$/;
    if (!reg.test(value)) {
        callback(new Error("请输正确手机号！"));
    } else {
        callback();
    }
};