let prevComicImage = document.querySelector('#prev-comic-image');
let currentComicImage = document.querySelector('#current-comic-image');
let nextComicImage = document.querySelector('#next-comic-image');

const navBarUpperPrev = document.querySelector('#nav-upper-prev');
const navBarLowerPrev = document.querySelector('#nav-lower-prev');
const navBarUpperNext = document.querySelector('#nav-upper-next');
const navBarLowerNext = document.querySelector('#nav-lower-next');

let prevBlogHTML = {};
let comicBlogArea = document.querySelector('#comic-blog-area');
let nextBlogHTML = {};

const converter = new showdown.Converter();

const num_comics = 2;
let current_index = num_comics;

const getHash = function() {
    const trueHash = location.hash;
    if (trueHash === '') {
        return `${num_comics}`;
    }
    return trueHash.slice(1);
}

const isIntegerString = function(s) {
    return (!isNaN(s) && Number.isInteger(Number(s)));
}

const getIndex = function(i) {
    const hash = getHash();
    if (isIntegerString(hash)) {
        return Number(hash);
    } else {
        return i;
    }
}

current_index = getIndex(current_index);

const loadBlogToElement = function(n, element) {
    const client = new XMLHttpRequest();
    client.open('GET', 'blogs/' + n + '.md');
    client.onreadystatechange = function() {
        element.innerHTML = converter.makeHtml(client.responseText);
    }
    client.send();
}

const loadImageToElement = function(n, element) {
    element.src = 'comics/' + n + '.png';
    const client = new XMLHttpRequest();
    client.open('GET', 'comics/caption_' + n + '.txt');
    client.onreadystatechange = function() {
        element.title = client.responseText;
        element.setAttribute('title', client.responseText);
    }
    client.send();
}

const isInRange = function(i) {
    return ((i > 0) && (i <= num_comics));
}

const attemptLoadingCurrent = function(index) {
    loadImageToElement(index, currentComicImage);
    loadBlogToElement(index, comicBlogArea);
}

const attemptLoadingPrev = function(index) {
    loadImageToElement(index, prevComicImage);
    loadBlogToElement(index, prevBlogHTML);
}

const attemptLoadingNext = function(index) {
    loadImageToElement(index, nextComicImage);
    loadBlogToElement(index, nextBlogHTML);
}

const attemptLoading = function() {
    if (isInRange(current_index)) {
        attemptLoadingCurrent(current_index);
    }
    if (isInRange(current_index - 1)) {
        attemptLoadingPrev(current_index - 1);
    }
    if (isInRange(current_index + 1)) {
        attemptLoadingNext(current_index + 1);
    }
}

const updateDisplay = function() {
    window.location.hash = current_index;
    attemptLoading();
}

const prevButtonClick = function(e) {
    if (current_index <= 1) {
        return;
    }
    current_index -= 1;
    updateDisplay();
}

const nextButtonClick = function(e) {
    if (current_index >= num_comics) {
        return;
    }
    current_index += 1;
    updateDisplay();
}

navBarUpperPrev.addEventListener("click", prevButtonClick);
navBarLowerPrev.addEventListener("click", prevButtonClick);

navBarUpperNext.addEventListener("click", nextButtonClick);
navBarLowerNext.addEventListener("click", nextButtonClick);

attemptLoading();
