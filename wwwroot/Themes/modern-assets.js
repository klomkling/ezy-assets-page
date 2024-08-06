"use strict";
(function () {
    function setCookie(name, value) {
        name = encodeURIComponent(name);
        if (value == null) {
            let date = new Date(1970, 0, 1, 0, 0, 0);
            document.cookie = name + `=;expires=${date.toUTCString()};path=/`;
            return;
        }
        let date = new Date();
        date.setFullYear(date.getFullYear() + 1);
        document.cookie = name + "=" + encodeURIComponent(value) +
            ";expires=" + date.toUTCString() + ";path=/";
    }
    document.addEventListener('DOMContentLoaded', function () {
        const languageMenus = document.querySelectorAll('.s-language-selection-menu');
        // @ts-ignore
        if (languageMenus.length && typeof Q != "undefined" && Q.getLookupAsync) {
            // @ts-ignore
            function languageClick(e) {
                let a = e.target.closest('[data-language]');
                if (!a)
                    return;
                setCookie("LanguagePreference", a.getAttribute('data-language'));
                // @ts-ignore
                window.location.reload(true);
            }
            languageMenus.forEach(function (menu) {
                menu.addEventListener('click', languageClick);
            });
            // @ts-ignore
            Q.getLookupAsync("Administration.Language").then(function (lookup) {
                for (let l of lookup.items) {
                    languageMenus.forEach(function (menu) {
                        let li = document.createElement('li');
                        let a = li.appendChild(document.createElement('a'));
                        a.classList.add('dropdown-item');
                        a.setAttribute('data-language', l.LanguageId);
                        a.setAttribute('href', 'javascript:;');
                        a.textContent = l.LanguageName;
                        menu.appendChild(li);
                    });
                }
            });
        }
        const desktopToggler = document.querySelector('.navbar-desktop-toggler');
        desktopToggler && desktopToggler.addEventListener('click', function (e) {
            var _a;
            document.body.classList.toggle('s-sidebar-icon');
            const state = document.body.classList.contains('s-sidebar-icon');
            (_a = document.querySelector('.s-sidebar')) === null || _a === void 0 ? void 0 : _a.classList.remove('active');
            const elements = document.querySelectorAll('#s-sidebar-menu .s-sidebar-item.has-children');
            Array.from(elements).forEach(el => {
                var _a, _b;
                let link = el.querySelector('.s-sidebar-link');
                if (el.classList.contains('active')) {
                    if (state) {
                        link === null || link === void 0 ? void 0 : link.removeAttribute("data-bs-toggle");
                    }
                    else {
                        link === null || link === void 0 ? void 0 : link.setAttribute("data-bs-toggle", "collapse");
                    }
                    return;
                }
                link === null || link === void 0 ? void 0 : link.setAttribute("aria-expanded", state ? "true" : "false");
                if (state) {
                    link === null || link === void 0 ? void 0 : link.removeAttribute("data-bs-toggle");
                    (_a = el.querySelector('.s-sidebar-menu')) === null || _a === void 0 ? void 0 : _a.classList.add('show');
                }
                else {
                    link === null || link === void 0 ? void 0 : link.setAttribute("data-bs-toggle", "collapse");
                    (_b = el.querySelector('.s-sidebar-menu')) === null || _b === void 0 ? void 0 : _b.classList.remove('show');
                }
            });
            document.removeEventListener('click', handleMobileClick);
            setCookie("icon-sidebar-enabled", document.body.classList.contains('s-sidebar-icon') ? "s-sidebar-icon" : "");
        });
        const sidebarElement = document.querySelector('.s-sidebar-pane');
        const mobileToggler = document.querySelector('.navbar-mobile-toggler');
        mobileToggler && mobileToggler.addEventListener('click', function (e) {
            const sidebar = document.querySelector('.s-sidebar');
            document.removeEventListener('click', handleMobileClick);
            document.addEventListener('click', handleMobileClick);
            sidebar.classList.toggle('active');
            const elements = document.querySelectorAll('#s-sidebar-menu .s-sidebar-item.has-children');
            Array.from(elements).forEach(el => {
                var _a;
                if (el.classList.contains('active')) {
                    return;
                }
                let link = el.querySelector('.s-sidebar-link');
                link === null || link === void 0 ? void 0 : link.setAttribute("aria-expanded", "false");
                (_a = el.querySelector('.s-sidebar-menu')) === null || _a === void 0 ? void 0 : _a.classList.remove('show');
            });
            setCookie("icon-sidebar-enabled", "");
        });
        function handleMobileClick(event) {
            var _a;
            const target = event.target;
            const button = target.closest('.navbar-mobile-toggler');
            const isClickInside = sidebarElement.contains(target);
            if (!isClickInside && button == null) {
                const isSidebarActive = (_a = sidebarElement.parentElement) === null || _a === void 0 ? void 0 : _a.classList.contains('active');
                if (isSidebarActive) {
                    mobileToggler.click();
                }
            }
        }
    });
})();
