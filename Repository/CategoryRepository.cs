using System.Collections.Generic;
using System.Linq;
using Contracts;
using Entities;
using Entities.Models;
using Microsoft.EntityFrameworkCore;

namespace Repository
{
    public class CategoryRepository : RepositoryBase<Category>, ICategoryRepository
    {
        public CategoryRepository(RepositoryContext repositoryContext) 
            :base(repositoryContext)
        {
        }
        
        public IEnumerable<Category> GetAllCategories()
        {
            return FindAll()
                .Where(c => c.ParentId == null)
                .Include(c => c.Parent)
                .Include(c => c.Children)
                .ThenInclude(c => c.Children)
                .ThenInclude(c => c.Children)
                .OrderBy(c => c.Name)
                .ToList();
        }

        public IEnumerable<Category> GetFlatCategories()
        {
            return FindAll()
                .OrderBy(c => c.ParentId)
                .ToList();
        }

        public Category GetCategoryById(string categoryId)
        {
            return FindByCondition(category => category.Id.Equals(categoryId))
                .Include(c => c.Parent)
                .Include(c => c.Children)
                .AsNoTracking()
                .FirstOrDefault();
        }

        public void CreateCategory(Category category)
        {
            Create(category);
        }

        public void UpdateCategory(Category category)
        {
            Update(category);
        }

        public void DeleteCategory(Category category)
        {
            Delete(category);
        }
    }
}
