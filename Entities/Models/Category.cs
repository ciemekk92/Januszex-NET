using Entities.DataTransferObjects;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entities.Models
{
    [Table("Category")]
    public class Category
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("category_id")]
        public string Id { get; set; }
        
        [Required(ErrorMessage = "Nazwa kategorii jest wymagana.")]
        [StringLength(70, ErrorMessage = "Nazwa nie może być dłuższa niż 70 znaków.")]
        public string Name { get; set; }
        
        [DataType(DataType.Date)]
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        [Column("created")]
        public DateTime Created { get; set; }

        public string ParentId { get; set; }
        public virtual Category Parent { get; set; }

        public virtual ICollection<Category> Children { get; set; }
        
        public virtual ICollection<Offer> Offers { get; set; } 
    }
}