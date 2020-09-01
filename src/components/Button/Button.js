import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    background: ${({ theme }) => theme?.theme?.darkBlue};
    color: ${({ theme }) => theme?.theme?.accentColor};
    &:hover {
        cursor: pointer;
    }
    font-size: 11px;
`;

const Button = (props) => {
    return <StyledButton {...props} />
};

export default Button;