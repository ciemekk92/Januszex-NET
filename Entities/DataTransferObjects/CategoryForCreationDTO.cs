using Entities.DataTransferObjects;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Models
{
    public class CategoryForCreationDTO
    {
        [Required(ErrorMessage = "Nazwa jest wymagana")]
        [StringLength(60, ErrorMessage = "Nazwa nie może być dłuższa niż 60 znaków")]
        public string Name { get; set; }

        public ICollection<OfferDTO> Offers { get; set; }
    }
}
