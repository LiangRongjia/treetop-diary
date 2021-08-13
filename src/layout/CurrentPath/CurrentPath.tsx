import React from "react"

import styles from "./CurrentPath.module.css"

const CurrentPath: React.FC<{
    year: number,
    month: number,
    date: number
}> = ({
    year,
    month,
    date
}) => {
        return (
            <div className={styles.current_path}>
                <div>{year}</div>
                {month === 0
                    ? undefined
                    : <div>&nbsp;/ {month}</div>}
                {date === 0
                    ? undefined
                    : <div>&nbsp;/ {date}</div>}
            </div>
        )
    }

export default CurrentPath