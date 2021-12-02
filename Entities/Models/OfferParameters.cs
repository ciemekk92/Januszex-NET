namespace Entities.Models
{
    public class OfferParameters : QueryStringParameters
    {
        #nullable enable
        public string? CategoryId { get; set; }
        public string? Title { get; set; }
    }
}
