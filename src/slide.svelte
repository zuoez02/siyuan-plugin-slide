<script lang="ts">
  import { Marpit, Element } from "@marp-team/marpit";
  import { mark } from "@mdit/plugin-mark";
  import { sup } from "@mdit/plugin-sup";
  import { sub } from "@mdit/plugin-sub";
  import { tasklist } from "@mdit/plugin-tasklist";
  import { align } from "@mdit/plugin-align";
  import { onMount } from "svelte";

  import { from } from "bespoke/lib/bespoke";
  import * as keys from "bespoke-keys";
  import * as scale from "bespoke-scale";
  import * as voltaire from "bespoke-theme-voltaire";
  import * as progress from "bespoke-backdrop";
  import * as backdrop from "bespoke-progress";
  import * as bullets from "bespoke-bullets";

  import slideCss from './index.scss?inline';
  // import { themes } from "./utils/theme";
  let full = false;

  let css = "";

  let html = "";

  export let markdownText: string;

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

  onMount(() => {
    const setting = `
<!-- theme: example -->
---
`
    // const shadow = root.attachShadow({ mode: "open" });
    const shadow = document.createElement();
    const style = document.createElement("style");
    const res = marp.render(setting + markdownText);
    html = res.html;
    css = res.css;
    style.textContent = css.replace("div.marpit>section", "div.marpit section");
    document.head.appendChild(style);
    const dom = document.createElement("div");
    dom.innerHTML = html;
    shadow.appendChild(dom);

    shadow.querySelectorAll("section").forEach((section, $i) => {
      section.addEventListener("click", () => {
        const { height } = root.getBoundingClientRect();
        root.scrollTo({
          top: ($i + 1) * height,
        });
      });
    });

    const deck = from({ parent: dom, slides: "div.marpit section" }, [
      voltaire.default(),
      bullets.default("li .bullet"),
      // bullets.default("noThing"),
      keys.default(),
      scale.default("tranform"),
      progress.default(),
      backdrop.default(),
    ]);
  });

  function fullScreen() {
    root.requestFullscreen();
    full = true;

    root.onfullscreenchange = () => {
      if (full === true) {
        let bodyHeight = document.body.clientHeight;
        let bodyWidth = document.body.clientWidth;
        let zoomScale = Math.min(bodyWidth / 740, bodyHeight / 420);
        console.log(bodyHeight, bodyWidth, zoomScale);
        root.style.cssText = `zoom:${zoomScale}`;
        full = false;
        return;
      }
      root.style.cssText = "";
    };
  }
</script>

<div id="marp-slide" bind:this={root}></div>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="bespoke-marp-osc" on:click={fullScreen}>fullscreen</div>
