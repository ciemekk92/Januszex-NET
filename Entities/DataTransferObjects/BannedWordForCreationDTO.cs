using System.ComponentModel.DataAnnotations;

namespace Entities.DataTransferObjects
{
    public class BannedWordForCreationDTO
    {
        [Required(ErrorMessage = "Nazwa jest wymagana")]
        [StringLength(30, ErrorMessage = "Nazwa nie może być dłuższa niż 30 znaków")]
        public string Name { get; set; }
    }
}
