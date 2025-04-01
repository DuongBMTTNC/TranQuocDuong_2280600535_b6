using Microsoft.EntityFrameworkCore;

namespace TranQuocDuong_2280600535_b6.Models
{
    public class YourDbContext: DbContext
    {
        public YourDbContext(DbContextOptions<YourDbContext> options) : base(options)
        {
        }
        public DbSet<Product> Products { get; set; }
    }
}
