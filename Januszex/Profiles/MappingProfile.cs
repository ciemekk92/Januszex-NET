using AutoMapper;
using Entities.DataTransferObjects;
using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Januszex.Profiles
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Category, CategoryDTO>();

            CreateMap<Category, OfferCategoryDTO>();

            CreateMap<OfferCategoryDTO, Category>();

            CreateMap<CategoryForCreationDTO, Category>();

            CreateMap<CategoryForUpdateDTO, Category>();

            CreateMap<Offer, OfferDTO>();

            CreateMap<OfferForCreationDTO, Offer>();
                
            CreateMap<OfferForUpdateDTO, Offer>();

            CreateMap<Location, LocationDTO>();
        }
    }
}
