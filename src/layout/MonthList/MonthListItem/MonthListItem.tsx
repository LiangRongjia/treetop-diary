import React from 'react'
import styles from './MonthListItem.module.css'

const MonthListItem:
    React.FC<{
        monthIndex: number,
        monthTitle: string,
        selected: boolean
        onSelectMonth: () => void
    }> = ({
        monthIndex,
        monthTitle,
        selected,
        onSelectMonth
    }) => {

        return (
            <div
                className={`${styles.month_list_item}`}
                onClick={onSelectMonth}
                data-selected={selected ? 'true' : 'false'}>
                <div className={styles.month_list_item_index}>{monthIndex}</div>
                <div className={styles.month_list_item_title}>{monthTitle}</div>
            </div >
        )

    }

export default MonthListItem