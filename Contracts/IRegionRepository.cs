using Entities.Models;
using System.Collections.Generic;

namespace Contracts
{
    public interface IRegionRepository
    {
            IEnumerable<Region> GetAllRegions();
            Region GetRegionById(string regionId);
    }
}
