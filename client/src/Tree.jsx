import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Tree = styled.div`
  height: 100vh;
  display: flex;
  background-color: blue;
`;

const Icon = styled.img`
  max-width: 50vw;
  width: 100%;
`;

const TreeProfession = (props) => {
  const { image } = props;

  return (
    <Tree>
      <Icon alt="" src={image} />
    </Tree>
  );
};

TreeProfession.propTypes = {
  image: PropTypes.string,
};

TreeProfession.defaultProps = {
  image: '',
};

export default TreeProfession;
