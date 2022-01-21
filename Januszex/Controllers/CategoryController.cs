using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Entities.Models;
using Contracts;
using System;
using AutoMapper;
using Entities.DataTransferObjects;

namespace Januszex.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private IRepositoryWrapper _repository;
        private IMapper _mapper;

        public CategoryController(IRepositoryWrapper repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAllCategories()
        {
            try
            {
                var categories = _repository.Category.GetAllCategories();

                var categoriesResult = _mapper.Map<IEnumerable<CategoryDTO>>(categories);

                return Ok(categoriesResult);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Błąd serwera." + ex);
            }
        }

        [Authorize]
        [Route("flat")]
        [HttpGet]
        public IActionResult GetFlatCategoties()
        {
            try
            {
                var categories = _repository.Category.GetFlatCategories();

                var categoriesResult = _mapper.Map<IEnumerable<CategoryFlatDTO>>(categories);

                return Ok(categoriesResult);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Błąd serwera." + ex);
            }
        }

        [HttpGet("{id}", Name ="CategoryById")]
        public IActionResult GetCategoryById(string id)
        {
            try
            {
                var category = _repository.Category.GetCategoryById(id);

                if (category == null)
                {
                    return NotFound();
                }
                else
                {
                    var categoryResult = _mapper.Map<CategoryDTO>(category);
                    return Ok(categoryResult);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Błąd serwera." + ex);
            }
        }

        [Authorize]
        [HttpPost]
        public IActionResult CreateCategory([FromBody]CategoryForCreationDTO category)
        {
            try
            {
                if (category == null)
                {
                    return BadRequest("Brak kategorii");
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest("Kategoria jest błędna");
                }

                var categoryEntity = _mapper.Map<Category>(category);

                if (category.ChildrenIds != null)
                {
                    foreach (var childId in category.ChildrenIds)
                    {
                        var child = _repository.Category.GetCategoryById(childId);
                        child.Parent = categoryEntity;

                        categoryEntity.Children.Add(child);

                        _repository.Category.UpdateCategory(child);
                    }
                }
                

                _repository.Category.CreateCategory(categoryEntity);
                _repository.Save();

                var createdCategory = _mapper.Map<CategoryDTO>(categoryEntity);

                return CreatedAtRoute("CategoryById", new { id = createdCategory.Id }, createdCategory);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Wewnętrzny błąd serwera." + ex);
            }
        }

        [Authorize]
        [HttpPut("{id}")]
        public IActionResult UpdateCategory(string id, [FromBody]CategoryForUpdateDTO category)
        {
            try
            {
                if (category == null)
                {
                    return BadRequest("Kategoria jest pusta");
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest("Kategoria jest nieprawidłowa");
                }

                var categoryEntity = _repository.Category.GetCategoryById(id);

                if (categoryEntity == null)
                {
                    return NotFound();
                }

                _mapper.Map(category, categoryEntity);

                _repository.Category.UpdateCategory(categoryEntity);
                _repository.Save();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Wewnętrzny błąd serwera" + ex);
            }
        }

        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult DeleteCategory(string id)
        {
            try
            {
                var category = _repository.Category.GetCategoryById(id);

                if (category == null)
                {
                    return NotFound();
                }

                _repository.Category.DeleteCategory(category);
                _repository.Save();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Wewnętrzny błąd serwera" + ex);
            }
        }
    }
}
