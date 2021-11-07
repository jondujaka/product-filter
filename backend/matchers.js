export const matchColor = (product, targetColors) => {
    const productColors = product.node.colorFamily;

    if (!productColors || !productColors.length) {
        return false;
    }

    return productColors.some((color) => targetColors.includes(color.name));
};

export const matchPrice = (product, targetPrice) => {
    const price = parseFloat(
        product.node.shopifyProductEu.variants.edges[0].node.price
    );
    const targetLow = parseFloat(targetPrice[0]);
    const targetHigh = parseFloat(targetPrice[1]);

    if (!price) {
        return false;
    }

    if (!targetLow) {
        return targetPrice <= targetHigh;
    }
    if (!targetHigh) {
        return targetLow <= price;
    }

    return targetLow <= price && price <= targetHigh;
};

export const matchCategory = (product, targetCategories) => {
    const productCategories = product.node.categoryTags;

    if (!productCategories || !productCategories.length) {
        return false;
    }

    return productCategories.some((cat) => targetCategories.includes(cat));
};
