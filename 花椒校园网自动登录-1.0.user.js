// ==UserScript==
// @name         花椒校园网自动登录
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  自动填充校园网账号密码，先模拟鼠标点击，防反爬，选择运营商并自动登录
// @match        http://172.16.2.100/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 替换成你的账号
    const USERNAME = 'username';
    // 替换成你的密码
    const PASSWORD = 'password';
    // 运营商选项值 '@cmcc' '@unicom' '@telecom'
    const OPERATOR = '@telecom';

    // 触发键盘事件
    function triggerKeyEvent(element, type, key) {
        const event = new KeyboardEvent(type, {
            key: key,
            code: 'Key' + key.toUpperCase(),
            charCode: key.charCodeAt(0),
            keyCode: key.charCodeAt(0),
            bubbles: true,
            cancelable: true,
            composed: true
        });
        element.dispatchEvent(event);
    }

    // 模拟逐字输入
    async function simulateRealTyping(element, text, delay = 100) {
        element.focus();
        element.value = '';

        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            triggerKeyEvent(element, 'keydown', char);
            triggerKeyEvent(element, 'keypress', char);

            element.value += char;

            element.dispatchEvent(new Event('input', { bubbles: true }));
            element.dispatchEvent(new Event('change', { bubbles: true }));

            triggerKeyEvent(element, 'keyup', char);

            await new Promise(r => setTimeout(r, delay));
        }
        element.blur();
    }

    // 模拟鼠标点击事件
    function simulateClick(element) {
        ['mousedown', 'mouseup', 'click'].forEach(type => {
            const event = new MouseEvent(type, {
                view: window,
                bubbles: true,
                cancelable: true,
                composed: true
            });
            element.dispatchEvent(event);
        });
    }

    window.addEventListener('load', async function() {
        const loginBox = document.querySelector('div.edit_loginBox');
        if (!loginBox) return;

        const userInput = loginBox.querySelector('input[name="DDDDD"]');
        const passInput = loginBox.querySelector('input[name="upass"]');
        const operatorSelect = document.querySelector('select[name="ISP_select"]');
        const loginBtn = loginBox.querySelector('input[name="0MKKey"]');

        if (userInput && passInput && operatorSelect && loginBtn) {
            try {
                // 模拟点击账号输入框两次
                simulateClick(userInput);
                await new Promise(r => setTimeout(r, 150));
                simulateClick(userInput);
                await new Promise(r => setTimeout(r, 150));

                // 逐字输入账号密码
                await simulateRealTyping(userInput, USERNAME, 120);
                await simulateRealTyping(passInput, PASSWORD, 120);

                // 选择运营商并派发change事件
                operatorSelect.value = OPERATOR;
                operatorSelect.dispatchEvent(new Event('change', { bubbles: true }));

                // 延迟点击登录按钮
                setTimeout(() => {
                    loginBtn.click();
                }, 500);
            } catch (e) {
                console.error('自动登录脚本执行错误:', e);
            }
        } else {
            console.warn('未找到登录表单的所有必要元素');
        }
    });
})();
