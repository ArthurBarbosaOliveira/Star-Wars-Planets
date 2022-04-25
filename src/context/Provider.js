import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Planets from '../services/api';
import Context from './Context';

function Provider({ children }) {
  const [planetData, setPlanetData] = useState({
    data: [],
    filterByName: '',
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

  return (
    <Context.Provider value={ { ...planetData, filterName } }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default Provider;
