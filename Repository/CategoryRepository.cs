﻿using System.Collections.Generic;
using System.Linq;
using Contracts;
using Entities;
using Entities.Models;

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
                .OrderBy(c => c.Name)
                .ToList();
        }

        public Category GetCategoryById(string categoryId)
        {
            return FindByCondition(category => category.Id.Equals(categoryId))
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