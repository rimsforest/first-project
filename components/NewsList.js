import Component from './Component.js';
import store from '../store/index.js';
const API_KEY = '0055a434838544c5a05f51d0c1fe96ca';
const baseURL = 'https://newsapi.org/v2/top-headlines';
const country = 'kr';
export default class NewsList extends Component {
    isLoading = false;
    dataEmpty = false;

    newsList = [];
    page = 1;
    pageSize = 20;
    total = 0;
    io = null;

    constructor(target) {
        super({
            store,
            element: target,
        });
        this.io = new IntersectionObserver(
            ([{ isIntersecting }], observer) => {
                if (this.firstRender && this.newsList.length && isIntersecting && !this.dataEmpty) this.loadMore(observer);
            },
            { threshold: 0.5 }
        );
    }

    async getNewsList(observer) {
        const { selectedCategory } = store.state;
        const category = selectedCategory === 'all' ? '' : selectedCategory;
        try {
            const { page, pageSize } = this;
            const url = `${baseURL}?country=${country}&category=${category}&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;
            const response = await axios.get(url);
            const { articles, totalResults } = response.data;

            this.total = totalResults;
            this.newsList = this.newsList.concat(articles);
            if (this.total <= this.newsList.length) {
                this.dataEmpty = true;
                document.querySelector('.scroll-observer')?.remove();
                observer && observer.disconnect();
            }

            this.page = page + 1;
        } catch (e) {
            console.log(e);
        }
    }
    cards({ description, title, url, urlToImage }) {
        return `
        <section class="news-item">
        <div class="thumbnail">
          <a href=${url} target="_blank" rel="noopener noreferrer">
            <img
              src=${urlToImage}
              alt="thumbnail" />
          </a>
        </div>
        <div class="contents">
          <h2>
            <a href=${url} target="_blank" rel="noopener noreferrer">
              ${title}
            </a>
          </h2>
          <p>
            ${description}
          </p>
        </div>
      </section>
      `;
    }
    async loadMore(observer) {
        await this.getNewsList(observer);
        const newsWrapper = document.querySelector('.news-list');
        newsWrapper.innerHTML += `
            ${this.newsList
                ?.map(({ description, title, url, urlToImage }) => this.cards({ description, title, url, urlToImage }))
                .join('')}`;
    }
    async render() {
        this.newsList = [];
        await this.getNewsList();
        this.element.innerHTML = `
          <article class="news-list">
          ${this.newsList?.map(({ description, title, url, urlToImage }) => this.cards({ description, title, url, urlToImage })).join('')}
          </article>
          <div class="scroll-observer">
            <img src="img/ball-triangle.svg" alt="Loading..." />
          </div>`;
        if (!this.firstRender) {
            this.firstRender = true;
            this.io.observe(document.querySelector('.scroll-observer'));
        }
    }
}
