using Entities.Models;
using System.Collections.Generic;

namespace Contracts
{
    public interface IBannedWordRepository
    {
        IEnumerable<BannedWord> GetAllBannedWords();

        BannedWord GetBannedWordById(string bannedWordId);

        void CreateBannedWord(BannedWord bannedWord);
        void UpdateBannedWord(BannedWord bannedWord);
        void DeleteBannedWord(BannedWord bannedWord);
    }
}
