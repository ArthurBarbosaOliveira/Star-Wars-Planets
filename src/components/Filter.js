import React, { useContext, useState } from 'react';
import Context from '../context/Context';

function Filter() {
  const { filterByName, filterName, filterNumeric } = useContext(Context);

  const filters = {
    columns: [
      'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
    ],
    comparison: ['maior que', 'menor que', 'igual a'],
  };

  const [columnFilters, setColumnFilters] = useState(filters.columns);
  const [numericFilter, setNumericFilter] = useState(
    { column: 'population',
      comparison: 'maior que',
      value: 0,
    },
  );

  const handleChange = ({ target: { name, value } }) => {
    setNumericFilter({ ...numericFilter, [name]: value });
  };

  const handleSubmit = () => {
    filterNumeric(numericFilter);
    setColumnFilters(columnFilters.filter((filter) => filter !== numericFilter.column));
    setNumericFilter({ ...numericFilter, column: columnFilters[1] });
  };

  return (
    <>
      <div>
        <input
          data-testid="name-filter"
          type="text"
          value={ filterByName }
          onChange={ (event) => filterName(event.target.value) }
        />
      </div>
      <div>
        <select
          disabled={ columnFilters.length === 0 }
          name="column"
          value={ numericFilter.column }
          data-testid="column-filter"
          onChange={ handleChange }
        >
          { columnFilters.map((column, index) => (
            <option key={ index } value={ column }>
              {column}
            </option>
          ))}
        </select>
        <select
          onChange={ handleChange }
          name="comparison"
          data-testid="comparison-filter"
          value={ numericFilter.comparison }
        >
          {
            filters.comparison.map((comparison, index) => (
              <option key={ index } value={ comparison }>
                {comparison}
              </option>
            ))
          }
        </select>
        <input
          type="number"
          onChange={ handleChange }
          name="value"
          value={ numericFilter.value }
          data-testid="value-filter"
        />
        <button
          onClick={ handleSubmit }
          data-testid="button-filter"
          type="button"
        >
          FILTRAR
        </button>
      </div>
    </>
  );
}

export default Filter;
