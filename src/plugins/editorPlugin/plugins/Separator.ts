export default class Separator {
    static get isReadOnlySupported(): true {
        return true;
    }

    static get contentless(): true {
        return true;
    }

    render(): HTMLDivElement {
        let div = document.createElement('div');
        div.classList.add('ce-separator');
        return div;
    }

    save(): {} {
        return {};
    }

    static get toolbox(): { title: string; icon: string } {
        return {
            title: 'Separator',
            icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="2" y1="12" x2="6" y2="12" stroke="black" stroke-width="2" stroke-linecap="round"/>
            <line x1="10" y1="12" x2="14" y2="12" stroke="black" stroke-width="2" stroke-linecap="round"/>
            <line x1="18" y1="12" x2="22" y2="12" stroke="black" stroke-width="2" stroke-linecap="round"/>
            </svg>`,
        };
    }
}
