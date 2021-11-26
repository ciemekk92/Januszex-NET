using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Contracts;
using Entities;
using Entities.Models;

namespace Repository
{
    public class OfferRepository : RepositoryBase<Offer>, IOfferRepository
    {
        public OfferRepository(RepositoryContext repositoryContext)
            : base(repositoryContext)
        {
        }

        public IEnumerable<Offer> GetAllOffers()
        {
            return FindAll()
                .OrderBy(c => c.Title)
                .ToList();
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
