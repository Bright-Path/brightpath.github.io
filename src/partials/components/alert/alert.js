'use strict';

const messageDismissed = sessionStorage.length > 0 && sessionStorage.dismissAlert === 'true';

const closeButton = document.getElementById('bp-alert-close');
const alertBanner = document.getElementById('bp-alert');

const removeClass = () => {
    document.body.className = 'bp';
    alertBanner.remove();
};

const dismissAlert = () => {
    sessionStorage.setItem('dismissAlert', true);
    document.body.className += ' bp-alert-hide';

    const delay = 330;
    setTimeout(() => {
        removeClass();
    }, delay);
};

if (closeButton) {
    closeButton.addEventListener('click', dismissAlert, false);
}

document.addEventListener('DOMContentLoaded', () => {
    if (messageDismissed) {
        removeClass();
    }
});
