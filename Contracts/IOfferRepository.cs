using Entities.Helpers;
using Entities.Models;

namespace Contracts
{
    public interface IOfferRepository
    {   
        PagedList<Offer> GetAllOffers(OfferParameters offerParameters);
        Offer GetOfferById(string offerId);
        void CreateOffer(Offer offer);
        void UpdateOffer(Offer offer);
        void DeleteOffer(Offer offer);
    }
}
