import React, {Fragment} from "react";
//import PropTypes from 'prop-types';
import spinner from './spinner.gif';

const Spinner = () => {

    return (
        <Fragment>
            <img src={spinner} alt={"Loading..."} style={{ width: '200px', margin: 'auto', display: 'block' }} />
        </Fragment>
    );
}

Spinner.propTypes = {
}

export default Spinner;