import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const SingleFilter = ({ filter, onChange }) => {
    const parsedOptions = filter.options.map((opt) => ({
        value: opt,
        label: opt,
    }));

    const innerOnChange = (options) =>
        onChange(options.map((option) => option.value));

    return (
        <div className="single-filter">
            <h5>{filter.name}</h5>

            <Select
                onChange={innerOnChange}
                instanceId={filter.slug}
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={parsedOptions}
            />
        </div>
    );
};

export default SingleFilter;
