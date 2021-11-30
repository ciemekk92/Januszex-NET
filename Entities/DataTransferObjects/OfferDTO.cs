using Entities.Models;
using System.Collections.Generic;

namespace Entities.DataTransferObjects
{
    public class OfferDTO
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string Created { get; set; }
        public bool IsActive { get; set; }

        public Location Location { get; set; }
        public ICollection<Category> Categories { get; set; }
    }
}
