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
    aEle.style.position = 'fixed'
    document.body.appendChild(aEle)
    aEle.click()
}

export {
    getDaysCount,
    createDownload
}