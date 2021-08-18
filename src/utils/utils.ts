import { Data, Month, Year } from "../types"

/**
 * 根据年份和月份获取该月日数。
 * @param yearIndex 年份
 * @param monthIndex 月份
 * @returns 该月日数，入参取值不合法则返回 `undefined`
 */
const getDaysCount = (yearIndex: number, monthIndex: number) => {
    const days = [undefined, 31, 28, 31, 30, 31, 30, 31, 30, 30, 31, 30, 31]
    if (yearIndex % 4 === 0 && yearIndex % 100 !== 0 || yearIndex % 400 === 0) {
        days[2] = 29
    }
    return days[monthIndex]
}

const createDownload = (fileName: string, content: Blob) => {
    const aEle = document.createElement('a')
    aEle.download = fileName
    aEle.href = window.URL.createObjectURL(content)
    aEle.style.display = 'none'
    document.body.appendChild(aEle)
    aEle.click()
}

const slimData = (data: Data) => {

    const dataCopy = JSON.parse(JSON.stringify(data)) as Data

    const slimmedData = {
        ...dataCopy,
        years: dataCopy.years.map(year => ({
            ...year,
            months: year.months.map(month => ({
                ...month,
                diarys: month.diarys.filter(diary =>
                    !(diary.content.data === ''
                        && diary.tags.length === 0
                        && diary.title === ''
                    )
                )
            })).filter(month =>
                !(month.diarys.length === 0
                    && month.summary.data === ''
                    && month.tags.length === 0
                    && month.title === ''
                )
            )
        }))
    }

    return slimmedData
}

const restoreData = (data: Data) => {

    const compressedData = JSON.parse(JSON.stringify(data)) as Data

    const completeData = {
        ...compressedData,
        years: compressedData.years.map(year => {
            const newYear = new Year(
                year.index,
                year.title,
                year.tags,
                year.summary
            )
            year.months.map(month => {
                const newMonth = new Month(
                    month.yearIndex,
                    month.index,
                    month.title,
                    month.tags,
                    month.summary
                )
                month.diarys.forEach(diary => {
                    newMonth.diarys[diary.index - 1] = diary
                })
                return newMonth
            }).forEach(month => {
                newYear.months[month.index - 1] = month
            })
            return newYear
        })
    }

    return completeData
}

export {
    getDaysCount,
    createDownload,
    slimData,
    restoreData
}