import { BlockToolData, OutputBlockData } from '@editorjs/editorjs';

export default class BVerseTool {
    data: object;
    static get toolbox() {
        return {
            title: 'Bible Verses',
            icon: '<svg width="17" height="15" viewBox="0 0 64 64" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"><polyline points="50.83 18.04 55.47 18.04 55.47 51.97 8.53 51.97 8.53 18.04 13.05 18.04" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/><path d="M49.83,47V12c-13.57.44-17.89,6-17.89,6s-5.44-6.23-17.88-6V47a44.38,44.38,0,0,1,17.88,5S41.8,47.33,49.83,47Z" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/><line x1="31.94" y1="18.04" x2="31.94" y2="51.97" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/></svg>',
        };
    }

    constructor({ data }: { data: object }) {
        this.data = data;
    }

    render() {
        const wrapper = document.createElement('div');
        const input = document.createElement('input');

        wrapper.classList.add('simple-image');
        wrapper.appendChild(input);

        input.placeholder = 'Set verses...';
        // @TODO: Mettre une condition pour cache l'input

        return wrapper;
    }

    save(blockContent) {
        const input = blockContent.querySelector('input');

        return {
            url: input.value,
        };
    }

    validate(savedData) {
        if (!savedData.url.trim()) {
            return false;
        }

        return true;
    }
}
