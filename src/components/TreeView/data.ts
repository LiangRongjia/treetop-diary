import { TreeItemData } from "./TreeItem/data"

/**
 * 用于配置 `TreeView` 数据的数据类型
 */
class TreeViewData {

    title: string = ''
    items: TreeItemData[] = []

    /**
     * 以链式接口实例化一个新对象
     * @returns 
     */
    static new() {
        const newData = new TreeViewData()
        return TreeViewData.set(newData)
    }

    /**
     * 以链式接口修改一个 `TreeViewData` 对象
     * @param treeViewData 要修改的 `TreeViewData` 对象
     * @returns 链式接口
     */
    static set(treeViewData: TreeViewData) {
        return ({
            items(arr: TreeItemData[]) {
                treeViewData.items = [...treeViewData.items, ...arr]
                return this
            },
            title(text: string) {
                treeViewData.title = text
                return this
            },
            done() {
                return treeViewData
            }
        })
    }
}

export { TreeViewData }