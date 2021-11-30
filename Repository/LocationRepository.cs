using Contracts;
using Entities;
using Entities.Models;
using System.Collections.Generic;
using System.Linq;

namespace Repository
{
    public class LocationRepository : RepositoryBase<Location>, ILocationRepository
    {
        public LocationRepository(RepositoryContext repositoryContext)
            : base(repositoryContext)
        {
        }

        public IEnumerable<Location> GetAllLocations()
        {
            return FindAll()
                .OrderBy(l => l.Region.Name)
                .ToList();
        }

        public Location GetLocationById(string locationId)
        {
            return FindByCondition(location => location.Id.Equals(locationId))
                .FirstOrDefault();
        }

        public void CreateLocation(Location location)
        {
            Create(location);
        }

        public void UpdateLocation(Location location)
        {
            Update(location);
        }

        public void DeleteLocation(Location location)
        {
            Delete(location);
        }
    }
}
