import Slide from './slide.svelte';
import { getFileID } from "./utils/utils"
import { Client } from "@siyuan-community/siyuan-sdk";

const util = require('util');
console.log(util);

import "./index.scss";

import { Plugin, Dialog } from 'siyuan'
import { render } from './utils/render';

export default class CardPlugin extends Plugin {
    public el: HTMLElement
    public settingConfig
    private sdk: Client;

    async onload() {
        //创建按钮
        this.addIcons(` <symbol id="iconSlide" viewBox="0 0 22 22"><path d="M13 17V20H18V22H6V20H11V17H4C3.44772 17 3 16.5523 3 16V4H2V2H22V4H21V16C21 16.5523 20.5523 17 20 17H13ZM5 15H19V4H5V15ZM10 6L15 9.5L10 13V6Z" ></path></symbol>`)
        this.addTopBar({
            icon: 'iconSlide',
            title: '点击生成Slide',
            callback: (e) => {
                this.openSlide(e);
            }
        });
        this.sdk = new Client();
    }
    public async openSlide(event) {
        let dialog = new Dialog({ content: '<div id="slide-dialog"></div>' });
        let fileId = getFileID()
        let markdownText = await this.sdk.exportMdContent({ id: fileId });
        render(markdownText.data.content, dialog.element.querySelector('#slide-dialog'));
        // new Slide({
        //     target: dialog.element.querySelector("#slide-dialog") ?? document.createElement('div'),
        //     props: {
        //         markdownText: markdownText.data.content
        //     }
        // })
    }
}