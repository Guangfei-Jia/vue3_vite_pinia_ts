import { ref, reactive, inject } from "vue";
import { FormInstance, FormRules } from "element-plus";
/**
 * @param formData      form数据对象
 * @param formRuleData  表单验证对象
 * @return form         表单form实例
 * @return formRef      表单ref实例
 * @return formRules    表单验证实例
 * @return {function} formSubmit(formEl: FormInstance | undefined, callBack: () => void) 提交表单
 * @return {function} formReset(formEl: FormInstance | undefined, callBack: () => void) 重置表单
 */
const useForm = (formData: object, formRuleData?: object): any => {
    const form = reactive<typeof formData>(formData);                   //表单form
    const formRef = ref<FormInstance>();                                //表单ref实例
    const formRules = reactive<FormRules>(formRuleData ?? {});          //表单验证实例
    const $message = inject<any>("$message");

    /**
    * 表单提交
    * @param formEl form实例，用于表单验证
    * @param callBack 回调函数
    * @returns void
    */
    const formSubmit = (formEl: FormInstance | undefined, callBack: () => void) => {
        if (!formEl) return;
        formEl.validate(async (valid: boolean) => {
            if (!valid) {
                $message("error", "输入内容不合法，请查看页面提示信息!");
                return;
            }
            callBack && callBack();
        });
    };
    /**
     * 表单重置
     * @param formEl form实例，用于重置表单
     * @param callBack 回调函数
     * @returns void
     */
    const formReset = (formEl: FormInstance | undefined, callBack?: () => void) => {
        if (!formEl) return
        formEl.resetFields();
        callBack && callBack();
    }
    return {
        form,
        formRef,
        formRules,
        formSubmit,
        formReset
    }
}
export default useForm;