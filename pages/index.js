import Head from 'next/head';
import Layout from '../components/layout';
import ProductBlock from '../components/productBlock';
import Filters from '../components/filters';
import Loader from '../components/loader';
import { getProducts, getFilters } from '../backend';
import useDebounce from '../hooks/useDebounce';
import { useEffect, useState, useRef } from 'react';

const Home = ({ data, filters }) => {
    const { items, hasNextPage } = data;

    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState(items);
    const [showNextPage, setShowNextPage] = useState(hasNextPage);
    const [activeFilters, setActiveFilters] = useState();

    const debouncedFilters = useDebounce(activeFilters, 500);

    const updateProducts = async () => {
        setLoading(true);
        const filteredProducts = await getProducts(
            currentPage,
            debouncedFilters
        );
        setProducts(filteredProducts.items);
        setShowNextPage(filteredProducts.hasNextPage);
        setLoading(false);
    };

    const filterData = (filters) => {
        setActiveFilters(filters);
    };

    useEffect(() => updateProducts(), [debouncedFilters, currentPage]);

    return (
        <Layout>
            <h1 className="title">Ask Phill</h1>
            <Filters filters={filters} onChange={filterData} />
            <div className="controls">
                <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage < 1}
                >
                    Previous page
                </button>
                <button
                    href="#"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={!showNextPage}
                >
                    Next Page
                </button>
            </div>
            <div className="products">
                {loading && <Loader />}
                {products &&
                    products.map((product) => (
                        <ProductBlock
                            key={simpleSlugify(product.node.name)}
                            product={product}
                        />
                    ))}
            </div>
        </Layout>
    );
};

const simpleSlugify = (string) => string.replace(/\s+/g, '-').toLowerCase();
export default Home;
export async function getStaticProps() {
    const data = await getProducts();
    const filters = await getFilters();

    return {
        props: {
            data,
            filters,
        },
    };
}
