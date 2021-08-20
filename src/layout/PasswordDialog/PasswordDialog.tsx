import React, { createRef } from "react"

import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button'
import Dialog from "../../components/Dialog/Dialog"

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

        const _onOkClick = () => {
            inputEleRef.current && verify(inputEleRef.current.value)
        }

        const _onCancelClick = () => {
            inputEleRef.current && (inputEleRef.current.value = '')
            hide()
        }

        const _onDismiss = _onCancelClick

        return (
            new Dialog()
                .title('输入密码')
                .content(
                    <input ref={inputEleRef} type="password"></input>
                )
                .footer(
                    <PrimaryButton key='ok' onClick={_onOkClick} text="确定" />,
                    <DefaultButton key='cancel' onClick={_onCancelClick} text="取消" />
                )
                .onDismiss(_onDismiss)
                .show(isShow)
                .done()
        )
    }

export default PasswordDialog