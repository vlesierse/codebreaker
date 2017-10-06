using CodeBreaker.Core;
using Microsoft.EntityFrameworkCore;

namespace CodeBreaker.WebApp.Storage
{
    public class CodeBreakerDbContext : DbContext
    {
        public CodeBreakerDbContext(DbContextOptions<CodeBreakerDbContext> options)
            : base(options)
        { }
        public DbSet<Score> Scores { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Score>().HasKey(s => s.GameId);
        }
    }
}