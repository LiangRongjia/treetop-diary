import React, { createRef, useEffect, useState } from "react";
import TextEditor, { TextEditorCtx } from "../../../components/TextEditor/TextEditor";
import { Data } from "../../../types";

import styles from "./FileController.module.css"

const FileController:
    React.FC<{
        fileName: string,
        onFileNameChange: (newBookName: string) => void,
        onImportFile: (file: string) => void,
        onExportFile: () => void
    }> = ({
        fileName,
        onFileNameChange,
        onImportFile,
        onExportFile
    }) => {

        const inputEleRef = createRef<HTMLInputElement>()

        const [editable, setEditable] = useState(false)

        const isFileNameValid = (name: string) => {
            return name !== ''
        }

        const exitEditting = () => {

            document.removeEventListener('click', exitEditting)
            setEditable(false)
        }

        const enterEditting = (ele: HTMLDivElement, e: Event) => {
            e.stopPropagation()
            document.addEventListener('click', exitEditting)
            setEditable(true)
            setTimeout(() => {
                ele.focus()
            })
        }

        const _onClick = (ctx: TextEditorCtx) => {
            if (!editable) {
                ctx.evt && ctx.ele && enterEditting(ctx.ele, ctx.evt.nativeEvent)
            } else {
                ctx.evt?.stopPropagation()
            }
        }

        const _onDisabled = (ctx: TextEditorCtx) => {
            const newFileName = ctx.text
            if (isFileNameValid(newFileName)) {
                onFileNameChange(newFileName)
            } else {
                ctx.setTextContent(fileName)
            }
        }

        const _onExport = () => {
            onExportFile()
        }

        const _onImport = () => {

            if (!inputEleRef.current) return

            /**
             * 下面清空 input 元素的值使用 ref.current 的话会为 null，故用局部变量引用 input
             */
            const inputEle = inputEleRef.current

            if (!inputEle.files || inputEle.files?.length === 0) return

            const file = inputEle.files[0]

            const reader = new FileReader()

            reader.onload = () => {
                if (typeof reader.result === 'string') {
                    onImportFile(reader.result || '')
                }
                /**
                 * 清空当前 input 元素的值，防止同路径文件不能重新导入
                 */
                inputEle && (inputEle.value = '')
            }

            reader.readAsText(file)
        }

        useEffect(() => {
            inputEleRef.current?.addEventListener('change', _onImport)
            return () => {
                inputEleRef.current?.removeEventListener('change', _onImport)
            }
        })

        return (
            <div className={styles.file_controller}>
                <TextEditor
                    className={styles.name_editor}
                    defaultText={fileName}
                    placeholder="日记本名"
                    disabled={!editable}
                    onClick={_onClick}
                    onDisabled={_onDisabled}
                />
                <label className={styles.import}>
                    <input
                        ref={inputEleRef}
                        className={styles.file_input_control}
                        type="file"></input>
                    <div>导入</div>
                </label>
                <div className={styles.export} onClick={_onExport}>导出</div>
            </div >
        )
    }

export default FileController