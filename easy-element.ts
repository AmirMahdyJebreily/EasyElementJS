export function EasyElement(TagName: string, elem: any): void {
    customElements.define(TagName.toLowerCase(), elem);
}

export function EasyElementInHTML(TagName: string, InnerHtml: string, shadowDOM: boolean = true, ...classList: string[]): void {
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

    EasyElement(TagName, EasyElem)
}

export function EasyElementInTemplate(TagName: string, SelectorQuery: string): void {
    class EasyElem extends HTMLElement {
        constructor() {
            super();
            let template = document.querySelector(`*[component="${SelectorQuery}"]`) ?? new Element();
            let templateContent = template.content;
      
            const shadowRoot = this.attachShadow({ mode: "open" });
            shadowRoot.appendChild(templateContent.cloneNode(true));
        }
    }

    EasyElement(TagName, EasyElem)
}

export function EasyElementToComponent(Component: string, shadowDOM: boolean = false): void {
    const comp = document.querySelector(`*[component="${Component}"]`) ?? new Element();
    comp.removeAttribute("component")
    if (!comp.hasAttribute("copy")) {
        comp.remove()
    }
    EasyElementInHTML(Component, comp.outerHTML ?? "", shadowDOM)
}
