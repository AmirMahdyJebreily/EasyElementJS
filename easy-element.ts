export function EasyElementInHTML(TagName: string, InnerHtml: string, shadowDOM: boolean, ...classList: string[]): void {
    class EasyElem extends HTMLElement {
        constructor() {
            super();
            if (shadowDOM) {
                this.attachShadow({ mode: "open" });
                let shadow = this.shadowRoot;
                if (shadow) shadow.innerHTML = InnerHtml;
            }
            else {
                this.innerHTML = InnerHtml;
            }

            classList?.forEach((c) => {
                this.classList.add(c);
            })
        }
    }
    customElements.define(TagName.toLowerCase(), EasyElem,);
}

export function EasyElement(TagName: string, ElementConstructor: () => typeof HTMLElement): void {
    customElements.define(TagName, ElementConstructor());
}
