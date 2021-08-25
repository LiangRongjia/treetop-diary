/**
 * 该文件导出关于文件导入导出的算法
 */
import { Data } from "../types"
import { createDownload, restoreData, slimData } from "../utils/utils"
import RC4 from 'crypto-js/rc4'
import { enc } from "crypto-js"

/**
 * 文件算法版本标识符约定：
 * 1. 在文件开头使用以 `;` 为结尾的不定长字符串表示算法版本。
 * 2. 第一个版本比较特殊，文件为标准 `json`，无上述版本标志符字段。
 */

/**
 * 版本名常量。
 */
const VER = {
    V1_JSON: 'V1_JSON',
    V2_JSON: 'V2_JSON',
    V3_PASSWORD: 'V3_PASSWORD',
    V4_RC4: 'V4_RC4',
    V5_RC4: 'V5_RC4'
}

/**
 * 获取当前时间字符串，格式 `yyyymmdd-hhmmss`
 */
const getNowStr = () => {
    const now = new Date()
    const y = now.getFullYear()
    const mo = `0${now.getMonth() + 1}`.slice(-2)
    const d = `0${now.getDate()}`.slice(-2)
    const h = `0${now.getHours()}`.slice(-2)
    const mi = `0${now.getMinutes()}`.slice(-2)
    const s = `0${now.getSeconds()}`.slice(-2)
    return `${y}${mo}${d}-${h}${mi}${s}`
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

// =====================================================

/**
 * 导入算法 `V1_JSON`：`json` 格式，无加密，无算法版本标记。
 * @param dataStr 
 * @returns 
 */
const parseData_V1_JSON = (dataStr: string) => {
    const data = {
        ...JSON.parse(dataStr) as Data,
        password: ''
    }
    return data
}

/**
 * 导出算法 `V1_JSON`：`json` 格式，无加密，无算法版本标记。
 * @param data 
 */
const toFileStr_V1_JSON = (data: Data) => {
    const fileBlob = new Blob([JSON.stringify(data)])
    return fileBlob
}

// =====================================================

/**
 * 导入算法 `V2_JSON`：丢弃空值
 * @param dataStr 
 * @returns 
 */
const parseData_V2_JSON = (dataStr: string) => {
    const data = {
        ...JSON.parse(dataStr) as Data,
        password: ''
    }
    return data
}

/**
 * 导出算法 `V2_JSON`：丢弃空值
 * @param data 
 * @returns 
 */
const toFileStr_V2_JSON = (data: Data) => {
    const slimmedData = slimData(data)
    const fileBlob = new Blob([VER.V2_JSON, ';', JSON.stringify(slimmedData)])
    return fileBlob
}

// =====================================================

/**
 * 导入算法 `V3_PASSWORD`：丢弃空值
 * @param dataStr 
 * @returns 
 */
const parseData_V3_PASSWORD = (dataStr: string) => {
    const data = JSON.parse(dataStr) as Data
    return data
}

/**
 * 导出算法 `V3_PASSWORD`：丢弃空值
 * @param data 
 * @returns 
 */
const toFileStr_V3_PASSWORD = (data: Data) => {
    const slimmedData = slimData(data)
    const fileBlob = new Blob([VER.V3_PASSWORD, ';', JSON.stringify(slimmedData)])
    return fileBlob
}

// =====================================================

/**
 * 导入算法 `V4_RC4`：使用 `RC4` 加密文件
 */
const parseData_V4_RC4 = (dataStr: string, password: string) => {
    const decryptoData = RC4.decrypt(dataStr, password).toString(enc.Utf8)
    const data = JSON.parse(decryptoData) as Data
    return data
}

/**
 * 导出算法 `V4_RC4`：使用 `RC4` 加密文件
 * @param file 
 * @returns 
 */
const toFileStr_V4_RC4 = (data: Data) => {
    const slimmedData = slimData(data)
    const encryptoData = RC4.encrypt(JSON.stringify(slimmedData), data.password).toString()
    const fileBlob = new Blob([VER.V4_RC4, ';', encryptoData])
    return fileBlob
}

// =====================================================

/**
 * 导入算法 `V5_RC4`：使用 `RC4` 加密文件
 */
const parseData_V5_RC4 = (dataStr: string, password: string) => {
    const decryptoData = RC4.decrypt(dataStr, password).toString(enc.Utf8)
    const compressedData = JSON.parse(decryptoData) as Data
    const data = restoreData(compressedData)
    return data
}

/**
 * 导出算法 `V5_RC4`：使用 `RC4` 加密文件
 * @param file 
 * @returns 
 */
const toFileStr_V5_RC4 = (data: Data) => {
    const slimmedData = slimData(data)
    const encryptoData = RC4.encrypt(JSON.stringify(slimmedData), data.password).toString()
    const fileBlob = new Blob([VER.V5_RC4, ';', encryptoData])
    return fileBlob
}

// =====================================================

/**
 * 整合各版本的导入算法，识别文件算法版本，以相应算法读取。
 * @param file 
 * @returns 
 */
const parseFile = (file: string, password: string) => {
    switch (readVersion(file)) {
        case VER.V1_JSON:
            return parseData_V1_JSON(file)
        case VER.V2_JSON:
            return parseData_V2_JSON(file.slice(VER.V2_JSON.length + 1))
        case VER.V3_PASSWORD:
            return parseData_V3_PASSWORD(file.slice(VER.V3_PASSWORD.length + 1))
        case VER.V4_RC4:
            return parseData_V4_RC4(file.slice(VER.V4_RC4.length + 1), password)
        default:
            return new Data()
    }
}

/**
 * 以最新算法形式导出数据文件。
 * @param data 
 */
const exportFile = (data: Data) => {
    const content = toFileStr_V4_RC4(data)
    createDownload(`${data.bookName}-${getNowStr()}.diary`, content)
}

export {
    exportFile,
    parseFile
}