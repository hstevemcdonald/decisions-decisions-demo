
import React from 'react';

const Button = (props) => {
    return (
        <h5 align="center"><input type="button" value="Hit me!" onClick={props.handlePick}/></h5>
    )
}

export default Button;
