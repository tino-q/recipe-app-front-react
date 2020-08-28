import React from 'react';

const Emoji = (props) =>
    (<span
        role='img'
        aria-label={props.label}
        onClick={props.onClick}
        className={props.className}
    >
        {props.emoji}
    </span>);

export default Emoji;
