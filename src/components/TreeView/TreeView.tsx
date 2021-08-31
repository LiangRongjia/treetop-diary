import React from "react"
import { TreeViewData } from "./data"
import styles from "./TreeView.module.css"
import { TreeItem } from "./TreeItem/TreeItem"

const TreeView: React.FC<{
    className: string
    data: TreeViewData
}> = ({
    className,
    data
}) => (
        <div className={`${styles.tree_view} ${className}`}>
            <div>{data.title}</div>
            <div className={styles.tree_items}>
                {data.items.map(item => (
                    <TreeItem key={item.key} data={item} />
                ))}
            </div>
        </div >
    )

export { TreeView }