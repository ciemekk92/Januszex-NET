using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DataTransferObjects
{
    public class CategoryDTO
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Created { get; set; }

        public string ParentId { get; set; }

        public CategoryParentDTO Parent { get; set; }

        public ICollection<OfferDTO> Offers { get; set; }

        public ICollection<CategoryDTO> Children { get; set; }
    }
}
