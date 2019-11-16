Vue.component('products', {
    data() {
        return {
            filtered: [],
            products: [],
            catalogUrl: '/catalogData.json'
        }
    },
    mounted() {
        this.$parent.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    },
    methods: {
        filter(value) {
            let regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        },
        filterCount(count) {
            this.partOfProducts = [];
            for (let i = 0; i < count; i++) {
                this.partOfProducts.push(this.product[i]);
            }
        }
    },
    template: `
            <div class="content">
                <product 
                    v-for="product of filtered" 
                    :key="product.id_product"
                    :product="product">
                </product>
            </div>`
});


Vue.component('product', {
    data() {
        return {
            path: 'img/products/'
        }
    },
    props: ['product'],
    template: `
            <div class="product">
                <a href="single-page.html">
                    <img class="product-img" :src="path + product.img" alt="product">
                </a>
                <div class="product-text"><a href="#" class="product-name">{{ product.product_name }}</a>
                    <p class="product-price">$<span>{{ product.price }}</span></p>
                    <div class="product__add-like">
                        <button class="product__add product__add_style" href="shopping-cart.html" 
                        @click="$root.$refs.cart.addProduct(product)">
                            <img src="img/products/add-to-cart.svg" alt="add" >Add to cart
                        </button>
                        <a href="#" class="product__like-symbol">
                            <span class="fas fa-retweet"></span>
                        </a>
                        <a href="#" class="product__like-symbol">
                            <span class="far fa-heart"></span>
                        </a>
                    </div>
                </div>
            </div>`
});


//дубликат компоненты products
Vue.component('product-box', {
    data() {
        return {
            partOfProducts: [],
            catalogUrl: '/catalogData.json'
        }
    },
    mounted() {
        this.$parent.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let i = 0; i < 8; i++) {
                    if (data[i]) {
                        this.partOfProducts.push(data[i]);
                    }
                }
            });
    },
    template: `
            <div class="container product-flex">
                <product-in-box 
                    v-for="product of partOfProducts" 
                    :key="product.id_product"
                    :product="product">
                </product-in-box>
            </div>`
});


Vue.component('product-in-box', {
    data() {
        return {
            path: 'img/products/'
        }
    },
    props: ['product'],
    template: `
            <div class="product">
                <a href="single-page.html">
                    <img class="product-img" :src="path + product.img" :alt="product.product_name">
                </a>
                <div class="product-text">
                    <a href="single-page.html" class="product-name">{{ product.product_name }}</a>
                    <p class="product-price">$<span>{{ product.price }}</span></p>
                    <div class="product-add" @click="$root.$refs.cart.addProduct(product)">
                        <img src="img/products/add-to-cart.svg" alt="add" 
                        class="product-add__img">Add to cart
                    </div>
                </div>
            </div>`
});