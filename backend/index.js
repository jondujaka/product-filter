const data = require('../data/data.json').data.allContentfulProductPage.edges;
import { matchCategory, matchColor, matchPrice } from './matchers';
const PER_PAGE = 10;

function getProducts(currentPage = 1, filters) {
    // Returning a promise to "mock" a server response
    return new Promise((resolve, reject) => {
        let result = [];
        let hasNextPage = false;

        let filterActive = false;

        // Making sure there's filters before continuing
        if (filters) {
            Object.keys(filters).forEach((key) => {
                if (filters[key].values.length) {
                    filterActive = true;
                }
            });
        }

        // If there's no filters active, we return the unfiltered products,
        // sliced based on the current page
        if (!filterActive) {
            setTimeout(
                () =>
                    resolve({
                        items: data.slice(
                            currentPage * PER_PAGE,
                            (currentPage + 1) * PER_PAGE
                        ),
                        hasNextPage: data.length > currentPage * PER_PAGE,
                    }),
                600
            );
            return;
        }

        const filterOpts = [
            {
                name: 'color',
                needle: filters.colors.values,
                active: filters.colors.values.length,
                matcher: matchColor,
            },
            {
                name: 'price',
                needle: filters.price.values,
                active: filters.price.values.length,
                matcher: matchPrice,
            },
            {
                name: 'category',
                needle: filters.categories.values,
                active: filters.categories.values.length,
                matcher: matchCategory,
            },
        ];

        let matchIndex = 0;
        for (let i = 0; i < data.length; i++) {
            if (!data[i].node.colorFamily) {
                continue;
            }

            // A product is a "match" only if it matches every filter
            // So we go through every filter, and call its matcher function
            let match = filterOpts.every((filter) => {
                if (!filter.active) {
                    return true;
                }
                return filter.matcher(data[i], filter.needle);
            });

            if (match) {
                // We go 1 over the PER_PAGE limit to check if there's more products.
                // We don't return this extra product, but just set hasNextPage to true
                // so that we know in the front-end
                if (result.length === PER_PAGE) {
                    hasNextPage = true;
                    break;
                }

                if (matchIndex >= currentPage * PER_PAGE) {
                    result.push(data[i]);
                }
                matchIndex++;
            }
        }

        setTimeout(() => resolve({ hasNextPage, items: result }), 600);
    });
}

// Goes through all the procuts and constructs
// the filters with all the available options

const getFilters = () => {
    let filters = {
        colors: {
            name: 'Color',
            slug: 'colors',
            options: [],
        },
        categories: {
            name: 'Categories',
            slug: 'categories',
            options: [],
        },
        price: {
            name: 'Price',
            slug: 'price',
            options: [null, null],
        },
    };

    for (let i = 0; i < data.length; i++) {
        const product = data[i].node;
        const price = parseFloat(
            product.shopifyProductEu.variants.edges[0].node.price
        );
        const categories = product.categoryTags;
        const colors = product.colorFamily;
        let priceMin = filters.price.options[0];
        let priceMax = filters.price.options[1];

        if (price) {
            if (price > priceMax || !priceMax) {
                priceMax = price;
            }
            if (price < priceMin || !priceMin) {
                priceMin = price;
            }
            filters.price.options = [priceMin, priceMax];
        }

        if (categories && categories.length) {
            categories.forEach((cat) =>
                pushUnique(filters.categories.options, cat)
            );
        }

        if (colors && colors.length) {
            colors.forEach((color) =>
                pushUnique(filters.colors.options, color.name)
            );
        }
    }
    return filters;
};

const pushUnique = (arr, item) => {
    if (!arr.includes(item)) {
        arr.push(item);
    }
};
export { getProducts, getFilters };
