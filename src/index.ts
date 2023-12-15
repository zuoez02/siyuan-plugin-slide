import { getFileID } from "./utils/utils"
import { Client } from "@siyuan-community/siyuan-sdk";

import "./index.scss";

import { Plugin, Dialog } from 'siyuan'
import { render } from './utils/render';
import { themes } from './utils/theme';
import { SettingUtils } from "./libs/setting-utils";

export default class CardPlugin extends Plugin {
    public el: HTMLElement
    public settingUtils;
    private sdk: Client;

    async onload() {
        //创建按钮
        this.addIcons(` <symbol id="iconSlide" viewBox="0 0 22 22"><path d="M13 17V20H18V22H6V20H11V17H4C3.44772 17 3 16.5523 3 16V4H2V2H22V4H21V16C21 16.5523 20.5523 17 20 17H13ZM5 15H19V4H5V15ZM10 6L15 9.5L10 13V6Z" ></path></symbol>`)
        this.addTopBar({
            icon: 'iconSlide',
            title: this.i18n.buttonTitle,
            callback: (e) => {
                this.openSlide();
            }
        });
        this.sdk = new Client();

        this.settingUtils = new SettingUtils(this)
        this.settingUtils.addItem({
            type: 'select',
            key: 'theme',
            value: 'white',
            title: this.i18n.config.theme.title,
            description: this.i18n.config.theme.description,
            options: {
                ...themes,
            }
        });
        this.settingUtils.addItem({
            type: 'select',
            key: 'controlsBackArrows',
            value: 'visible',
            title: this.i18n.config.controlsBackArrows.title,
            description: this.i18n.config.controlsBackArrows.description,
            options: {
                'visible': this.i18n.options.visible,
                'faded': this.i18n.options.faded,
                'hidden': this.i18n.options.hidden,
            }
        });

        this.settingUtils.addItem({
            type: 'select',
            key: 'controls',
            value: 'visible',
            title: this.i18n.config.controls.title,
            description: this.i18n.config.controls.description,
            options: {
                'visible': this.i18n.options.visible,
                'hidden': this.i18n.options.hidden,
            }
        });
        
        this.settingUtils.addItem({
            type: 'select',
            key: 'slideNumber',
            value: 'visible',
            title: this.i18n.config.slideNumber.title,
            description: this.i18n.config.slideNumber.description,
            options: {
                'visible': this.i18n.options.visible,
                'hidden': this.i18n.options.hidden,
            }
        });

        this.settingUtils.addItem({
            type: 'select',
            key: 'progress',
            value: 'visible',
            title: this.i18n.config.progress.title,
            description: this.i18n.config.progress.description,
            options: {
                'visible': this.i18n.options.visible,
                'hidden': this.i18n.options.hidden,
            }
        });

        this.settingUtils.addItem({
            type: 'select',
            key: 'keyboard',
            value: 'enable',
            title: this.i18n.config.keyboard.title,
            description: this.i18n.config.keyboard.description,
            options: {
                'enable': this.i18n.options.enable,
                'disable': this.i18n.options.disable,
            }
        });

        this.settingUtils.addItem({
            type: 'select',
            key: 'loop',
            value: 'disable',
            title: this.i18n.config.loop.title,
            description: this.i18n.config.loop.description,
            options: {
                'enable': this.i18n.options.enable,
                'disable': this.i18n.options.disable,
            }
        });

        this.settingUtils.addItem({
            type: 'select',
            key: 'autoplay',
            value: 'disable',
            title: this.i18n.config.autoplay.title,
            description: this.i18n.config.autoplay.description,
            options: {
                'enable': this.i18n.options.enable,
                'disable': this.i18n.options.disable,
            }
        });

        this.settingUtils.addItem({
            type: 'slider',
            key: 'autoSlide',
            value: 5,
            title: this.i18n.config.autoSlide.title,
            description: this.i18n.config.autoSlide.description,
            slider: {
                min: 1,
                max: 60,
                step: 1,
            },
        });

        

        this.settingUtils.load();
    }
    public async openSlide() {
        let dialog = new Dialog({ content: '<div id="slide-dialog" class="fn__flex fn__flex-1"></div>', width: '1280px', height: '720px', disableClose: false });
        let fileId = getFileID()
        let markdownText = await this.sdk.exportMdContent({ id: fileId });
        const options = this.settingUtils.dump();
        render(markdownText.data.content, dialog.element.querySelector('#slide-dialog'), options);
    }
}