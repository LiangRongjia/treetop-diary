import React, { useState, useEffect } from "react"
import TextEditor, { TextEditorCtx } from "../../../components/TextEditor/TextEditor"

import styles from "./YearsEditor.module.css"

const YearsEditor = ({
    activeYearIndex,
    yearIndexs,
    onEditYearIndex,
    onSelectYear,
    onDeleteYear,
    onAddYear
}: {
    activeYearIndex: number,
    yearIndexs: number[],
    onEditYearIndex: (oldIndex: number, newIndex: number) => void,
    onSelectYear: (yearIndex: number) => void,
    onDeleteYear: (yearIndex: number) => void,
    onAddYear: (yearIndex: number) => void
}) => {

    /** 标记是否显示下拉列表 */
    const [dropdownShow, setDropdownShow] = useState(false)

    /** 标记是否正在编辑 */
    const [editting, setEditting] = useState(false)

    /** 记忆编辑器文本转化后的数字 */
    const [number, setNumber] = useState(activeYearIndex)

    /** 非选中年份 */
    const inactiveYearIndexs = yearIndexs.filter(i => i !== activeYearIndex)

    /**
     * 退出编辑状态。
     * 1. 取消挂载于 `document` 的监听器（即本回调函数）；
     * 2. 关闭编辑状态；
     * 3. 若 number 不与现有年份重复，调用上层交给的回调函数，修改年份值为此年份。
     */
    const exitEditting = () => {

        document.removeEventListener('click', exitEditting)

        setEditting(false)

        if (!yearIndexs.includes(number)) {
            onEditYearIndex(activeYearIndex, number)
        }
    }

    /**
     * 关闭下拉列表。
     * 1. 设置下拉列表显示状态；
     * 2. 删除 `document` 上的监听器（即本回调函数）
     */
    const closeDropdown = () => {
        setDropdownShow(false)
        document.removeEventListener('click', closeDropdown)
    }

    /**
     * 当点击添加按钮时执行。
     * 1. 获取实时年份；
     * 2. 找到不与现有年份重复的年份，使用循环自增的方式；
     * 3. 调用上层交给的回调函数，添加一个年份数据。
     */
    const onAddBtnClick = () => {

        let newYearIndex = (new Date).getFullYear()

        while (yearIndexs.includes(newYearIndex)) {

            newYearIndex++

        }

        onAddYear(newYearIndex)
    }

    /**
     * 当点击删除按钮时执行。
     * 1. 调用上层交付的回调函数，删除当前年份。
     */
    const onDeleteBtnClick = () => {

        onDeleteYear(activeYearIndex)

    }

    /**
     * 当点击当前选中年份框时执行。
     * 1. 若处在编辑状态，阻止事件冒泡，以防止 `document` 上的监听器取消编辑状态；
     * 2. 若不在编辑状态，调用上层交付的回调函数，选择当前年份。
     * @param ctx `TextEditor` 编辑器提供的 `contex` 对象
     * @param e `React` 鼠标点击事件
     */
    const onActiveYearClick = (ctx: TextEditorCtx, e: React.MouseEvent) => {

        if (editting) {

            e.stopPropagation()

        } else {

            onSelectYear(activeYearIndex)

        }
    }

    /**
     * 构造函数，为指定年份的选项构造项点击回调函数。
     * @param index 指定的年份。
     * @returns 当点击指定年份选项时调用的回调函数，即执行上层交付的回调函数，选中指定年份
     */
    const onYearOptionClick = (index: number) => () => {
        onSelectYear(index)
    }

    /**
     * 当点击下拉列表按钮时执行。
     * 1. 当下拉列表展开时，什么都不做，因为下拉列表收回靠的是 `document` 上的监听器；
     * 2. 否则，即要展开下拉列表，先阻止事件冒泡，防止事件冒泡至 `document`，导致收回下拉列表；
     * 3. 在 `document` 上添加监听器，以日后收回下拉列表
     * 4. 更新下拉列表状态，展开下拉列表
     * @param e `React` 鼠标事件
     */
    const onDropdownBtnClick = (e: React.MouseEvent) => {

        if (dropdownShow) return

        e.nativeEvent.stopPropagation()

        document.addEventListener('click', closeDropdown)

        setDropdownShow(true)

    }

    /**
     * 当正在编辑时执行。
     * 1. 将字符串转化为数字；
     * 2. 只有是数字且非 `NaN`，才：
     * 3. 设置到状态中。
     * @param ctx `TextEditor` 提供的 context
     */
    const onTextEditorChange = (ctx: TextEditorCtx) => {

        const num = parseInt(ctx.text)

        if (!isNaN(num)) {
            setNumber(num)
        }
    }

    /**
     * 当双击当前选中年份框时执行，目标是进入编辑状态。
     * 1. 当已是编辑状态时，什么也不做，否则：
     * 2. 阻止事件冒泡，防止触发 `document` 上的监听器，导致立即取消编辑状态；
     * 3. 在 `document` 上添加监听器，以日后取消编辑状态；
     * 4. 设置编辑状态；
     * 5. 在本次事件循环结束后聚焦到编辑框上，不能立即聚焦，否则会被 `React` 过程抢掉焦点。
     * @param ctx `TextEditor` 提供的 context
     * @param e `React` 的鼠标事件
     */
    const onActiveYearDoubleClick = (ctx: TextEditorCtx, e: React.MouseEvent) => {

        if (editting) return

        e.nativeEvent.stopPropagation()

        document.addEventListener('click', exitEditting)

        setEditting(!editting)

        setTimeout(() => {
            ctx.ele?.focus()
        })
    }

    /**
     * 当是否编辑状态改变的时候，重置编辑器。
     */
    useEffect(() => {
        setNumber(activeYearIndex)
    }, [editting])

    console.log('[YearsEditor Render]')

    return (
        <div className={styles.years_editor}>
            <div className={styles.year_options_group}
                data-show={dropdownShow ? 'true' : 'false'}>
                {inactiveYearIndexs.length === 0
                    ? <div className={styles.placeholder}>空</div>
                    : inactiveYearIndexs.map(index => (
                        <div key={index}
                            className={styles.year_option}
                            onClick={onYearOptionClick(index)}>
                            {index}
                        </div>
                    ))}
            </div>
            <TextEditor
                initialText={`${activeYearIndex}`}
                className={styles.active_year}
                handle={editting ? 0 : activeYearIndex}
                onChange={onTextEditorChange}
                disabled={!editting}
                onDoubleClick={onActiveYearDoubleClick}
                onClick={onActiveYearClick}
            />
            <div className={styles.dropdown_button}
                onClick={onDropdownBtnClick}><div></div></div>
            <div className={styles.delete_button}
                onClick={onDeleteBtnClick}></div>
            <div className={styles.add_button}
                onClick={onAddBtnClick}></div>
        </div>
    )
}

export default YearsEditor