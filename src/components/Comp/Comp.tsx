import React from "react"

class Comp {
    #key: string | number = ''
    #className: string = ''
    #children: JSX.Element[] = []
    #attrs = {}
    constructor(key: string | number = '') {
        this.#key = key
    }
    done() {
        return (
            <div key={this.#key}
                className={this.#className}
                {...this.#attrs}>
                {this.#children}
            </div>
        )
    }
    key(key: string | number) {
        this.#key = key
    }
    className(className: string | string[]) {
        if (typeof className === 'string') {
            this.#className += ' ' + className
            return this
        } else {
            this.#className += ' ' + className.join(' ')
            return this
        }
    }
    children(JsxEle: JSX.Element | JSX.Element[]) {
        if (JsxEle instanceof Array) {
            this.#children = [...this.#children, ...JsxEle]
            return this
        } else {
            this.#children.push(JsxEle)
            return this
        }
    }
    attrs(attrObj: {}) {
        this.#attrs = { ...this.#attrs, attrObj }
    }
}

export default Comp