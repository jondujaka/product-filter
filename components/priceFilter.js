import Select from 'react-select';
import { Range, getTrackBackground } from 'react-range';
import { useEffect, useState } from 'react';

const PriceFilter = ({ filter, onChange }) => {
    const MIN = filter.options[0];
    const MAX = filter.options[1];
    const STEP = 1;

    const initRun = useRef(true);
    const [values, setValues] = useState([MIN, MAX]);

    useEffect(() => {
        if (!initRun.current) {
            onChange(values);
        }
        initRun.current = true;
    }, [values]);

    return (
        <div className="single-filter">
            <h5>{filter.name}</h5>
            <Range
                values={values}
                step={STEP}
                min={MIN}
                max={MAX}
                onChange={(values) => setValues(values)}
                renderTrack={({ props, children }) => (
                    <div
                        onMouseDown={props.onMouseDown}
                        onTouchStart={props.onTouchStart}
                        className="price-range-track-wrapper"
                    >
                        <div
                            ref={props.ref}
                            className="price-range-track"
                            style={{
                                background: getTrackBackground({
                                    values,
                                    colors: ['grey', '#548BF4', '#ccc'],
                                    min: MIN,
                                    max: MAX,
                                }),
                            }}
                        >
                            {children}
                        </div>
                    </div>
                )}
                renderThumb={({ index, props, isDragged }) => (
                    <div {...props} className="price-range-thumb-wrapper">
                        <div className="price-range-thumb-label">
                            &euro;{values[index].toFixed(1)}
                        </div>
                        <div
                            className="price-range-thumb-dash"
                            style={{
                                backgroundColor: isDragged ? '#548BF4' : 'grey',
                            }}
                        />
                    </div>
                )}
            />
        </div>
    );
};

export default PriceFilter;
