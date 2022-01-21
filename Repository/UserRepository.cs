using Contracts;
using Entities;
using Entities.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace Repository
{
    public class UserRepository : RepositoryBase<User>, IUserRepository
    {
        public UserRepository(RepositoryContext repositoryContext)
            : base(repositoryContext)
        {
        }

        public IEnumerable<User> GetAllUsers()
        {
            return FindAll()
                .Include(u => u.Offers)
                .OrderBy(o => o.UserName);
        }

        public User GetUserById(string userId)
        {
            return FindByCondition(user => user.Id.Equals(userId))
                .Include(u => u.Offers)
                .FirstOrDefault();
        }

        public void DeleteUser(User user)
        {
            Delete(user);
        }
    }
}
