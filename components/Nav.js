import Component from './Component.js';
import store from '../store/index.js';
class Nav extends Component {
    constructor(target) {
        super({
            store,
            element: target,
        });
        this.setEvent();
    }

    render() {
        const { selectedCategory } = store.state;

        this.element.innerHTML = `
        <li id="all" class="category-item ${selectedCategory === 'all' ? 'active' : undefined}">전체보기</li>
        <li id="business" class="category-item ${selectedCategory === 'business' ? 'active' : undefined}">비즈니스</li>
        <li id="entertainment" class="category-item ${selectedCategory === 'entertainment' ? 'active' : undefined}">엔터테인먼트</li>
        <li id="health" class="category-item ${selectedCategory === 'health' ? 'active' : undefined}">건강</li>
        <li id="science" class="category-item ${selectedCategory === 'science' ? 'active' : undefined}">과학</li>
        <li id="sports" class="category-item ${selectedCategory === 'sports' ? 'active' : undefined}">스포츠</li>
        <li id="technology" class="category-item ${selectedCategory === 'technology' ? 'active' : undefined}">기술</li>
           
        `;
    }

    setEvent() {
        this.element.addEventListener('click', (e) => {
            e.preventDefault();
            if (e.target.tagName === 'LI') {
                if (e.target.id !== store.state.selectedCategory) {
                    store.dispatch('changeSelectCategory', e.target.id);
                }
            }
        });
    }
}

export default Nav;
