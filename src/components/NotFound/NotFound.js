import React, { memo } from 'react';
import styled from 'styled-components';

const Banner = styled.div`
  width: 100%;
  text-align: center;
  color: ${({ theme }) => theme?.theme?.accentColor};
  font-size: 70px;
  margin-top: 50px;
  width: 70%;
  text-shadow: 3px 3px 0px ${({ theme }) => theme?.theme?.darkBlue};
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const NotFound = () => {
  return (
    <Container>
      <Banner>Sorry! Couldn't found what you're looking for...</Banner>
    </Container>
  );
}

export default memo(NotFound);

