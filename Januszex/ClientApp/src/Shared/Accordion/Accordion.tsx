import React from 'react';
import {
  StyledButton,
  StyledButtonWrapper,
  StyledChildContainer,
  StyledContent,
  StyledWrapper
} from './Accordion.styled';
import { PlayIcon } from '../Icons';

interface Props {
  name: string;
  component: JSX.Element;
}

export const Accordion = ({ name, component }: Props): JSX.Element => {
  const [isActive, setIsActive] = React.useState<boolean>(false);
  const [height, setHeight] = React.useState<number>(0);
  const [isRotated, setIsRotated] = React.useState<boolean>(true);

  const content = React.useRef<HTMLDivElement>(null);
  const child = React.useRef<HTMLDivElement>(null);

  const toggle = () => {
    setIsActive(!isActive);
    setHeight(
      isActive ? 0 : content.current!.scrollHeight + child.current!.scrollHeight
    );
    setIsRotated(isActive);
  };

  return (
    <StyledWrapper>
      <StyledButtonWrapper>
        <StyledButton isIconRotated={isRotated} onClick={toggle}>
          <PlayIcon size={18} />
          {name}
        </StyledButton>
      </StyledButtonWrapper>
      <StyledContent ref={content} heightValue={height}>
        <StyledChildContainer ref={child}>{component}</StyledChildContainer>
      </StyledContent>
    </StyledWrapper>
  );
};
