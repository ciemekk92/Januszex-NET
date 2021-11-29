using System.Linq;
using Contracts;
using Entities;
using Entities.Helpers;
using Entities.Models;

namespace Repository
{
    public class OfferRepository : RepositoryBase<Offer>, IOfferRepository
    {
        public OfferRepository(RepositoryContext repositoryContext)
            : base(repositoryContext)
        {
        }

        public PagedList<Offer> GetAllOffers(OfferParameters offerParameters)
        {
            var offers = FindByCondition(o => o.Categories.Any(c => c.Id == offerParameters.CategoryId))
                .OrderBy(o => o.Title);

            return PagedList<Offer>.ToPagedList(offers, offerParameters.PageNumber, offerParameters.PageSize);   
        }

        public Offer GetOfferById(string offerId)
        {
            return FindByCondition(offer => offer.Id.Equals(offerId))
                .FirstOrDefault();
        }

        public void CreateOffer(Offer offer)
        {
            Create(offer);
        }

        public void UpdateOffer(Offer offer)
        {
            Update(offer);
        }

        public void DeleteOffer(Offer offer)
        {
            Delete(offer);
        }
    }
}
