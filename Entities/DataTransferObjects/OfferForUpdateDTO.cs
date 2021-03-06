using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Entities.DataTransferObjects
{
    public class OfferForUpdateDTO
    {
        [Required(ErrorMessage = "Tytuł jest wymagany")]
        [StringLength(60, ErrorMessage = "Tytuł nie może być dłuższy niż 60 znaków")]
        public string Title { get; set; }

        [Required(ErrorMessage = "Treść jest wymagana")]
        [StringLength(500, ErrorMessage = "Treść nie może być dłuższa niż 500 znaków")]
        public string Content { get; set; }
        
        public decimal Price { get; set; }
        public List<string> CategoryIds { get; set; }
        public ICollection<CategoryDTO> Categories { get; set; }
        public ICollection<PhotoDTO> Photos { get; set; }
    }
}
