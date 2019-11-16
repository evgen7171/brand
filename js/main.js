// const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const API = 'db';

let app = new Vue({
    el: '#app',
    data: {
        showCart: false
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    // this.$refs.error.setError(error);
                    console.log(error)
                })
        },
        show_hide() {
            const target = event.target.parentElement;
            if (!target.getAttribute("open")) {
                document.querySelectorAll('.category-content').forEach(el => {
                    if (el.id !== target.id && el.id) {
                        el.removeAttribute("open");
                    }
                });
            }
        }
    },
    mounted() {
    }
});