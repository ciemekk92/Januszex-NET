using System.Collections.Generic;
using Entities.Models;

namespace Contracts
{
    public interface IOfferRepository
    {   
        IEnumerable<Offer> GetAllOffers();
        Offer GetOfferById(string offerId);
        void CreateOffer(Offer offer);
        void UpdateOffer(Offer offer);
        void DeleteOffer(Offer offer);
    }
}
