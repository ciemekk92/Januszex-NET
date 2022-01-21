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
            CreateMap<User, UserDTO>()
                .ForMember(o => o.OfferCount, opt => opt.MapFrom(x => x.Offers.Count));

            CreateMap<Category, CategoryDTO>();

            CreateMap<Category, CategoryParentDTO>();

            CreateMap<Category, CategoryFlatDTO>();

            CreateMap<Category, OfferCategoryDTO>();

            CreateMap<BannedWord, BannedWordDTO>();

            CreateMap<BannedWordForCreationDTO, BannedWord>();

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
