Vue.component('cart', {
    data() {
        return {
            cartItems: [],
            imgCart: 'https://placehold.it/50x100',
            cartUrl: '/getBasket.json',
            showCart: false,
            sum: 0
        }
    },
    methods: {
        addProduct(product) {
            this.$parent.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result) {
                        let find = this.cartItems.find(el => el.id_product === product.id_product);
                        if (find) {
                            find.quantity++;
                        } else {
                            let prod = Object.assign({quantity: 1}, product);
                            this.cartItems.push(prod);
                        }
                        this.sum += product.price;
                    }
                })
        },
        remove(product) {
            this.$parent.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if (data.result) {
                        if (product.quantity > 1) {
                            product.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(product), 1);
                        }
                        this.sum -= product.price;
                    }
                })
        },
    },
    mounted() {
        this.$parent.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for (let el of data) {
                    this.cartItems.push(el);
                    this.sum += el.price * el.quantity;
                }
            });
    },
    template: `
         <div>
         <div class="cart" @click="showCart = !showCart">
            <div class="cart__count" v-if="cartItems.length">{{cartItems.length}}</div>
            </div>   
            <div class="drop-cart" v-show="showCart">
                <div class="cart-box">
                    <p v-if="!cartItems.length" class="cart-total">Cart is empty</p>
                
                    <cart-item 
                        v-for="product of cartItems"  
                        :key="product.id_product"
                        :img="imgCart"
                        :cart-item="product"
                        @remove="remove">
                    </cart-item>
                    
                    <div class="cart-total">
                        <div class="cart-total-text">TOTAL</div>
                        <div class="cart-total-price">$&nbsp;<span>{{sum}}</span></div>
                    </div>
                    <div class="cart-button-block">
                        <a href="checkout.html" class="cart-button cart-passive">Checkout</a>
                    </div>
                    <div class="cart-button-block">
                        <a href="shopping-cart.html" class="cart-button cart-active">Go to cart</a>
                    </div>
                </div>    
            </div>
         </div>`
});

Vue.component('cart-item', {
    data() {
        return {
            path: "img/cart-box/"
        }
    },
    props: ['cartItem'],
    template: `
            <div class="cart-product">
                <div class="cart-product-decript">
                    <a href="single-page.html">
                        <div class="cart-product-img"><img :src="path + cartItem.img" :alt="cartItem.img"></div>
                    </a>
                    <div class="cart-pos-text">
                        <a href="single-page.html" class="cart-product-name">
                            {{cartItem.product_name}}
                        </a>
                        <p class="cart-box-stars">
                            <span class="fas fa-star"></span>
                            <span class="fas fa-star"></span>
                            <span class="fas fa-star"></span>
                            <span class="fas fa-star"></span>
                            <span class="fas fa-star-half-alt"></span>
                        </p>
                        <p class="cart-box-pos">
                            {{cartItem.quantity}} <span class="cart-box-pos-x">&times;</span> $<span>
                            {{cartItem.price}}</span>
                        </p>
                    </div>
                </div>
                <a href="#" class="cart-box-delete" @click="$emit('remove', cartItem)">&times;</a>
                </a>
            </div>
`
});