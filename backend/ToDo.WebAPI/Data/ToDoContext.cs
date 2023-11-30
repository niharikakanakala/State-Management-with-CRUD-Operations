using Microsoft.EntityFrameworkCore;
using ToDo.WebAPI.Data;

namespace ToDo.WebAPI.Data
{
    public class ToDoContext : DbContext
    {
        public ToDoContext(DbContextOptions<ToDoContext> options) : base(options)
        {
        }

        public DbSet<ToDoTask> Tasks { get; set; }

        // Other DbSet properties and configuration...

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configuration for entities

            base.OnModelCreating(modelBuilder);
        }
    }
}
