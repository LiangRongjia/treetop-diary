import { Dialog, DialogType, DialogFooter } from "@fluentui/react"
import React, { createRef } from "react"

import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button'
import { useId } from '@fluentui/react-hooks'


const dialogContentProps = {
    type: DialogType.normal,
    title: '输入密码',
    closeButtonAriaLabel: '关闭',
}

const PasswordDialog:
    React.FC<{
        isShow: boolean,
        hide: () => void,
        verify: (password: string) => void
    }> = ({
        isShow,
        hide,
        verify
    }) => {

        const inputEleRef = createRef<HTMLInputElement>()

        const labelId = useId('dialogLabel')
        const subTextId = useId('subTextLabel')

        const modalProps = React.useMemo(
            () => ({
                titleAriaId: labelId,
                subtitleAriaId: subTextId,
                isBlocking: false,
                styles: { main: { maxWidth: 450 } },
            }),
            [labelId, subTextId],
        )

        const _onOkClick = () => {
            inputEleRef.current && verify(inputEleRef.current.value)
        }

        const _onCancelClick = () => {
            inputEleRef.current && (inputEleRef.current.value = '')
            hide()
        }

        const _onDismiss = _onCancelClick

        return (
            <div style={{ position: 'fixed' }}>
                <Dialog
                    hidden={!isShow}
                    onDismiss={_onDismiss}
                    dialogContentProps={dialogContentProps}
                    modalProps={modalProps}
                >
                    <input ref={inputEleRef} type="password"></input>
                    <DialogFooter>
                        <PrimaryButton onClick={_onOkClick} text="确定" />
                        <DefaultButton onClick={_onCancelClick} text="取消" />
                    </DialogFooter>
                </Dialog>
            </div>
        )
    }

export default PasswordDialog