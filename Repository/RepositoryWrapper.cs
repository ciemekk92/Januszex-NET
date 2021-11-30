using Contracts;
using Entities;

namespace Repository
{
    public class RepositoryWrapper : IRepositoryWrapper
    {
        private RepositoryContext _repoContext;
        private IOfferRepository _offer;
        private ICategoryRepository _category;
        private IUserRepository _user;
        private ICityRepository _city;
        private IRegionRepository _region;
        private ILocationRepository _location;
        private IPhotoRepository _photo;

        public RepositoryWrapper(RepositoryContext repositoryContext)
        {
            _repoContext = repositoryContext;
        }

        public IOfferRepository Offer
        {
            get
            {
                if(_offer == null)
                {
                    _offer = new OfferRepository(_repoContext);
                }

                return _offer;
            }
        }

        public ICategoryRepository Category
        {
            get
            {
                if (_category == null)
                {
                    _category = new CategoryRepository(_repoContext);
                }

                return _category;
            }
        }

        public IUserRepository User
        {
            get
            {
                if (_user == null)
                {
                    _user = new UserRepository(_repoContext);
                }

                return _user;
            }
        }

        public ILocationRepository Location
        {
            get
            {
                if (_location == null)
                {
                    _location = new LocationRepository(_repoContext);
                }

                return _location;
            }
        }

        public ICityRepository City
        {
            get
            {
                if (_city == null)
                {
                    _city = new CityRepository(_repoContext);
                }

                return _city;
            }
        }

        public IRegionRepository Region
        {
            get
            {
                if (_region == null)
                {
                    _region = new RegionRepository(_repoContext);
                }

                return _region;
            }
        }

        public IPhotoRepository Photo
        {
            get
            {
                if (_photo == null)
                {
                    _photo = new PhotoRepository(_repoContext);
                }

                return _photo;
            }
        }

        public void Save()
        {
            _repoContext.SaveChanges();
        }
    }
}
