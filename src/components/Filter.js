import React, { useContext, useState } from 'react';
import Context from '../context/Context';

function Filter() {
  const { filterByName, filterName, filterNumeric } = useContext(Context);
  const [numericFilter, setNumericFilter] = useState(
    { column: 'population',
      comparison: 'maior que',
      value: 0,
    },
  );

  const filters = {
    columns: [
      'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
    ],
    comparison: ['maior que', 'menor que', 'igual a'],
  };

  const handleChange = ({ target: { name, value } }) => setNumericFilter(
    { ...numericFilter, [name]: value },
  );

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
          data-testid="column-filter"
          name="column"
          value={ numericFilter.column }
          onChange={ handleChange }
        >
          {
            filters.columns.map((column, index) => (
              <option key={ index } value={ column }>
                {column}
              </option>
            ))
          }
        </select>
        <select
          data-testid="comparison-filter"
          name="comparison"
          value={ numericFilter.comparison }
          onChange={ handleChange }
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
          data-testid="value-filter"
          type="number"
          name="value"
          value={ numericFilter.value }
          onChange={ handleChange }
        />
        <button
          data-testid="button-filter"
          type="button"
          onClick={ () => filterNumeric(numericFilter) }
        >
          FILTRAR
        </button>
      </div>
    </>
  );
}

export default Filter;
