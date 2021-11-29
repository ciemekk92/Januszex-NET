using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Entities.DataTransferObjects
{
    public class CategoryForUpdateDTO
    {
        [Required(ErrorMessage = "Nazwa jest wymagana")]
        [StringLength(60, ErrorMessage = "Nazwa nie może być dłuższa niż 60 znaków.")]
        public string Name { get; set; }

        public ICollection<OfferDTO> Offers { get; set; }
    }
}
