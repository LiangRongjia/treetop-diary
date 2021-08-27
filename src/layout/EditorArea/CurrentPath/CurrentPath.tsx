import React from "react"
import { Path } from "../../../types"

import styles from "./CurrentPath.module.css"

const CurrentPath
    : React.FC<{
        path: Path
        onDeletePath: (path: Path) => void
    }> = ({
        path,
        onDeletePath
    }) => {

        return (
            <div className={styles.current_path}>
                <div>{path.year}</div>
                {path.month === Infinity
                    ? undefined
                    : <div>&nbsp;/ {path.month}</div>}
                {path.date === Infinity
                    ? undefined
                    : <div>&nbsp;/ {path.date}</div>}
                <div className={styles.delete}
                    onClick={() => { onDeletePath(path) }}
                ></div>
            </div>
        )
    }

export default CurrentPath