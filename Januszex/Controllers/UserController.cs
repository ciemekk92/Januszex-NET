using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Contracts;
using Entities;
using Entities.DataTransferObjects;
using Entities.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Januszex.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private IRepositoryWrapper _repository;
        private IMapper _mapper;
        private readonly UserManager<User> _userManager;

        private readonly RepositoryContext _dbContext;

        public UserController(IRepositoryWrapper repository, IMapper mapper, UserManager<User> userManager)
        {
            _repository = repository;
            _mapper = mapper;
            _userManager = userManager;
        }
        
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(string id)
        {
            try
            {
                var user = _repository.User.GetUserById(id);

                if (user == null)
                {
                    return NotFound();
                }
                else
                {
                    var roles = await _userManager.GetRolesAsync(user);
                    var userResult = _mapper.Map<UserDTO>(user);
                    return Ok(new { User = userResult, Roles = roles });
                }

            }
            catch (Exception ex)
            {
                return StatusCode(500, "B³¹d serwera." + ex);
            }
           
        }

        [HttpGet]
        public IActionResult GetAllUsers()
        {
            try
            {
                var users = _repository.User.GetAllUsers();
                var usersResult = _mapper.Map<IEnumerable<UserDTO>>(users);

                return Ok(usersResult);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "B³¹d serwera." + ex);
            }
        }

        [Route("me")]
        [HttpGet]
        public async Task<IActionResult> GetCurrentUser()
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                var user = _repository.User.GetUserById(userId);

                if (user == null)
                {
                    return NotFound();
                }
                else
                {
                    var roles = await _userManager.GetRolesAsync(user);
                    var userResult = _mapper.Map<UserDTO>(user);
                    return Ok(new { User = userResult, Roles = roles });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "B³¹d serwera." + ex);
            }
        }
    }
}