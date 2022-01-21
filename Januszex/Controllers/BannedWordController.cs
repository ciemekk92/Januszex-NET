using AutoMapper;
using Contracts;
using Entities.DataTransferObjects;
using Entities.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace Januszex.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BannedWordController : ControllerBase
    {
        private IRepositoryWrapper _repository;
        private IMapper _mapper;

        public BannedWordController(IRepositoryWrapper repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [Authorize]
        [HttpGet]
        public IActionResult GetAllBannedWords()
        {
            try
            {
                var bannedWords = _repository.BannedWord.GetAllBannedWords();
                var bannedWordsResult = _mapper.Map<IEnumerable<BannedWordDTO>>(bannedWords);

                return Ok(bannedWordsResult);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Błąd serwera." + ex);
            }
        }

        [Authorize]
        [HttpGet("{id}", Name ="BannedWordById")]
        public IActionResult GetBannedWordById(string id)
        {
            try
            {
                var bannedWord = _repository.BannedWord.GetBannedWordById(id);

                if (bannedWord == null)
                {
                    return NotFound();
                }
                else
                {
                    var bannedWordResult = _mapper.Map<BannedWordDTO>(bannedWord);
                    return Ok(bannedWordResult);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Błąd serwera.");
            }
        }

        [Authorize]
        [HttpPost]
        public IActionResult CreateBannedWord([FromBody]BannedWordForCreationDTO bannedWord)
        {
            try
            {
                if (bannedWord == null)
                {
                    return BadRequest("Brak słowa");
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest("Słowo jest błędne");
                }

                var bannedWordEntity = _mapper.Map<BannedWord>(bannedWord);

                _repository.BannedWord.CreateBannedWord(bannedWordEntity);
                _repository.Save();

                return CreatedAtAction("GetBannedWordById", new { id = bannedWordEntity.Id }, bannedWordEntity);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Wewnętrzny błąd serwera." + ex);
            }
        }

        [Authorize]
        [HttpPut("{id}")]
        public IActionResult UpdateBannedWord(string id, [FromBody]BannedWordForCreationDTO bannedWord)
        {
            try
            {
                if (bannedWord == null)
                {
                    return BadRequest("Brak słowa");
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest("Słowo jest błędne");
                }

                var bannedWordEntity = _repository.BannedWord.GetBannedWordById(id);

                if (bannedWordEntity == null)
                {
                    return NotFound();
                }

                _mapper.Map(bannedWord, bannedWordEntity);
                _repository.BannedWord.UpdateBannedWord(bannedWordEntity);

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
        public IActionResult DeleteBannedWord(string id)
        {
            try
            {
                var bannedWord = _repository.BannedWord.GetBannedWordById(id);

                if (bannedWord == null)
                {
                    return NotFound();
                }

                _repository.BannedWord.DeleteBannedWord(bannedWord);
                _repository.Save();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Wewnętrzny błąd serwera." + ex);
            }
        }
    }
}
