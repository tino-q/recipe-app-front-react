import React from 'react';
import styled from 'styled-components';

const Button = styled.span`
    &:hover {
        cursor: pointer;
    }
`;

const EmojiButton = (props) => (
    <Button
        role='img'
        aria-label={props.label}
        onClick={props.onClick}
        className={props.className}
    >
        {props.emoji}
    </Button>
);

export default EmojiButton;
