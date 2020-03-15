import React from 'react';

import { NavLink } from 'react-router-dom';

export default (props) => {
  return (
    <NavLink activeStyle={{fontWeight: "bold"}} {...props} />
  )
}