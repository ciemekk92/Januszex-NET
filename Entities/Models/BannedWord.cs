using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Entities.Models
{
    [Table("BannedWord")]
    public class BannedWord
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("banned_word_id")]
        public string Id { get; set; }

        [Required(ErrorMessage = "Nazwa słowa jest wymagana.")]
        [StringLength(30, ErrorMessage = "Nazwa nie może być dłuższa niż 30 znaków.")]
        public string Name { get; set; }

    }
}
