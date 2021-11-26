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

            CreateMap<CategoryForCreationDTO, Category>();

            CreateMap<CategoryForUpdateDTO, Category>();

            CreateMap<Offer, OfferDTO>();
        }
    }
}
