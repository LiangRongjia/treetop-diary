import React from "react"
import { TreeItemData } from "./data"
import styles from './TreeItem.module.css'

const TreeItem: React.FC<{
    className?: string
    data: TreeItemData
}> = ({
    className = '',
    data
}) => (
        <div className={`${styles.tree_item} ${className}`}>
            <div className={styles.content}
                data-active={data.active ? 'true' : ''}
                onClick={(e) => { data.onClick(data, e) }}>
                {data.content}
            </div>
            <div className={styles.children}>
                {data.children.map(child => (
                    <TreeItem key={child.key} data={child} />
                ))}
            </div>
        </div>
    )

export { TreeItem }