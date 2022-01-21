using System.Collections.Generic;
using System.Linq;
using System.Text;
using Contracts;
using Entities;
using Entities.Helpers;
using Entities.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;

namespace Repository
{
    public class OfferRepository : RepositoryBase<Offer>, IOfferRepository
    {
        private ISortHelper<Offer> _sortHelper;
        public OfferRepository(RepositoryContext repositoryContext, ISortHelper<Offer> sortHelper)
            : base(repositoryContext)
        {
            _sortHelper = sortHelper;
        }

        public PagedList<Offer> GetAllOffers(OfferParameters offerParameters)
        {
            if (offerParameters.CategoryId != null)
            {
                var filteredOffers = FindByCondition(o => o.Categories.Any(c => c.Id == offerParameters.CategoryId))
                    .Include(o => o.Categories)
                    .Include(o => o.Photos)
                    .Include(o => o.Location).ThenInclude(l => l.City)
                    .Include(o => o.Location).ThenInclude(l => l.Region)
                    .OrderByDescending(o => o.Created);

                SearchByTitle(ref filteredOffers, offerParameters.Title);

                var sortedOffers = _sortHelper.ApplySort(filteredOffers, offerParameters.OrderBy);

                return PagedList<Offer>.ToPagedList(filteredOffers, offerParameters.PageNumber, offerParameters.PageSize);
            } else
            {
                var offers = FindAll()
                    .Include(o => o.Categories)
                    .Include(o => o.Photos)
                    .Include(o => o.Location).ThenInclude(l => l.City)
                    .Include(o => o.Location).ThenInclude(l => l.Region)
                    .OrderByDescending(c => c.Created);

                SearchByTitle(ref offers, offerParameters.Title);

                var sortedOffers = _sortHelper.ApplySort(offers, offerParameters.OrderBy);

                return PagedList<Offer>.ToPagedList(offers, offerParameters.PageNumber, offerParameters.PageSize);

            }
        }

        private void SearchByTitle(ref IOrderedQueryable<Offer> offers, string offerTitle)
        {
            if (!offers.Any() || string.IsNullOrWhiteSpace(offerTitle))
                return;

            offers = offers.Where(o => o.Title.ToLower().Contains(offerTitle.Trim().ToLower())).OrderBy(c => c.Title);
        }


        public Offer GetOfferById(string offerId)
        {
            return FindByCondition(offer => offer.Id.Equals(offerId))
                .Include(o => o.Categories)
                .Include(o => o.Photos)
                .Include(o => o.Location).ThenInclude(l => l.City)
                .Include(o => o.Location).ThenInclude(l => l.Region)
                .FirstOrDefault();
        }

        public IEnumerable<Offer> GetOffersForUser(string userId)
        {
            return FindByCondition(offer => offer.UserId.Equals(userId))
                .Include(o => o.Categories).ThenInclude(c => c.Parent).ThenInclude(c => c.Parent).ThenInclude(c => c.Parent)
                .Include(o => o.Photos)
                .Include(o => o.Location).ThenInclude(l => l.City)
                .Include(o => o.Location).ThenInclude(l => l.Region)
                .OrderByDescending(o => o.Created)
                .ToList();
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
