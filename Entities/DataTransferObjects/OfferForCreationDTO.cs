using Entities.Models;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Entities.DataTransferObjects
{
    public class OfferForCreationDTO
    {
        [Required(ErrorMessage = "Tytuł jest wymagany")]
        [StringLength(60, ErrorMessage = "Tytuł nie może być dłuższy niż 60 znaków")]
        public string Title { get; set; }

        [Required(ErrorMessage = "Treść jest wymagana")]
        [StringLength(4000, ErrorMessage = "Opis nie może być dłuższy niż 4000 znaków.")]
        public string Content { get; set; }

        public Location Location { get; set; }
        public decimal Price { get; set; }
        public List<string> CategoryIds { get; set; }
        public ICollection<CategoryDTO> Categories { get; set; }

        public ICollection<Photo> Photos { get; set; }
    }
}
