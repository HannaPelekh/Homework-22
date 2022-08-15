import "./footer.css"
export class FooterView {
    static CLASSES = {    
        footer: "footer_container",
    }
    #container = null;
    constructor (container){
        this.#container = container;
    }    
    createFooterElement() {
        return `
            <div class="${FooterView.CLASSES.footer}">
                This is footer
            </div>`        
    }
}