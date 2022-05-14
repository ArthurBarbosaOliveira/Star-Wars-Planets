import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Planets from '../services/api';
import Context from './Context';

function Provider({ children }) {
  const [planetData, setPlanetData] = useState({
    data: [],
    filterByName: '',
    filterByNumero: [],
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

  const filtroNumero = (filtro) => {
    setPlanetData((prevState) => ({
      ...prevState,
      filterByNumero: [...prevState, filterByNumero, filtro],
    }));
  };

  return (
    <Context.Provider value={ { ...planetData, filterName, filtroNumero } }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default Provider;
