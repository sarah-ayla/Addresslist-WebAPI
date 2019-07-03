using Microsoft.EntityFrameworkCore;
using System.Configuration;
using System.Data.SqlClient;

namespace AddressListApi.Models
{
    public class AddressListContext : DbContext
    {

       public AddressListContext(DbContextOptions<AddressListContext> options)
            : base(options)
        {
        }

        public DbSet<AddressListItem> AddressListItems { get; set; }

        
    }
}