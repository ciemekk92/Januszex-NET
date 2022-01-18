import React from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators } from 'Stores/Offer';
import { ApplicationState } from 'Stores/store';

import {
  StyledContentContainer,
  StyledImageContainer,
  StyledWrapper
} from './ViewOffer.styled';
import { Heading4 } from 'Shared/Typography';
import { Photo } from '../../Types/stores';
import { Container } from '../../Hooks/useLoading';

export const ViewOffer = ({
  match
}: RouteComponentProps<{ id: Id }>): JSX.Element => {
  const dispatch = useDispatch();
  const offer = useSelector((state: ApplicationState) =>
    state.offer ? state.offer.offer : null
  );

  const isOfferLoading = useSelector((state: ApplicationState) =>
    state.offer ? state.offer.isLoading : false
  );

  React.useEffect(() => {
    dispatch(actionCreators.getOffer(match.params.id));

    return () => {
      dispatch(actionCreators.clearOffer());
    };
  }, []);

  if (!offer) {
    return <Redirect to={'/'} />;
  }

  return (
    <React.Fragment>
      <Container isLoading={isOfferLoading} />
      {offer.id && (
        <StyledWrapper>
          <Heading4>{offer.title}</Heading4>
          <StyledContentContainer>{offer.content}</StyledContentContainer>
          {offer.photos?.map((photo: Photo) => (
            <StyledImageContainer key={photo.filename}>
              <img alt={photo.filename} src={photo.link} />
            </StyledImageContainer>
          ))}
        </StyledWrapper>
      )}
    </React.Fragment>
  );
};
