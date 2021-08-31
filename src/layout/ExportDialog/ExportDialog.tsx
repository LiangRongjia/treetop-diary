import React, { createRef, useEffect } from "react"
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button'
import { Dialog } from "../../components/Dialog/Dialog"

const ExportDialog:
    React.FC<{
        defaultPassword: string,
        show: boolean,
        hide: () => void,
        onExport: (password: string) => void
    }> = ({
        defaultPassword,
        show,
        hide,
        onExport
    }) => {

        const inputEleRef = createRef<HTMLInputElement>()

        const _onOkClick = () => {
            inputEleRef.current && onExport(inputEleRef.current.value)
            hide()
        }

        const _onCancelClick = () => {
            inputEleRef.current && (inputEleRef.current.value = '')
            hide()
        }

        useEffect(() => {
            setTimeout(() => {
                show === true
                    && inputEleRef.current
                    && (inputEleRef.current.value = defaultPassword)
            })
        }, [show])

        return (
            <Dialog
                show={show}
                title='设置密码'
                content={
                    <>
                        <p>以下自动填充当前密码，如无需修改，请直接确认导出。</p>
                        <input ref={inputEleRef} type="password"></input>
                    </>
                }
                footer={[
                    <PrimaryButton key='ok' onClick={_onOkClick} text="确定" />,
                    <DefaultButton key='cancel' onClick={_onCancelClick} text="取消" />
                ]}
                onDismiss={_onCancelClick}
            />
        )
    }

export default ExportDialog