import React from 'react';
import { StyledTextArea } from './TextArea.styled';

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TextArea = ({
  onChange,
  placeholder = '',
  ...props
}: TextAreaProps): JSX.Element => {
  return (
    <StyledTextArea onChange={onChange} placeholder={placeholder} {...props} />
  );
};
