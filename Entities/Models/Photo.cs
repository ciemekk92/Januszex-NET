using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entities.Models
{
    [Table("Photo")]
    public class Photo
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("photo_id")]
        public string Id { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "Nazwa pliku nie może być dłuższa niż 50 znaków")]
        public string Filename { get; set; }

        public int Height { get; set; }
        public int Width { get; set; }
        public string Link { get; set; }

        public string OfferId { get; set; }

        public virtual Offer Offer { get; set; }
    }
}
