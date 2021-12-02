using Entities.Models;
using System.ComponentModel.DataAnnotations;

namespace Entities.DataTransferObjects
{
    public class LocationDTO
    {
        public string Id { get; set; }
        public string Street { get; set; }
        public string PostalCode { get; set; }
        public virtual City City { get; set; }
        public virtual Region Region { get; set; }
    }
}
