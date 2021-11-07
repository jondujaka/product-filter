const ProductBlock = ({ product }) => {
    const productInfo = product.node;
    const { price } = productInfo.shopifyProductEu.variants.edges[0].node;
    const color = productInfo.colorFamily
        ? productInfo.colorFamily[0].name
        : '';

    const categories = productInfo.categoryTags;
    return (
        <div className="product-block">
            <img src={productInfo.thumbnailImage.file.url} />
            <h3>{productInfo.name}</h3>
            <h4> &euro;{price}</h4>
            {categories && categories.map((cat) => ` ${cat},`)}
        </div>
    );
};

export default ProductBlock;
