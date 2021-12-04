using AutoMapper;
using System;

namespace Entities.Helpers
{
    public class PriceFormatter : IValueConverter<decimal, decimal>
    {
        public decimal Convert(decimal source, ResolutionContext context)
            => Decimal.Round(source, 2);
    }
}
