using System.ComponentModel.DataAnnotations;

namespace Januszex.Models
{
    public class Offer
    {
        [Key]
        public string OfferId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
    }
}