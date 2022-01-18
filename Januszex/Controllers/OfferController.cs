using AutoMapper;
using Contracts;
using Entities.DataTransferObjects;
using Entities.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Security.Claims;

namespace Januszex.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OfferController : ControllerBase
    {
        private IRepositoryWrapper _repository;
        private IMapper _mapper;
        private readonly UserManager<User> _userManager;

        public OfferController(IRepositoryWrapper repository, IMapper mapper, UserManager<User> userManager)
        {
            _repository = repository;
            _mapper = mapper;
            _userManager = userManager;
        }

        [HttpGet]
        public IActionResult GetAllOffers([FromQuery] OfferParameters offerParameters)
        {
            try
            {
                var offers = _repository.Offer.GetAllOffers(offerParameters);

                var metadata = new
                {
                    offers.TotalCount,
                    offers.PageSize,
                    offers.CurrentPage,
                    offers.TotalPages,
                    offers.HasNext,
                    offers.HasPrevious
                };

                Response.Headers.Add("X-Pagination", JsonConvert.SerializeObject(metadata));

                var offersResult = _mapper.Map<IEnumerable<OfferDTO>>(offers);

                return Ok(offersResult);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Błąd serwera." + ex);
            }
        }

        [HttpGet("{id}", Name = "OfferById")]
        public IActionResult GetOfferById(string id)
        {
            try
            {
                var offer = _repository.Offer.GetOfferById(id);

                if (offer == null)
                {
                    return NotFound();
                }
                else
                {
                    var offerResult = _mapper.Map<OfferDTO>(offer);
                    return Ok(offerResult);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Błąd serwera.");
            }
        }

        [Authorize]
        [HttpGet("User/{id}")]
        public IActionResult GetOffersForUser(string id)
        {
            try
            {
                var offers = _repository.Offer.GetOffersForUser(id);
                var offersResult = _mapper.Map<IEnumerable<OfferDTO>>(offers);

                return Ok(offersResult);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Błąd serwera." + ex);
            }
        }

        [Authorize]
        [HttpPost]
        public IActionResult CreateOffer([FromBody] OfferForCreationDTO offer)
        {
            try
            {
                if (offer == null)
                {
                    return BadRequest("Brak ogłoszenia");
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest("Ogłoszenie jest błędne");
                }

                if (offer.CategoryIds == null || offer.CategoryIds.Count == 0)
                {
                    return BadRequest("Musisz wybrać przynajmniej 1 kategorię.");
                }

                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                var offerEntity = _mapper.Map<Offer>(offer);

                offerEntity.UserId = userId;

                foreach (var categoryId in offer.CategoryIds)
                {
                    var category = _repository.Category.GetCategoryById(categoryId);

                    if (category == null) return BadRequest("Nieprawidlowe ID kategorii.");

                    category.Offers = new List<Offer>();
                    category.Offers.Add(offerEntity);
                    offerEntity.Categories.Add(category);
                    _repository.Category.UpdateCategory(category);
                }

                _repository.Offer.CreateOffer(offerEntity);
                _repository.Save();

                var createdOffer = _mapper.Map<OfferDTO>(offerEntity);

                return CreatedAtRoute("OfferById", new { id = createdOffer.Id }, createdOffer);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Wewnętrzny błąd serwera." + ex);
            }
        }

        [Authorize]
        [HttpPut("{id}")]
        public IActionResult UpdateOffer(string id, [FromBody] OfferForUpdateDTO offer)
        {
            try
            {
                if (offer == null)
                {
                    return BadRequest("Ogłoszenie jest puste");
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest("Ogłoszenie jest nieprawidłowe");
                }

                var offerEntity = _repository.Offer.GetOfferById(id);

                if (offerEntity == null)
                {
                    return NotFound();
                }

                _mapper.Map(offer, offerEntity);

                _repository.Offer.UpdateOffer(offerEntity);
                _repository.Save();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Wewnętrzny błąd serwera" + ex);
            }
        }

        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult DeleteOffer(string id)
        {
            try
            {
                var offer = _repository.Offer.GetOfferById(id);

                if (offer == null)
                {
                    return NotFound();
                }

                _repository.Offer.DeleteOffer(offer);
                _repository.Save();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Wewnętrzny błąd serwera" + ex);
            }
        }
    }
}
