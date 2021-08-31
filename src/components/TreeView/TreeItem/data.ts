/**
 * 用于配置 `TreeItem` 数据的数据类型
 */
class TreeItemData {

    key: string = ''
    content: string = ''
    active: boolean = false
    children: TreeItemData[] = []
    onClick: ((thisItem: TreeItemData, e: React.MouseEvent) => void) = () => { }

    /**
     * 以链式接口实例化 `TreeItemData` 对象
     */
    static new() {
        const newData = new TreeItemData()
        return TreeItemData.set(newData)
    }

    /**
     * 以链式接口修改 `TreeItemData` 对象
     * @param treeItemData 
     * @returns 
     */
    static set(treeItemData: TreeItemData) {
        return ({
            key(key: string) {
                treeItemData.key = key
                return this
            },
            children(arr: TreeItemData[]) {
                treeItemData.children = [...treeItemData.children, ...arr]
                return this
            },
            content(text: string) {
                treeItemData.content = text
                return this
            },
            active(bool: boolean) {
                treeItemData.active = bool
                return this
            },
            onClick(callback: () => void) {
                treeItemData.onClick = callback
                return this
            },
            done() {
                return treeItemData
            }
        })
    }
}

export { TreeItemData }