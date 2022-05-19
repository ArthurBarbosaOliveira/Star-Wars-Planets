import React, { useContext, useState } from 'react';
import Context from '../context/Context';

function Filter() {
  const {
    filterByName, filterName, filterNumeric, filterByNumericValues,
    removeFilter, removeAllFilters, filterOrder,
  } = useContext(Context);

  const filters = {
    columns: [
      'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
    ],
    comparison: ['maior que', 'menor que', 'igual a'],
  };

  const [order, setOrder] = useState(
    { colum: 'population', sort: 'ASC', active: false },
  );

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

  const handleRemove = ({ target: { id } }) => {
    const activeFilters = filterByNumericValues.filter(({ column }) => column !== id);

    if (activeFilters.length === 0) {
      setColumnFilters(filters.columns);
    } else {
      const availableFilters = activeFilters.reduce((acc, currentFilter) => {
        const { column } = currentFilter;

        return acc.filter((filter) => filter !== column);
      }, [...filters.columns]);

      setColumnFilters(availableFilters);
    }

    removeFilter(id);
  };

  const handleRemoveAll = () => {
    removeAllFilters();
    setColumnFilters(filters.columns);
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
        <button
          data-testid="button-remove-filters"
          type="button"
          onClick={ handleRemoveAll }
        >
          REMOVER FILTROS
        </button>
        <div>
          {filterByNumericValues.length > 0
        && filterByNumericValues.map(({ column, comparison, value }) => (
          <div data-testid="filter" key={ column }>
            <h4>
              {`${column} ${comparison} ${value}`}
            </h4>
            <button
              type="button"
              id={ column }
              onClick={ handleRemove }
            >
              X
            </button>
          </div>
        ))}
        </div>
        <div>
          <select
            data-testid="column-sort"
            value={ order.column }
            onChange={ ({ target: { value } }) => setOrder((prev) => (
              { ...prev, column: value }
            )) }
          >
            { filters.columns.map((column, index) => (
              <option key={ index } value={ column }>
                {column}
              </option>
            ))}
          </select>
          <label htmlFor="column-sort-input-asc">
            <input
              data-testid="column-sort-input-asc"
              type="radio"
              id="column-sort-input-asc"
              name="sorting"
              value="ASC"
              onChange={ ({ target: { value } }) => setOrder((prev) => (
                { ...prev, sort: value }
              )) }
            />
            Ascendente
          </label>
          <label htmlFor="column-sort-input-desc">
            <input
              data-testid="column-sort-input-desc"
              type="radio"
              id="column-sort-input-desc"
              name="sorting"
              value="DESC"
              onChange={ ({ target: { value } }) => setOrder(
                (prev) => ({ ...prev, sort: value }),
              ) }
            />
            Descendente
          </label>
          <button
            data-testid="column-sort-button"
            type="button"
            onClick={ () => filterOrder({ ...order, active: true }) }
          >
            ORDENAR
          </button>
        </div>
      </div>
    </>
  );
}

export default Filter;
