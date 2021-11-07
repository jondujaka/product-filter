import { useRef } from 'react';
import SingleFilter from './singleFilter';
import PriceFilter from './priceFilter';

const Filters = ({ filters, onChange }) => {
    const filtersKeys = Object.keys(filters);

    const activeFilters = {};

    filtersKeys.forEach((key) => {
        activeFilters[key] = {
            filter: key,
            values: [],
        };
    });

    const handleFilterChange = (filter, values) => {
        activeFilters[filter].values = values;

        onChange(activeFilters);
    };

    return (
        <div className="filters-wrapper">
            <h2>Filter products</h2>
            <div className="filters">
                {filtersKeys.map((key) =>
                    key === 'price' ? (
                        'asd'
                    ) : (
                        <SingleFilter
                            key={key}
                            onChange={(val) => handleFilterChange(key, val)}
                            filter={filters[key]}
                        />
                    )
                )}
            </div>
        </div>
    );
};

export default Filters;
