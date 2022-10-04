import React from 'react';

function Square(props) {
    const classNames = `square ${props.winner}`;
    return (
        <button className={classNames} onClick={props.onClick}>{props.value}</button>
    );
}

export default Square;