using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Entities.Models;
using Contracts;
using System;
using AutoMapper;
using Entities.DataTransferObjects;

namespace Januszex.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private IRepositoryWrapper _repository;
        private IMapper _mapper;

        public CategoriesController(IRepositoryWrapper repository, IMapper mapper)
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

        [HttpGet("{id}")]
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
                return StatusCode(500, "Błąd serwera.");
            }
        }
    }
}
