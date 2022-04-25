import React, { useContext } from 'react';
import Context from '../context/Context';

function Filter() {
  const { filterByName, filterName } = useContext(Context);

  return (
    <div>
      <input
        data-testid="name-filter"
        type="text"
        value={ filterByName }
        onChange={ (event) => filterName(event.target.value) }
      />
    </div>
  );
}

export default Filter;
