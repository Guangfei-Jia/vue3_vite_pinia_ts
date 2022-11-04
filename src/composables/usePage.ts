import { Ref, ref, reactive } from "vue";
interface pageDataObject {
  pageSize: number,
  pageNum: number,
  pageSizes: Array<number>,
  total: number,
}
interface pageObject {
  currentPage: Ref<number>,
  pageData: pageDataObject,
  changeSize: (value: number, callback: () => void) => void,
  changePage: (value: number, callback: () => void) => void,
  changeTotal: (value: number) => void
}
/**
 * 分页控制函数
 * @returns { Number } currentPage 当前页码
 * @returns { Object } pageData 分页数据
 * @returns { Function } changeSize 修改页面展示数量
 * @returns { Function } changePage 修改页码
 * @returns { Function } changeTotal 修改总数
 */
const pageContral = (): pageObject => {
  const currentPage = ref(1);
  const pageData = reactive({
    pageSize: 10,
    pageNum: 1,
    pageSizes: [2, 10, 20, 50, 100],
    total: 0,
  });
  /**
   * @name: 修改每页显示条数
   * @param {number} value 每页条数值
   * @param {function} callback 回调函数，一般传入列表刷新函数
   * @return {void}
   */
  const changeSize = (value: number, callback: () => void): void => {
    pageData.pageSize = value;
    callback();
  };
  /**
   * @name: 修改页码
   * @param {number} value 页码值
   * @param {function} callback  回调函数，一般传入列表刷新函数
   * @return {void}
   */
  const changePage = (value: number, callback: () => void): void => {
    currentPage.value = value;
    pageData.pageNum = value;
    callback();
  }
  /**
   * @name: 修改列表数据总条数
   * @param {number} value 列表总数据条数
   * @return {void}
   */
  const changeTotal = (value: number): void => {
    pageData.total = value;
  }
  return {
    currentPage,
    pageData,
    changeSize,
    changePage,
    changeTotal
  }
}
export default pageContral;