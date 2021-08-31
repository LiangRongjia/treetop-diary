import React from "react"
import { TreeView } from "../../components/TreeView/TreeView"
import { Path, Year } from "../../types"
import { getCatalogData } from "./data"
import styles from "./Catalog.module.css"

const Catalog: React.FC<{
    years: Year[],
    path: Path,
    onChangePath: (path: Path) => void,
    onAddDiary: (path: Path) => void,
    onAddMonth: (path: Path) => void,
    onAddYear: (path: Path) => void
}> = (props) => {

    return (
        <TreeView
            className={styles.catalog}
            data={getCatalogData(props)}
        />
    )
}

export { Catalog }