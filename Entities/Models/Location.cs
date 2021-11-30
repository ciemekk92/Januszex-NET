using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entities.Models
{
    public class Location
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("location_id")]
        public string Id { get; set; }

        [Required]
        [StringLength(50, ErrorMessage = "Nazwa ulicy nie może być dłuższa niż 50 znaków")]
        public string Street { get; set; }

        [Required]
        [StringLength(8, ErrorMessage = "Kod pocztowy nie może być dłuższy niż 8 znaków")]
        public string PostalCode { get; set; }
        public string CityId { get; set; }
        public string RegionId { get; set; }
        public virtual City City { get; set; }
        public virtual Region Region { get; set; }
    }
}
