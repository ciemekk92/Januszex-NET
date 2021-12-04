using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

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

        [StringLength(4000, ErrorMessage = "Opis nie może być dłuższy niż 4000 znaków.")]
        public string Content { get; set; }
        
        public float Price { get; set; }
        public bool IsActive { get; set; }

        [DataType(DataType.Date)]
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        [Column("created")]
        public string Created { get; set; }
        public string UserId { get; set; }
        public string LocationId { get; set; }
        public virtual Location Location { get; set; }
        public virtual User User { get; set; }
        public virtual ICollection<Photo> Photos { get; set; }
        
        [JsonIgnore]
        public virtual ICollection<Category> Categories { get; set; }
    }
}