Vue.component('filter-el', {
    props: ['products'],
    data() {
        return {
            count: this.$root.$refs.product
        }
    },
    methods: {
        printThis(a) {
            console.log(a);
        }
    },
    template: `
            <div class="filter">
                <div class="filter-block">
                    <a href="#" class="filter-button">Sort By</a>
                    <label for="name"></label>
                    <select name="filter" id="name" class="filter-select">
                        <option value="name" class="filter-select__item">Name</option>
                        <option value="price" class="filter-select__item">Price</option>
                    </select>
                </div>
                <div class="filter-block">
                    <button href="#" class="filter-button" @click="$root.$refs.filter.printThis(count)">Show</button>
<!--                    @click="$root.$refs.products.filterCount(4)"-->
                    <label for="filter"></label>
                    <select name="filter" id="filter" class="filter-select">
<!--                        <option v-for="n of count" value="09" class="filter-select__item">{{n}}</option>-->
<!--                        <option value="09" class="filter-select__item">09</option>-->
<!--                        <option value="01" class="filter-select__item">01</option>-->
<!--                        <option value="02" class="filter-select__item">02</option>-->
<!--                        <option value="03" class="filter-select__item">03</option>-->
<!--                        <option value="04" class="filter-select__item">04</option>-->
<!--                        <option value="05" class="filter-select__item">05</option>-->
<!--                        <option value="06" class="filter-select__item">06</option>-->
<!--                        <option value="07" class="filter-select__item">07</option>-->
<!--                        <option value="08" class="filter-select__item">08</option>-->
                    </select>
                </div>
            </div>`
});