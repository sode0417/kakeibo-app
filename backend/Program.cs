using Microsoft.EntityFrameworkCore;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddDbContext<DatabaseContext>(options =>
    options.UseSqlite("Data Source=kakeibo.db"));
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();
app.UseCors();
// app.UseHttpsRedirection(); // Disable HTTPS redirection for debugging

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast =  Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast")
.WithOpenApi();


// Records Endpoints
app.MapGet("/api/records", async (DatabaseContext db) => await db.Records.ToListAsync());
app.MapPost("/api/records", async (DatabaseContext db, Record record) =>
{
    record.Id = Guid.NewGuid().ToString();
    db.Records.Add(record);
    await db.SaveChangesAsync();
    return Results.Created($"/api/records/{record.Id}", record);
});
app.MapPut("/api/records/{id}", async (DatabaseContext db, string id, Record updatedRecord) =>
{
    var record = await db.Records.FindAsync(id);
    if (record is null) return Results.NotFound();
    record.Date = updatedRecord.Date;
    record.Amount = updatedRecord.Amount;
    record.CategoryId = updatedRecord.CategoryId;
    record.Memo = updatedRecord.Memo;
    record.Type = updatedRecord.Type;
    await db.SaveChangesAsync();
    return Results.NoContent();
});
app.MapDelete("/api/records/{id}", async (DatabaseContext db, string id) =>
{
    var record = await db.Records.FindAsync(id);
    if (record is null) return Results.NotFound();
    db.Records.Remove(record);
    await db.SaveChangesAsync();
    return Results.NoContent();
});

// Categories Endpoints
app.MapGet("/api/categories", async (DatabaseContext db) => await db.Categories.ToListAsync());
app.MapPost("/api/categories", async (DatabaseContext db, Category category) =>
{
    category.Id = Guid.NewGuid().ToString();
    db.Categories.Add(category);
    await db.SaveChangesAsync();
    return Results.Created($"/api/categories/{category.Id}", category);
});


app.Run();


record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
