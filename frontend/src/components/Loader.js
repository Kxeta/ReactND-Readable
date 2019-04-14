import React from 'react';
import LoaderGif from '../images/loader.gif';

import './Loader.css';

const Loader = () => (
  <div className="loader">
    <img alt="Loading..." src={LoaderGif} />
  </div>
);

export default Loader;
