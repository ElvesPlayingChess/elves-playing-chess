let prevComicImage = document.querySelector('#prev-comic-image');
let currentComicImage = document.querySelector('#current-comic-image');
let nextComicImage = document.querySelector('#next-comic-image');

const comicBlogArea = document.querySelector('#comic-blog-area');

const converter = new showdown.Converter();

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

const getHash = function() {
    const trueHash = location.hash;
    if (trueHash === '') {
        return "1";
    }
    return trueHash;
}

let currentHash = getHash();

loadImageToElement(currentHash, currentComicImage);

loadBlogToElement(currentHash, comicBlogArea);
