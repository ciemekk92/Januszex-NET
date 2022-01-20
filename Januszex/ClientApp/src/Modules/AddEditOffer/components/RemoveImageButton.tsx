import React from 'react';
import styled from 'styled-components';
import { CrossIcon } from 'Shared/Icons/CrossIcon';

interface Props {
  onClick: VoidFunctionNoArgs;
}

const Button = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.accent};
  border-radius: 50%;
  z-index: 100;
  cursor: pointer;

  & path {
    fill: #ffffff;
  }
`;

export const RemoveImageButton = ({ onClick }: Props): JSX.Element => {
  return (
    <Button onClick={onClick}>
      <CrossIcon />
    </Button>
  );
};
