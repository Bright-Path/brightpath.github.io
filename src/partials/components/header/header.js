'use strict';

const menuButton = document.getElementById('bp-menu-toggle');
const openClass = 'bp-menu-visible';

const buttonSpan = document.getElementById('bp-menu-text');
const openText = 'Open site navigation';
const closeText = 'Close site navigation';

const toggleMenu = () => {
    const bodyClasses = document.body.classList;
    const bodyClassArray = Array.from(bodyClasses);
    const isMenuOpen = bodyClassArray.indexOf(openClass) >= 0;

    buttonSpan.innerText = isMenuOpen ? openText : closeText;
    bodyClasses.toggle(openClass);
};

if (menuButton) {
    menuButton.addEventListener('click', toggleMenu, false);
}
