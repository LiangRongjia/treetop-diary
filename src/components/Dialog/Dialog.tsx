import React, { useMemo } from "react"

import { Dialog as FLDialog, DialogType, DialogFooter } from "@fluentui/react"

import { useId } from '@fluentui/react-hooks'

class Dialog {
    #key: string = ''
    #content: JSX.Element[] = []
    #footer: JSX.Element[] = []
    #show: boolean = true
    #title: string = '对话框'
    #onDismiss: () => void = () => { }

    constructor(key: string = '') {
        this.#key = key
    }
    title(text: string) {
        this.#title = text
        return this
    }
    content(...eles: JSX.Element[]) {
        this.#content = this.#content.concat(eles)
        return this
    }
    footer(...eles: JSX.Element[]) {
        this.#footer = this.#footer.concat(eles)
        return this

    }
    show(bool: boolean) {
        this.#show = bool
        return this
    }
    onDismiss(callback: () => void) {
        this.#onDismiss = callback
        return this
    }
    done() {
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
            title: this.#title,
            closeButtonAriaLabel: '关闭',
        }

        return (
            <div key={this.#key} style={{ position: 'fixed' }}>
                <FLDialog
                    hidden={!this.#show}
                    onDismiss={this.#onDismiss}
                    dialogContentProps={dialogContentProps}
                    modalProps={modalProps}
                >
                    {this.#content.length <= 1
                        ? this.#content[0]
                        : this.#content}
                    <DialogFooter>
                        {this.#footer.length <= 1
                            ? this.#footer[0]
                            : this.#footer
                        }
                    </DialogFooter>
                </FLDialog>
            </div>
        )
    }
}

export default Dialog