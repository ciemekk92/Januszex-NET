import React from 'react';
import { useTranslation } from 'react-i18next';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Heading5, Heading6 } from 'Shared/Typography';
import { ApplicationState } from 'Stores/store';
import { actionCreators } from 'Stores/BannedWord';
import { StyledLabel, StyledRow } from '../../ManagementPanel.styled';
import { TextInput } from 'Shared/TextInput';
import { FORM_MODE } from 'Shared/constants';
import {
  StyledBannedWordButton,
  StyledWordPanel
} from './BannedWordsPanel.styled';
import { Api } from 'Utils/Api';

interface BannedWordInputData {
  name: string;
}

const initialData: BannedWordInputData = {
  name: ''
};

export const BannedWordsPanel = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const bannedWords = useSelector(
    (state: ApplicationState) =>
      state.bannedWord ? state.bannedWord.bannedWords : [],
    shallowEqual
  );

  const [mode, setMode] = React.useState<FORM_MODE>(FORM_MODE.ADD);
  const [editedId, setEditedId] = React.useState<Id>('');

  const [inputData, setInputData] =
    React.useState<BannedWordInputData>(initialData);

  React.useEffect(() => {
    dispatch(actionCreators.getBannedWords());
  }, []);

  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setInputData((prevState: BannedWordInputData) => ({
      ...prevState,
      name: target.value
    }));
  };

  const handleClearingInputs = () => {
    setInputData(initialData);
    setEditedId('');
    setMode(FORM_MODE.ADD);
  };

  const handleAddingWord = async () => {
    try {
      const result = await Api.post('api/BannedWord', inputData);

      if (result.status === 201) {
        dispatch(actionCreators.getBannedWords());
        handleClearingInputs();
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const handleEditingWord = async () => {
    try {
      if (editedId) {
        const result = await Api.put(`api/BannedWord/${editedId}`, inputData);

        if (result.status === 204) {
          dispatch(actionCreators.getBannedWords());

          handleClearingInputs();
        }
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const isButtonDisabled = inputData.name.length === 0;

  const renderBannedWordForm = (): JSX.Element => {
    return (
      <React.Fragment>
        <StyledRow>
          <StyledLabel>{t('manage.bannedWords.nameLabel')}</StyledLabel>
          <TextInput onChange={onChange} value={inputData.name} />
        </StyledRow>
        <StyledRow>
          <StyledBannedWordButton
            disabled={isButtonDisabled}
            onClick={
              mode === FORM_MODE.ADD ? handleAddingWord : handleEditingWord
            }
          >
            {t(
              `manage.bannedWords.${
                mode === FORM_MODE.ADD ? 'addWord' : 'editWord'
              }`
            )}
          </StyledBannedWordButton>
        </StyledRow>
      </React.Fragment>
    );
  };

  const renderCurrentBannedWords = (): JSX.Element[] => {
    return bannedWords.map((word: BannedWordInputData) => (
      <StyledWordPanel key={word.name}>
        <StyledLabel>{word.name}</StyledLabel>
      </StyledWordPanel>
    ));
  };

  return (
    <React.Fragment>
      <Heading5>{t('manage.bannedWords.title')}</Heading5>
      {renderBannedWordForm()}
      <Heading6>{t('manage.bannedWords.deleteWord')}</Heading6>
      {renderCurrentBannedWords()}
    </React.Fragment>
  );
};
