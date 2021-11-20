using System.Collections.Generic;
using Entities.Models;

namespace Contracts
{
    public interface ICategoryRepository
    {
        IEnumerable<Category> GetAllCategories();
        Category GetCategoryById(string categoryId);
    }
}
