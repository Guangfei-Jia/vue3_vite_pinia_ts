// export interface resInterface{
//     code: number,
//     message: string,
//     data: Array<object>
// }

//菜单接口
export interface menuInterface {
    id: number,
    router_url: string,
    router_param: string,
    param: string,
    name: string,
    router_param_val?: string,
    outer_url?: string,
    router_type: string
    icon_url?: string,
    order?: number,
    parent_id: number,
    bz?: string | number,
    children?: Array<object>,
    create_user?: string,
    del_marker?: number,
    update_user?: object | string,
    updatedAt?: string,
}

interface fileInterface {
    size: number,
    type: string,
    targetSize: number,
    arrayBuffer: () => Promise<ArrayBuffer>,
    slice: (start?: number | undefined, end?: number | undefined, contentType?: string | undefined) => Blob
    stream: () => ReadableStream<any>,
    text: () => Promise<string>
}

//绘图接口
export interface canvasImgInterface {
    file: fileInterface,
    targetSize: number,
    width: number,
    fileName?: string,
    quality?: number,
    succ: Function
}