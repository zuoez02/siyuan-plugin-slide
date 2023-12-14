import { Marpit, Element } from "@marp-team/marpit";
import { mark } from "@mdit/plugin-mark";
import { sup } from "@mdit/plugin-sup";
import { sub } from "@mdit/plugin-sub";
import { tasklist } from "@mdit/plugin-tasklist";
import { align } from "@mdit/plugin-align";

import { from } from "bespoke/lib/bespoke";
import keys from "../bespoke/bespoke-keys";
import * as scale from "bespoke-scale";
import * as voltaire from "../bespoke/voltaire";
import * as progress from "bespoke-backdrop";
import * as backdrop from "bespoke-progress";
import * as bullets from "bespoke-bullets";

export function render(markdownText: string, el: HTMLElement) {
    let html, css;
    const marp = new Marpit({
        markdown: {
            html: true,
        },
        slideContainer: new Element("section", { class: "slide" }),
    })
        .use(mark)
        .use(sup)
        .use(sub)
        .use(tasklist)
        .use(align);

    const theme = `
    /* @theme example */
    
    section {
      background-color: #369;
      color: #fff;
      font-size: 30px;
      padding: 40px;
    }
    
    h1,
    h2 {
      text-align: center;
      margin: 0;
    }
    
    h1 {
      color: #8cf;
    }
    `;
    marp.themeSet.default = marp.themeSet.add(theme);

    let root: HTMLElement;

    const setting = `
<!-- theme: example -->
---
`
    // const shadow = root.attachShadow({ mode: "open" });
    const iframe = document.createElement('iframe');

    iframe.setAttribute('class', 'fn__flex fn__flex-1');
    iframe.setAttribute('id', 'marp-slide');

    el.appendChild(iframe);

    const inDocument = iframe.contentDocument;

    const style = inDocument.createElement("style");
    const res = marp.render(setting + markdownText);
    html = res.html;
    css = res.css;
    style.textContent = css;
    inDocument.head.appendChild(style);
    const dom = inDocument.createElement("div");
    dom.innerHTML = html;
    inDocument.body.appendChild(dom);

    const styl = document.head.firstChild;
    const content = styl.textContent;
    const transformStyle = inDocument.createElement('style');
    transformStyle.textContent = content;
    inDocument.head.appendChild(transformStyle);


    const deck = from({ parent: dom, slides: "div.marpit section" }, [
        voltaire.default({ document: inDocument}),
        bullets.default("li"),
        keys({ document: inDocument }),
        scale.default("tranform"),
        progress.default(),
        backdrop.default(),
    ]);
}