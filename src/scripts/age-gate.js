'use strict';

const baseUrl = window.location.origin;
const attemptedUrl = window.location.pathname;
const localEnvironment = baseUrl.indexOf('localhost') >= 0;

const validAge = localStorage.length > 0 && localStorage.validAge === 'true';

const enterButton = document.getElementById('bp-enter');
const backButton = document.getElementById('bp-back');

const acceptTerms = () => {
    localStorage.setItem('validAge', true);

    const forwardDelay = 100;

    setTimeout(() => {
        const pathIndex = window.location.search.indexOf('=');
        const forwardPath = window.location.search.slice(pathIndex + 1);
        window.location.href = `${baseUrl}/${forwardPath}`;
    }, forwardDelay);
};

if (enterButton) {
    enterButton.addEventListener('click', acceptTerms, false);
}

const navigateBack = () => {
    window.history.back();
};

if (backButton) {
    backButton.addEventListener('click', navigateBack, false);
}

document.addEventListener('DOMContentLoaded', () => {
    const allowedPages = [
        '/age-verification/',
        '/privacy/'
    ];

    if (localEnvironment) {
        return;
    }

    if (!validAge && allowedPages.indexOf(attemptedUrl) < 0) {
        window.location.replace(`${baseUrl}/age-verification/?path=${attemptedUrl.replace(/\//u, '')}`);
    }
});
