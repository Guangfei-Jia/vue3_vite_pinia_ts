import { Ref, ref } from "vue";
import usePage from "./usePage"
import { filterObj } from '@/utils/utils';
import { deleteAction, postAction } from '@/api/axios'
interface api {
    list: string,
    add: string,
    update: string,
    delete: string,
}
interface returnObject {
    currentPage: Ref<number>,
    pageData: object,
    changeSize: (value: number, callback: () => void) => void,
    changePage: (value: number, callback: () => void) => void,
    changeTotal: (value: number) => void
    list: Ref<Array<object>>,
    getList: (searchParam?: object) => Promise<void>,
    listDelete: (id: number, otherFilter?: {}) => Promise<void>
}
/**
 * 列表通用增删查改
 * @param {String} url 请求参数
 * @returns { Number } currentPage 当前页码值
 * @returns { Object } pageData 分页对象
 * @returns { Function } changeSize 改变分页大小 函数
 * @returns { Function } changePage 改变页码 函数
 * @returns { Function } changeTotal 改变总数 函数
 * @returns { Array<object> } list 列表数据
 * @returns { Function } getList 查询数据
 * @returns { Function } listDelete 删除操作
 */
const useList = (url: api): returnObject => {
    let list = ref([]);
    const { currentPage, pageData, changeSize, changePage, changeTotal } = usePage();
    /**
     * 条件查询
     * @param searchParam 查询条件对象
     * @returns {void}
     */
    const getList = async (searchParam = {}): Promise<void> => {
        //查询条件
        const params = Object.assign({}, pageData, filterObj(searchParam));
        const res = await postAction(url.list, params);
        const { count, rows } = res.data;
        list.value = rows;
        changeTotal(count);
    };
    /**
     * 单项删除
     * @param id 删除项id
     * @param otherFilter 操作完成后，刷新当前页面数据时需要的查询条件
     * @returns {void}
     */
    const listDelete = async (id: number, otherFilter?: {}): Promise<void> => {
        await deleteAction(url.delete, { id });
        getList(otherFilter);
    };

    return {
        currentPage,
        pageData,
        changeSize,
        changePage,
        changeTotal,
        list,
        getList,
        listDelete
    }
}
export default useList;