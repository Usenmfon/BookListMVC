namespace BookListMVC.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplcationDbContext> options) : base(options)
        {
            
        }

        public Dbset<Book> Books { get; set; }
    }
}