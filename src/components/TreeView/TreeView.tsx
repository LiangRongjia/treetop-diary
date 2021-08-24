import React from "react"
import styles from "./TreeView.module.css"

class TreeItem {
    #key: string = ''
    #children: TreeItem[] = []
    #content: string = ''
    #active: boolean = false
    #onClick: () => void = () => { }
    constructor(key: string = '') {
        this.#key = key
    }
    key(key: string = '') {
        this.#key = key
        return this
    }
    child(setter: (item: TreeItem) => TreeItem) {
        this.#children.push(setter(new TreeItem()))
        return this
    }
    content(text: string) {
        this.#content = text
        return this
    }
    active(bool: boolean) {
        this.#active = bool
        return this
    }
    onClick(callback: () => void = () => { }) {
        this.#onClick = callback
        return this
    }
    toJsxElement() {
        return (
            <div key={this.#key} className={styles.tree_item}>
                <div className={styles.content}
                    data-active={this.#active ? 'true' : ''}
                    onClick={this.#onClick}>
                    {this.#content}
                </div>
                <div className={styles.children}>
                    {this.#children.map(item => item.toJsxElement())}
                </div>
            </div>
        )
    }
    forEach<T>(arr: T[]) {
        const _this = this
        return ({
            do: (callbackfn: (thisTreeItem: TreeItem, value: T, index: number, arr: T[]) => void) => {
                arr.forEach((item, index, arr) => callbackfn(this, item, index, arr))
                return _this
            }
        })
    }
}

class TreeView {
    #key: string = ''
    #className: string = ''
    #title: string = ''
    #children: TreeItem[] = []
    constructor(key: string = '') {
        this.#key = key
    }
    className(name: string) {
        this.#className = name
        return this
    }
    content(text: string) {
        this.#title = text
        return this
    }
    addItem(setter: (item: TreeItem) => TreeItem) {
        this.#children.push(setter(new TreeItem()))
        return this
    }
    forEach<T>(arr: T[]) {
        const _this = this
        return ({
            do: (callbackfn: (thisTreeItem: TreeView, value: T, index: number, arr: T[]) => void) => {
                arr.forEach((item, index, arr) => callbackfn(this, item, index, arr))
                return _this
            }
        })
    }
    done() {
        return (
            <div key={this.#key} className={`${styles.tree_view} ${this.#className}`}>
                <div>{this.#title}</div>
                <div className={styles.tree_items}>
                    {this.#children.map(item => item.toJsxElement())}
                </div>
            </div>
        )
    }
}

export { TreeView, TreeItem }