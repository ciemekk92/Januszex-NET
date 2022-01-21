namespace Contracts
{
    public interface IRepositoryWrapper
    {
        IOfferRepository Offer { get; }
        ICategoryRepository Category { get; }
        IUserRepository User { get; }
        IBannedWordRepository BannedWord { get; }
        void Save();
    }
}
