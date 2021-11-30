using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Models
{
    [Table("Region")]
    public class Region
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("region_id")]
        public string Id { get; set; }

        [Required]
        [StringLength(50, ErrorMessage = "Nazwa województwa nie może być dłuższa niż 50 znaków")]
        public string Name { get; set; }
    }
}
