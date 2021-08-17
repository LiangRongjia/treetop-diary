import { Data } from "../types"
import { createDownload } from "../utils/utils"

/**
 * 文件算法版本标识符约定：
 * 1. 在文件开头使用以 `;` 为结尾的不定长字符串表示算法版本。
 * 2. 第一个版本比较特殊，文件为标准 `json`，无上述版本标志符字段。
 */

/**
 * 版本名常量。
 */
const VER = {
    V1_JSON: 'V1_JSON'
}

/**
 * 读取文件开头的版本字符串。
 * @param file 
 * @returns 
 */
const readVersion = (file: string) => {
    if (file[0] === '{') {
        return VER.V1_JSON
    }

    const verChars = []

    let i = 0
    while (file[i] !== ';') {
        verChars.push(file[i])
        i++
    }

    return verChars.join('')
}

/**
 * 导入算法 V1_JSON：`json` 格式，无加密，无算法版本标记。
 * @param file 
 * @returns 
 */
const importV1 = (file: string) => {
    const data = JSON.parse(file) as Data
    return data
}

/**
 * 导出算法 V1_JSON：`json` 格式，无加密，无算法版本标记。
 * @param data 
 */
const exportV1 = (data: Data) => {
    const content = new Blob([JSON.stringify(data)])
    const now = new Date()
    const y = now.getFullYear()
    const mo = `0${now.getMonth() + 1}`.slice(-2)
    const d = `0${now.getDate()}`.slice(-2)
    const h = `0${now.getHours()}`.slice(-2)
    const mi = `0${now.getMinutes()}`.slice(-2)
    const s = `0${now.getSeconds()}`.slice(-2)
    createDownload(`${data.bookName}-${y}${mo}${d}-${h}${mi}${s}.json`, content)
}

/**
 * 整合各版本的导入算法，识别文件算法版本，以相应算法读取。
 * @param file 
 * @returns 
 */
const importFile = (file: string) => {
    switch (readVersion(file)) {
        case VER.V1_JSON:
            return importV1(file)
        default:
            return new Data()
    }
}

/**
 * 以最新算法形式导出数据文件。
 * @param data 
 */
const exportFile = (data: Data) => {
    exportV1(data)
}

export {
    importFile,
    exportFile
}