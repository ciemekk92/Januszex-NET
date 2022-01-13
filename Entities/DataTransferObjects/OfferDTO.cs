using Entities.Models;
using System.Collections.Generic;

namespace Entities.DataTransferObjects
{
    public class OfferDTO
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public decimal Price { get; set; }
        public string Created { get; set; }
        public bool IsActive { get; set; }

        public LocationDTO Location { get; set; }

        public User User { get; }
        public ICollection<OfferCategoryDTO> Categories { get; set; }

        public ICollection<PhotoDTO> Photos { get; set; }
    }
}
