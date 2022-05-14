import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Planets from '../services/api';
import Context from './Context';

function PlanetsProvider({ children }) {
  const [planetData, setPlanetData] = useState({
    data: [],
    filterByName: '',
    filterByNumericValues: [],
  });

  useEffect(() => {
    const getData = async () => {
      const response = await Planets();
      const data = response.results;
      setPlanetData((prevState) => ({ ...prevState, data }));
    };
    getData();
  }, []);

  const filterName = (name) => {
    setPlanetData((prevState) => ({ ...prevState, filterByName: name }));
  };

  const filterNumeric = (filter) => {
    setPlanetData((prevState) => ({
      ...prevState,
      filterByNumericValues: [...prevState.filterByNumericValues, filter],
    }));
  };

  return (
    <Context.Provider value={ { ...planetData, filterName, filterNumeric } }>
      {children}
    </Context.Provider>
  );
}
PlanetsProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};
export default PlanetsProvider;
