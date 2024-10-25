export class ShadowElem extends HTMLElement {
    constructor(innerShadowHTML: string) {
        super();
        this.attachShadow({ mode: "open" });

        let shadow = this.shadowRoot;
        if(shadow) shadow.innerHTML = innerShadowHTML;
    }
}

export function ElementAsShadow(elem: HTMLElement): HTMLElement {
    return (new ShadowElem(elem.innerHTML)) as HTMLElement;
}

