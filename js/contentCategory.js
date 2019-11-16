Vue.component('content-categories', {
    data() {
        return {
            categories: [],
            categoriesUrl: '/categories.json'
        }
    },
    mounted() {
        this.$parent.getJson(`${API + this.categoriesUrl}`)
            .then(data => {
                i = 1;
                for (let el of data) {
                    el.id_category = i;
                    this.categories.push(el);
                    i++;
                }
            });
    },
    template: `<div class="content-left">
                    <content-category
                        v-for="category of categories" 
                        :key="category.id_category"
                        :category="category">
                    </content-category>       
                </div>`
});

Vue.component('content-category', {
    props: ['category'],
    template: `<details :id="category.id_category" class="category-content" @click="$root.show_hide()" :open="category.open">
                    <summary class="category-content category-content__caption category-content__caption_style">
                        {{category.category_name}}
                    </summary>
                    <p class="category-content category-content__item" v-for="item of category.category_array">
                        <a href="#" class="category-content__link">{{item}}</a>
                    </p>
                </details>`
});
