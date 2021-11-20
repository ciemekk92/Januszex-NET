using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Januszex.Models
{
    public class Offer
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string OfferId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }

        public string Created { get; set; }
        public string UserId { get; }
        public virtual User User { get; set; }
        
        public virtual ICollection<Category> Categories { get; set; }
    }
}