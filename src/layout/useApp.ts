import { useState } from "react"
import { Data, Diary, Month, Year } from "../types"
import { exportFile, importFile } from "./importAndExport"

const useApp = () => {

    const [data, setData] = useState(new Data())

    const [activeYearIndex, setActiveYearIndex] = useState(Infinity)
    const [activeMonthIndex, setActiveMonthIndex] = useState(0)
    const [activeDiaryIndex, setActiveDiaryIndex] = useState(0)
    const [editorHandle, setEditorHandle] = useState(0)
    const [passwordDialogShow, setPasswordDialogShow] = useState(false)

    const [importedDataBuffer, setImportedDataBuffer] = useState(new Data())

    const years = data.years || []
    const activeYear = years.filter(y => y.index === activeYearIndex).shift()
    const months = activeYear?.months || []
    const activeMonth = months[activeMonthIndex - 1] as Month | undefined
    const diarys = activeMonth?.diarys || []
    const activeDiary = diarys[activeDiaryIndex - 1] as Diary | undefined

    const yearIndexs = years.map(y => y.index)
    const bookName = data.bookName

    /** 若当前年份不合法，选择合法的第一个年份 */
    if (years.length !== 0
        && !(years.map(year => year.index).includes(activeYearIndex))) {
        setActiveYearIndex(years.map(year => year.index).shift() || Infinity)
    }

    /** 以下是 activexxx 变量变更所触发的回调函数。 */

    /** 当选中某日记时执行。 */
    const onSelectDiary = (newDiaryIndex: number) => {
        setEditorHandle(e => e + 1)
        setActiveDiaryIndex(newDiaryIndex)
    }

    /** 当选中某月份时执行。 */
    const onSelectMonth = (newMonthIndex: number) => {
        setEditorHandle(e => e + 1)
        setActiveDiaryIndex(0)
        setActiveMonthIndex(newMonthIndex)
    }

    /** 当选中某年份时执行。 */
    const onSelectYear = (newYearIndex: number) => {
        setEditorHandle(e => e + 1)
        setActiveDiaryIndex(0)
        setActiveMonthIndex(0)
        setActiveYearIndex(newYearIndex)
    }

    /** 当添加某年份时执行。 */
    const onAddYear = (yearIndex: number) => {
        const newYears = [...years]
        newYears.push(new Year(yearIndex))
        newYears.sort((a, b) => a.index - b.index)
        setData({ ...data, years: newYears })
        setActiveDiaryIndex(0)
        setActiveMonthIndex(0)
        setActiveYearIndex(yearIndex)
        setEditorHandle(e => e + 1)
    }

    /** 当删除某年份时执行。 */
    const onDeleteYear = (index: number) => {
        const newYears = years.filter(y => y.index !== index)
        setData({ ...data, years: newYears })
        setActiveDiaryIndex(0)
        setActiveMonthIndex(0)
        setActiveYearIndex(years[0]?.index || Infinity)
        setEditorHandle(e => e + 1)
    }

    /** 当编辑某年份的年份数字 index 时执行。 */
    const onEditYearIndex = (oldIndex: number, newIndex: number) => {
        const year = years.filter(y => y.index === oldIndex).shift()
        if (year == undefined) return
        year.index = newIndex
        years.sort((a, b) => a.index - b.index)
        setData({ ...data })
        setActiveDiaryIndex(0)
        setActiveMonthIndex(0)
        setActiveYearIndex(newIndex)
        setEditorHandle(e => e + 1)
    }

    /** 分析编辑区将要编辑 日记、月份 还是 年份。 */
    const edittingType = activeYearIndex === 0
        ? 'none'
        : activeMonthIndex === 0
            ? 'year'
            : activeDiaryIndex === 0
                ? 'month'
                : 'diary'

    /** data 变更所触发的回调，放在对象里，自然形成分组，有较好的可读性。 */
    const onChanges = {
        year: {
            title: (newTitle: string) => {
                activeYear && (activeYear.title = newTitle)
                setData({ ...data })
            },
            tags: (newTags: string[]) => {
                activeYear && (activeYear.tags = newTags)
                setData({ ...data })
            },
            summary: (newSummary: string) => {
                activeYear && (activeYear.summary.data = newSummary)
                setData({ ...data })
            }
        },
        month: {
            title: (newTitle: string) => {
                activeMonth && (activeMonth.title = newTitle)
                setData({ ...data })
            },
            tags: (newTags: string[]) => {
                activeMonth && (activeMonth.tags = newTags)
                setData({ ...data })

            },
            summary: (newSummary: string) => {
                activeMonth && (activeMonth.summary.data = newSummary)
                setData({ ...data })
            }
        },
        diary: {
            title: (newTitle: string) => {
                if (activeDiary === undefined) return
                activeDiary.title = newTitle
                setData({ ...data })
            },
            tags: (newTags: string[]) => {
                if (activeDiary === undefined) return
                activeDiary.tags = newTags
                setData({ ...data })

            },
            content: (newContent: string) => {
                if (activeDiary === undefined) return
                activeDiary.content.data = newContent
                setData({ ...data })
            }
        }
    }

    /** 编辑区需要的参数，包括初始化值以及变更事件触发的回调。 */
    const editTarget = {
        title: edittingType === 'year'
            ? activeYear?.title || ''
            : edittingType === 'month'
                ? activeMonth?.title || ''
                : edittingType === 'diary'
                    ? activeDiary?.title || ''
                    : '',
        tags: edittingType === 'year'
            ? activeYear?.tags || []
            : edittingType === 'month'
                ? activeMonth?.tags || []
                : edittingType === 'diary'
                    ? activeDiary?.tags || []
                    : [],
        content: edittingType === 'year'
            ? activeYear?.summary.data || ''
            : edittingType === 'month'
                ? activeMonth?.summary.data || ''
                : edittingType === 'diary'
                    ? activeDiary?.content.data || ''
                    : '',
        onTitleChange: edittingType === 'year'
            ? onChanges.year.title
            : edittingType === 'month'
                ? onChanges.month.title
                : edittingType === 'diary'
                    ? onChanges.diary.title
                    : (() => { }),
        onTagsChange: edittingType === 'year'
            ? onChanges.year.tags
            : edittingType === 'month'
                ? onChanges.month.tags
                : edittingType === 'diary'
                    ? onChanges.diary.tags
                    : (() => { }),
        onContentChange: edittingType === 'year'
            ? onChanges.year.summary
            : edittingType === 'month'
                ? onChanges.month.summary
                : edittingType === 'diary'
                    ? onChanges.diary.content
                    : (() => { }),
        titleEditorPlaceholder: edittingType === 'year'
            ? '年度总结标题'
            : edittingType === 'month'
                ? '月度总结标题'
                : edittingType === 'diary'
                    ? '日记标题'
                    : ''
    }

    const onBookNameChange = (newBookName: string) => {
        setData({ ...data, bookName: newBookName })
    }

    const onImportFile = (file: string) => {
        const newData = importFile(file)
        setImportedDataBuffer(newData)
        setPasswordDialogShow(true)
        console.log(newData.password)
    }

    const onExportFile = () => {
        exportFile(data)
    }

    const hidePasswordDialog = () => {
        setPasswordDialogShow(false)
    }

    const verifyPassword = (password: string) => {
        if (importedDataBuffer.password === password) {
            setData({ ...importedDataBuffer })
            setEditorHandle(pre => pre + 1)
            setImportedDataBuffer(new Data())
            console.log(importedDataBuffer.password, password)
        }
        console.log(importedDataBuffer.password, password)
        hidePasswordDialog()
    }


    return {
        yearIndexs,
        months,
        diarys,
        activeDiaryIndex,
        activeMonthIndex,
        activeYearIndex,
        editTarget,
        editorHandle,
        bookName,
        passwordDialogShow,
        onSelectYear,
        onSelectMonth,
        onSelectDiary,
        onEditYearIndex,
        onDeleteYear,
        onAddYear,
        onBookNameChange,
        onImportFile,
        onExportFile,
        verifyPassword,
        hidePasswordDialog
    }
}

export default useApp