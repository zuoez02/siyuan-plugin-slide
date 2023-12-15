import { Marpit, Element } from "@marp-team/marpit";
import { mark } from "@mdit/plugin-mark";
import { sup } from "@mdit/plugin-sup";
import { sub } from "@mdit/plugin-sub";
import { tasklist } from "@mdit/plugin-tasklist";
import { align } from "@mdit/plugin-align";
import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
import { ENABLE, VISIBLE } from "./constants";

export function render(markdownText: string, el: HTMLElement, options: any) {
  let html;
  const marp = new Marpit({
    markdown: {
      html: true,
    },
    container: [new Element("div", { class: 'reveal reveal-viewport' }), new Element("div", { class: 'slides' })]
  })
    .use(mark)
    .use(sup)
    .use(sub)
    .use(tasklist)
    .use(align);

  const setting = "";
  const iframe = document.createElement('iframe');

  iframe.setAttribute('class', 'fn__flex fn__flex-1');
  iframe.setAttribute('id', 'marp-slide');
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.overflow = 'hidden';
  iframe.style.border = '0';

  el.appendChild(iframe);

  const inDocument = iframe.contentDocument;
  const parent = inDocument.body as HTMLBodyElement;

  inDocument.addEventListener('click', () => {
    window.focus();
  })

  const res = marp.render(setting + markdownText);
  html = res.html;

  const dom = inDocument.createElement("div");
  dom.innerHTML = html;
  // dom.classList.add('reveal-viewport');
  parent.appendChild(dom);
  parent.style.margin = '0';

  const style = inDocument.createElement("link");
  style.setAttribute('rel', 'stylesheet');
  style.setAttribute('href', '/plugins/siyuan-plugin-slide/reveal.css');
  inDocument.head.appendChild(style);

  const theme = inDocument.createElement("link");
  theme.setAttribute('rel', 'stylesheet');
  theme.setAttribute('href', `/plugins/siyuan-plugin-slide/theme/${options.theme}.css`);
  inDocument.head.appendChild(theme);
  let autoSlide;
  if (options.autoplay === ENABLE) {
    autoSlide = (typeof options.autoSlide === 'number' ? options.autoSlide : parseInt(options.autoSlide, 10)) || 5,
    autoSlide *= 1000;
  } else {
    autoSlide = 0;
  }
  const config = {
    progress: options.progress === VISIBLE,
    controls: options.controls === VISIBLE,
    controlsLayout: 'bottom-right',
    controlsTutorial: false,
    controlsBackArrows: options.controlsBackArrows || VISIBLE,
    keyboard: options.keyboard === ENABLE,
    width: 1280,
    height: 720,
    center: false,
    slideNumber: options.slideNumber === VISIBLE,
    touch: true,
    autoSlide,
    loop: options.loop === ENABLE,
    embedded: false,
  };

  const root = parent.querySelector('.reveal');
  new (Reveal as any)(root, {
    plugins: [Markdown],
  }).initialize(config);
}