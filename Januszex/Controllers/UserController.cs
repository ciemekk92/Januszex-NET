using System.Threading.Tasks;
using Januszex.Data;
using Januszex.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Januszex.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public UserController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> Get(string id)
        {
            var user = await _dbContext.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }
    }
}