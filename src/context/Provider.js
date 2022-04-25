import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Planets from '../services/api';
import Context from './Context';

function Provider({ children }) {
  const [planetData, setPlanetData] = useState({
    data: [],
  });

  useEffect(() => {
    const getData = async () => {
      const response = await Planets();
      const data = response.results;
      setPlanetData((prevState) => ({ ...prevState, data }));
    };
    getData();
  }, []);

  return (
    <Context.Provider value={ { ...planetData } }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Provider;
