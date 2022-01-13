using AutoMapper;
using Entities.DataTransferObjects;
using Entities.Helpers;
using Entities.Models;

namespace Januszex.Profiles
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Category, CategoryDTO>();

            CreateMap<Category, CategoryParentDTO>();

            CreateMap<Category, OfferCategoryDTO>();

            CreateMap<OfferCategoryDTO, Category>();

            CreateMap<CategoryForCreationDTO, Category>();

            CreateMap<CategoryForUpdateDTO, Category>();

            CreateMap<Offer, OfferDTO>()
                .ForMember(o => o.Price, opt => opt.ConvertUsing(new PriceFormatter()));

            CreateMap<OfferForCreationDTO, Offer>()
                .ForMember(o => o.Price, opt => opt.ConvertUsing(new PriceFormatter()));

            CreateMap<OfferForUpdateDTO, Offer>()
                .ForMember(o => o.Price, opt => opt.ConvertUsing(new PriceFormatter()));

            CreateMap<Photo, PhotoDTO>();

            CreateMap<Location, LocationDTO>();
        }
    }
}
