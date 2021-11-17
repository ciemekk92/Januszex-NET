using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Januszex.Models
{
    public class Offer
    {
        [Key]
        public string OfferId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string UserId { get; }
        public User User { get; set; }
    }
}