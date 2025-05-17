using Microsoft.EntityFrameworkCore;

public class Record
{
    public string Id { get; set; } = default!;
    public string Date { get; set; } = default!;
    public decimal Amount { get; set; }
    public string CategoryId { get; set; } = default!;
    public string? Memo { get; set; }
    public string Type { get; set; } = default!;
}


public class Category
{
    public string Id { get; set; } = default!;
    public string Name { get; set; } = default!;
    public string? Color { get; set; }
}

public class DatabaseContext : DbContext
{
    public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
    {
    }

    public DbSet<Record> Records { get; set; } = default!;
    public DbSet<Category> Categories { get; set; } = default!;

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("Data Source=kakeibo.db");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Category>().HasData(
            new Category { Id = "1", Name = "食費", Color = "#FF5733" },
            new Category { Id = "2", Name = "交通費", Color = "#33FF57" },
            new Category { Id = "3", Name = "娯楽", Color = "#3357FF" }
        );
    }
}