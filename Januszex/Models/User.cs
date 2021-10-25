using System.Collections.Generic;

namespace Januszex.Models
{
    public class User
    {
        public string UserId { get; set; }
        public string Email { get; set; }

        public List<Offer> Offers { get; } = new List<Offer>();
    }
}