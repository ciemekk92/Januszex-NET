using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DataTransferObjects
{
    public class PhotoDTO
    {
        public string Id { get; set; }
        public string Filename { get; set; }
        public int Height { get; set; }

        public int Width { get; set; }

        public string Link { get; set; }
    }
}
