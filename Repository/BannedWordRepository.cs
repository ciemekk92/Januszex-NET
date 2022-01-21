using Contracts;
using Entities;
using Entities.Models;
using System.Collections.Generic;
using System.Linq;

namespace Repository
{
    public class BannedWordRepository : RepositoryBase<BannedWord>, IBannedWordRepository
    {
        public BannedWordRepository(RepositoryContext repositoryContext)
            : base(repositoryContext)
        {
        }

        public IEnumerable<BannedWord> GetAllBannedWords()
        {
            return FindAll()
                .OrderBy(b => b.Name)
                .ToList();
        }

        public BannedWord GetBannedWordById(string bannedWordId)
        {
            return FindByCondition(bannedWord => bannedWord.Id.Equals(bannedWordId))
                .FirstOrDefault();
        }

        public void CreateBannedWord(BannedWord bannedWord)
        {
            Create(bannedWord);
        }

        public void UpdateBannedWord(BannedWord bannedWord)
        {
            Update(bannedWord);
        }

        public void DeleteBannedWord(BannedWord bannedWord)
        {
            Delete(bannedWord);
        }
    }
}
