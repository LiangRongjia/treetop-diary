import React, { useMemo } from "react"

import { Dialog as FLDialog, DialogType, DialogFooter } from "@fluentui/react"

import { useId } from '@fluentui/react-hooks'

const Dialog: React.FC<{
    title: string
    content: JSX.Element | JSX.Element[]
    footer: JSX.Element | JSX.Element[]
    show: boolean
    onDismiss: () => void
}> = ({
    content = [],
    footer = [],
    show = true,
    title = '标题',
    onDismiss = () => { }
}) => {

        const labelId = useId('dialogLabel')
        const subTextId = useId('subTextLabel')

        const modalProps = useMemo(
            () => ({
                titleAriaId: labelId,
                subtitleAriaId: subTextId,
                isBlocking: false,
                styles: { main: { maxWidth: 450 } },
            }),
            [labelId, subTextId],
        )

        const dialogContentProps = {
            type: DialogType.normal,
            title: title,
            closeButtonAriaLabel: '关闭',
        }

        return (
            <div style={{ position: 'fixed' }}>
                <FLDialog
                    hidden={!show}
                    onDismiss={onDismiss}
                    dialogContentProps={dialogContentProps}
                    modalProps={modalProps}
                >
                    {content || null}
                    <DialogFooter>
                        {footer || null}
                    </DialogFooter>
                </FLDialog>
            </div>
        )
    }

export { Dialog }