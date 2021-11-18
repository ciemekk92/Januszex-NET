using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Januszex.Models
{
    public class User : IdentityUser
    {
        public List<Offer> Offers { get; } = new List<Offer>();

        public bool DarkMode { get; set; }
    }
}