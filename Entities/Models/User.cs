using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Entities.Models
{
    public class User : IdentityUser
    {
        public ICollection<Offer> Offers { get; set; } 
        
        public bool DarkMode { get; set; }
    }
}