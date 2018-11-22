import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SANTA, GIFT, TREE } from './profession';

const Chooser = styled.div`
  height: 100vh;
  display: flex;
`;

const Profession = styled.button`
  border: none;
  padding: 0;
  flex: 1 1 25%;
  cursor: pointer;
`;

const Icon = styled.img`
  max-width: 25vw;
  width: 100%:
`;

const ProfessionChooser = (props) => {
  const { selectProfession } = props;

  return (
    <Chooser>
      <Profession type="button" onClick={selectProfession(SANTA)}>
        <Icon alt="" src="../media/icon/028-santa-claus.svg" />
      </Profession>
      <Profession type="button" onClick={selectProfession(GIFT)}>
        <Icon alt="" src="../media/icon/047-gift.svg" />
      </Profession>
      <Profession type="button" onClick={selectProfession(TREE)}>
        <Icon alt="" src="../media/icon/045-tree-1.svg" />
      </Profession>
    </Chooser>
  );
};

ProfessionChooser.propTypes = {
  selectProfession: PropTypes.func.isRequired,
};

export default ProfessionChooser;
