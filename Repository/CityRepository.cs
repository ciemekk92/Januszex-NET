using System.Collections.Generic;
using System.Linq;
using Contracts;
using Entities;
using Entities.Models;

namespace Repository
{
    public class CityRepository : RepositoryBase<City>, ICityRepository
    {
        public CityRepository(RepositoryContext repositoryContext)
            : base(repositoryContext)
        {
        }

        public IEnumerable<City> GetAllCities()
        {
            return FindAll()
                .OrderBy(c => c.Name)
                .ToList();
        }

        public City GetCityById(string cityId)
        {
            return FindByCondition(city => city.Id.Equals(cityId))
                .FirstOrDefault();
        }

        public void CreateCity(City city)
        {
            Create(city);
        }

        public void UpdateCity(City city)
        {
            Update(city);
        }

        public void DeleteCity(City city)
        {
            Delete(city);
        }
    }
}
