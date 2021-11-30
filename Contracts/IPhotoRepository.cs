using Entities.Models;
using System.Collections.Generic;

namespace Contracts
{
    public interface IPhotoRepository
    {
        IEnumerable<Photo> GetAllPhotos();
        Photo GetPhotoById(string photoId);
        void CreatePhoto(Photo photo);
        void UpdatePhoto(Photo photo);
        void DeletePhoto(Photo photo);
    }
}