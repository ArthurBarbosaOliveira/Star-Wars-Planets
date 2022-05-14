import React, { useContext, useState } from 'react';
import Context from '../context/Context';

function Filter() {
  const { filterByName, filterName, filterNumero } = useContext(Context);
  const [numeroFilter, setNumeroFilter] = useState(
    { column: 'population',
      comparison: 'maior que',
      value: 0,
    },
  );

  const filtros = {
    columns: [
      'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
    ],
    comparison: ['maior que', 'menor que', 'igual a'],
  };

  const handleChange = ({ target: { name, value } }) => setNumeroFilter(
    { ...numeroFilter, [name]: value },
  );

  return (
    <>
      <div>
        <input
          data-testid="name-filter"
          onChange={ (event) => filterName(event.target.value) }
          type="text"
          value={ filterByName }
        />
      </div>
      <div>
        <select
          data-testid="column-filter"
          onChange={ handleChange }
          value={ numeroFilter.column }
          name="column"
        >
          {
            filtros.columns.map((column, index) => (
              <option key={ index } value={ column }>
                {column}
              </option>
            ))
          }
        </select>
        <select
          data-testid="comparison-filter"
          onChange={ handleChange }
          value={ numeroFilter.comparison }
          name="comparison"
        >
          {
            filtros.comparison.map((comparison, index) => (
              <option key={ index } value={ comparison }>
                {comparison}
              </option>
            ))
          }
        </select>
        <input
          data-testid="value-filter"
          onChange={ handleChange }
          type="number"
          value={ numeroFilter.value }
          name="value"
        />
        <button
          onClick={ () => filterNumero(numeroFilter) }
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
