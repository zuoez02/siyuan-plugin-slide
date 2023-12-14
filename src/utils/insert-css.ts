const inserted = {};

export default function (css: string, options?: { prepend: boolean; document: Document }) {
    const doc = options?.document || document;
    if (inserted[css]) return;
    inserted[css] = true;

    const elem = doc.createElement('style');
    elem.setAttribute('type', 'text/css');

    if ('textContent' in elem) {
        elem.textContent = css;
    } else {
        (elem as any).styleSheet.cssText = css;
    }

    var head = doc.getElementsByTagName('head')[0];
    if (options && options.prepend) {
        head.insertBefore(elem, head.childNodes[0]);
    } else {
        head.appendChild(elem);
    }
};