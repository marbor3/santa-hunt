import React from 'react';
import styled from 'styled-components';

const Tree = styled.div`
  height: 100vh;
  display: flex;
  background-color: green;
`;

const Icon = styled.img`
  max-width: 50vw;
  width: 100%:
`;

export default () => (
  <Tree>
    <Icon alt="" src="../media/icon/045-tree-1.svg" />
  </Tree>
);
