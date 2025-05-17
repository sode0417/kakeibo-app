using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", optional: true)
    .AddEnvironmentVariables();

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddDbContext<DatabaseContext>(options =>
    options.UseSqlite("Data Source=kakeibo.db"));
builder.Services.AddSwaggerGen();

var allowedOrigins = builder.Configuration.GetSection("AllowedOrigins").Get<string[]>() ?? new[] { "http://localhost:5173" };

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins(allowedOrigins)
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
app.MapGet("/api/records", async (HttpContext context, [FromServices] DatabaseContext db) =>
{
    try
    {
        var records = await db.Records.ToListAsync();
        return Results.Ok(records);
    }
    catch (Exception ex)
    {
        return Results.Problem(ex.Message);
    }
});

app.MapPost("/api/records", async (DatabaseContext db, Record record) =>
{
    try
    {
        record.Id = Guid.NewGuid().ToString();
        db.Records.Add(record);
        await db.SaveChangesAsync();
        return Results.Created($"/api/records/{record.Id}", record);
    }
    catch (Exception ex)
    {
        return Results.Problem(ex.Message);
    }
});
app.MapPut("/api/records/{id}", async (DatabaseContext db, string id, Record updatedRecord) =>
{
    try
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
    }
    catch (Exception ex)
    {
        return Results.Problem(ex.Message);
    }
});
app.MapDelete("/api/records/{id}", async (DatabaseContext db, string id) =>
{
    try
    {
        var record = await db.Records.FindAsync(id);
        if (record is null) return Results.NotFound();
        db.Records.Remove(record);
        await db.SaveChangesAsync();
        return Results.NoContent();
    }
    catch (Exception ex)
    {
        return Results.Problem(ex.Message);
    }
});

// Categories Endpoints
app.MapGet("/api/categories", async (HttpContext context, [FromServices] DatabaseContext db) =>
{
    try
    {
        var categories = await db.Categories.ToListAsync();
        return Results.Ok(categories);
    }
    catch (Exception ex)
    {
        return Results.Problem(ex.Message);
    }
});
app.MapPost("/api/categories", async (DatabaseContext db, Category category) =>
{
    try
    {
        category.Id = Guid.NewGuid().ToString();
        db.Categories.Add(category);
        await db.SaveChangesAsync();
        return Results.Created($"/api/categories/{category.Id}", category);
    }
    catch (Exception ex)
    {
        return Results.Problem(ex.Message);
    }
});



app.Run();


record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
