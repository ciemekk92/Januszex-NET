using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entities.Models
{
    [Table("City")]
    public class City
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("city_id")]
        public string Id { get; set; }

        [Required]
        [StringLength(50, ErrorMessage = "Nazwa miasta nie może być dłuższa niż 50 znaków")]
        public string Name { get; set; }
    }
}
