using Contracts;
using Entities;
using Entities.Models;
using System.Collections.Generic;
using System.Linq;

namespace Repository
{
    public class RegionRepository : RepositoryBase<Region>, IRegionRepository
    {
        public RegionRepository(RepositoryContext repositoryContext)
            : base(repositoryContext)
        {
        }

        public IEnumerable<Region> GetAllRegions()
        {
            return FindAll()
                .OrderBy(c => c.Name)
                .ToList();
        }

        public Region GetRegionById(string regionId)
        {
            return FindByCondition(region => region.Id.Equals(regionId))
                .FirstOrDefault();
        }

    }
}
