'use strict';

const baseUrl = window.location.origin;
const attemptedUrl = window.location.pathname;
const localEnvironment = baseUrl.indexOf('localhost');

const validAge = document.cookie.indexOf('validAge=true') >= 0;

const enterButton = document.getElementById('bp-enter');
const backButton = document.getElementById('bp-back');

const defaultCookieLength = 60;

const setCookie = (cookieName, cookieValue, expirationDays = defaultCookieLength) => {
    const cookieDomain = localEnvironment ? '' : `domain=${baseUrl};`;
    const date = new Date();
    const hoursPerDay = 24;
    const minutesPerHour = 60;
    const secondsPerMinute = 60;
    const milliPerSecond = 1000;
    const expiration = expirationDays * hoursPerDay * minutesPerHour * secondsPerMinute * milliPerSecond;
    date.setTime(date.getTime() + expiration);

    const expires = `expires=${date.toUTCString()}`;

    document.cookie = `${cookieName}=${cookieValue}; ${expires}; ${cookieDomain}`;
};

const acceptTerms = () => {
    if (!localEnvironment) {
        document.cookie = setCookie('validAge', true, defaultCookieLength);
    }

    const forwardDelay = 150;

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
