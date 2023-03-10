export function make(
    tagName: string,
    classNames: string[] | string | null = null,
    attributes: { [key: string]: string } = {}
): Element {
    const el = document.createElement(tagName);

    if (Array.isArray(classNames)) {
        el.classList.add(...classNames);
    } else if (classNames) {
        el.classList.add(classNames);
    }

    for (const attrName in attributes) {
        // @ts-ignore
        el[attrName] = attributes[attrName];
    }
    return el;
}
