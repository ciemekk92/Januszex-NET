import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyledImageInput, StyledLabel } from './ImageInput.styled';

interface Props {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ImageInput = ({ onChange }: Props): JSX.Element => {
  const { t } = useTranslation();

  const handleReset = (event: React.MouseEvent) => {
    // @ts-ignore
    event.target.value = null;
  };

  return (
    <React.Fragment>
      <StyledLabel htmlFor="file-upload">{t('imageUpload.label')}</StyledLabel>
      <StyledImageInput
        type="file"
        id="file-upload"
        onChange={onChange}
        onClick={handleReset}
        accept="image/*"
      />
    </React.Fragment>
  );
};
