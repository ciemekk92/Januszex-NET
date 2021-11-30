using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts
{   public interface ILocationRepository
        {
            IEnumerable<Location> GetAllLocations();
            Location GetLocationById(string locationId);

            void CreateLocation(Location location);
            void UpdateLocation(Location location);
            void DeleteLocation(Location location);
        }
}
