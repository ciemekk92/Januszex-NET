using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entities.Models
{
    public class Offer
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("offer_id")]
        public string Id { get; set; }
        
        [Required(ErrorMessage = "Nazwa ogłoszenia jest wymagana.")]
        [StringLength(70, ErrorMessage = "Nazwa nie może być dłuższa niż 70 znaków.")]
        public string Title { get; set; }
        public string Content { get; set; }

        public string Created { get; set; }
        public string UserId { get; set; }
        public virtual User User { get; set; }
        
        public virtual ICollection<Category> Categories { get; set; }
    }
}