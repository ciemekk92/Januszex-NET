using System;
using System.Linq;
using Januszex.Models;

namespace Januszex.Data
{
    public class DbInitializer
    {
        public static void Initialize(ApplicationDbContext context)
        {
            if (context.Offers.Any())
            {
                return;
            }

            var offers = new Offer[]
            {
                new Offer {Content = "Test content", Title = "Test title", OfferId = "123abc"},
                new Offer {Content = "Test content 2 ", Title = "Test title 2", OfferId = "456def"}
            };
            
            context.Offers.AddRange(offers);
            context.SaveChanges();
        }
    }
}