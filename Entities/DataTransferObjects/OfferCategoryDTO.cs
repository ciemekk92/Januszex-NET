namespace Entities.DataTransferObjects
{
    public class OfferCategoryDTO
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Created { get; set; }

        public OfferCategoryDTO Parent { get; set; }
    }
}
