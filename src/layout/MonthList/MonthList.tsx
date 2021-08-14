import React from 'react'
import { Month } from '../../types'
import MonthListItem from './MonthListItem/MonthListItem'
import styles from './MonthList.module.css'

const MonthList:
    React.FC<{
        months: Month[],
        activeMonthIndex: number,
        onSelectMonth: (newMonthIndex: number) => void
    }> = ({
        months,
        activeMonthIndex,
        onSelectMonth
    }) => {

        console.log('[MonthList Render]')

        return (
            <div className={styles.month_list}>
                {months.map(month => (
                    <MonthListItem
                        monthIndex={month.index}
                        monthTitle={month.title}
                        selected={month.index === activeMonthIndex}
                        onSelectMonth={() => onSelectMonth(month.index)}
                        key={month.index}
                    />
                ))}
            </div>
        )
    }

export default MonthList
