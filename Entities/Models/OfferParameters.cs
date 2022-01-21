﻿namespace Entities.Models
{
    public class OfferParameters : QueryStringParameters
    {
        public OfferParameters()
        {
            OrderBy = "Created";
        }

        #nullable enable
        public string? CategoryId { get; set; }
        public string? Title { get; set; }

        public string? SortField { get; set; }

        public string? SortOrder { get; set; }
    }
}
