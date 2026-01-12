// ==UserScript==
// @name         精简版 IT 之家列表去广告
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  通过隐藏而非删除的方式屏蔽广告，确保页面布局不崩坏
// @author       Gemini
// @match        *://*.ithome.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const style = document.createElement('style');
    style.innerHTML = `
        ul.nl li:has(b.ad),
        ul.nl li:not(.n) {
            display: none !important;
        }
    `;
    document.head.appendChild(style);

    const hideAds = () => {
        const adIcons = document.querySelectorAll('li b.ad');
        adIcons.forEach(icon => {
            const li = icon.closest('li');
            if (li) li.style.setProperty('display', 'none', 'important');
        });
    };

    hideAds();
    const observer = new MutationObserver(hideAds);
    observer.observe(document.body, { childList: true, subtree: true });
})();
