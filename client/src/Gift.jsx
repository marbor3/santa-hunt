import React from 'react';
import styled from 'styled-components';

const Gift = styled.div`
  height: 100vh;
  display: flex;
  background-color: blue;
`;

const Icon = styled.img`
  max-width: 50vw;
  width: 100%:
`;

export default () => (
  <Gift>
    <Icon alt="" src="../media/icon/047-gift.svg" />
  </Gift>
);
