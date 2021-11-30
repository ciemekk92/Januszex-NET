using System.Collections.Generic;
using System.Linq;
using Contracts;
using Entities;
using Entities.Models;

namespace Repository
{
    public class PhotoRepository : RepositoryBase<Photo>, IPhotoRepository
    {
        public PhotoRepository(RepositoryContext repositoryContext)
            : base(repositoryContext)
        {
        }

        public IEnumerable<Photo> GetAllPhotos()
        {
            return FindAll()
                .OrderBy(c => c.Filename)
                .ToList();
        }

        public Photo GetPhotoById(string photoId)
        {
            return FindByCondition(photo => photo.Id.Equals(photoId))
                .FirstOrDefault();
        }

        public void CreatePhoto(Photo photo)
        {
            Create(photo);
        }

        public void UpdatePhoto(Photo photo)
        {
            Update(photo);
        }

        public void DeletePhoto(Photo photo)
        {
            Delete(photo);
        }
    }
}
