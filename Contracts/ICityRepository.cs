using Entities.Models;
using System.Collections.Generic;

namespace Contracts
{
    public interface ICityRepository
    {
        IEnumerable<City> GetAllCities();
        City GetCityById(string cityId);

        void CreateCity(City city);
        void UpdateCity(City city);
        void DeleteCity(City city);
    }
}
