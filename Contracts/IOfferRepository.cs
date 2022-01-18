using Entities.Helpers;
using Entities.Models;
using System.Collections.Generic;

namespace Contracts
{
    public interface IOfferRepository
    {   
        PagedList<Offer> GetAllOffers(OfferParameters offerParameters);
        Offer GetOfferById(string offerId);
        IEnumerable<Offer> GetOffersForUser(string userId);
        void CreateOffer(Offer offer);
        void UpdateOffer(Offer offer);
        void DeleteOffer(Offer offer);
    }
}
