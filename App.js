import { Nav, NewsList } from './components/index.js';

const rootContainer = document.querySelector('#root');
rootContainer.innerHTML += `<nav class="category-list"><ul></ul></nav>`;
rootContainer.innerHTML += `<div class="news-list-container"></div>`;

const NavInstance = new Nav(document.querySelector('.category-list > ul'));
const NewsListInstance = new NewsList(document.querySelector('.news-list-container'));

NavInstance.render();
NewsListInstance.render();
