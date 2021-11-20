using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Januszex.Models
{
    public class Category
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string CategoryId { get; set; }
        
        public string Name { get; set; }
        
        [DataType(DataType.Date)]
        public DateTime Created { get; set; }

        public string ParentCategoryId { get; set; }
        public virtual Category Parent { get; set; }
        
        public virtual ICollection<Offer> Offers { get; set; } 
    }
}