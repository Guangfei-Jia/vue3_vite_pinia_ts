import { FormInstance } from 'element-plus';
import { ref, nextTick, Ref } from 'vue';
interface dialogObject {
  dialogWidth: Ref<string>,
  dialogControl: Ref<boolean>,
  dialogShow: (data?: any, callBack?: () => void) => void,
  dialogClose: (formEl?: FormInstance | undefined, callBack?: () => void) => void
}
/**
 * @name: 
 * @param {any} formData            form数据对象
 * @param {any} formReactive        form响应式对象
 * @return {string} dialogWidth     控制表单lab宽度
 * @return {boolean} dialogControl  控制dialog的显示隐藏
 * @return {Function} dialogShow    显示函数dialog
 * @return {Function} dialogClose   关闭doalog
 */
const useDialog = (formData: object, formReactive?: any): dialogObject => {

  const dialogWidth = ref("100px");
  const dialogControl = ref(false);
  const formMap = new Map(Object.entries(formData)); //对象转map

  /**
   * @name: 显示log，若存在表单，为表单赋值
   * @param {any} data 需要回显的对象
   * @param {function} callBack 表单处理完的回调
   * @return {void}
   */
  let dialogShow = (data?: any, callBack?: () => void): void => {
    dialogControl.value = true;
    nextTick(() => {
      if (data && formReactive) {
        for (let key of formMap.keys()) {
          formReactive[key] = data[key];
        }
      }
      callBack && callBack();
    })
  }

  /**
   * @name: 关闭log，若表单存在,重置表单
   * @param {function} callBack 关闭后回调，一般重新调用请求list数据
   * @return {void}
   */
  let dialogClose = (formEl?: FormInstance | undefined, callBack?: () => void): void => {
    dialogControl.value = false;
    formEl && formEl.resetFields();
    callBack && callBack();
  };

  return {
    dialogWidth,
    dialogControl,
    dialogShow,
    dialogClose,
  }
}
export default useDialog;