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
        
        public float Price { get; set; }
    }
}
