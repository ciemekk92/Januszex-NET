using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entities.Models
{
    public class Category
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("CategoryId")]
        public string Id { get; set; }
        
        [Required(ErrorMessage = "Nazwa kategorii jest wymagana.")]
        [StringLength(70, ErrorMessage = "Nazwa nie może być dłuższa niż 70 znaków.")]
        public string Name { get; set; }
        
        [DataType(DataType.Date)]
        public DateTime Created { get; set; }

        public string ParentCategoryId { get; set; }
        public virtual Category Parent { get; set; }
        
        public virtual ICollection<Offer> Offers { get; set; } 
    }
}