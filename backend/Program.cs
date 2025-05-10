var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
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

var records = new List<Record>();
var categories = new List<Category>();

// Records Endpoints
app.MapGet("/api/records", () => records);
app.MapPost("/api/records", (Record record) =>
{
    record.Id = Guid.NewGuid().ToString();
    records.Add(record);
    return Results.Created($"/api/records/{record.Id}", record);
});
app.MapPut("/api/records/{id}", (string id, Record updatedRecord) =>
{
    var record = records.FirstOrDefault(r => r.Id == id);
    if (record is null) return Results.NotFound();
    record.Date = updatedRecord.Date;
    record.Amount = updatedRecord.Amount;
    record.CategoryId = updatedRecord.CategoryId;
    record.Memo = updatedRecord.Memo;
    record.Type = updatedRecord.Type;
    return Results.NoContent();
});
app.MapDelete("/api/records/{id}", (string id) =>
{
    var record = records.FirstOrDefault(r => r.Id == id);
    if (record is null) return Results.NotFound();
    records.Remove(record);
    return Results.NoContent();
});

// Categories Endpoints
app.MapGet("/api/categories", () => categories);
app.MapPost("/api/categories", (Category category) =>
{
    category.Id = Guid.NewGuid().ToString();
    categories.Add(category);
    return Results.Created($"/api/categories/{category.Id}", category);
});
app.MapPut("/api/categories/{id}", (string id, Category updatedCategory) =>
{
    var category = categories.FirstOrDefault(c => c.Id == id);
    if (category is null) return Results.NotFound();
    category.Name = updatedCategory.Name;
    category.Color = updatedCategory.Color;
    return Results.NoContent();
});
app.MapDelete("/api/categories/{id}", (string id) =>
{
    var category = categories.FirstOrDefault(c => c.Id == id);
    if (category is null) return Results.NotFound();
    categories.Remove(category);
    return Results.NoContent();
});

app.Run();

record Record
{
    public string Id { get; set; } = default!;
    public string Date { get; set; } = default!;
    public decimal Amount { get; set; }
    public string CategoryId { get; set; } = default!;
    public string? Memo { get; set; }
    public string Type { get; set; } = default!;
}

record Category
{
    public string Id { get; set; } = default!;
    public string Name { get; set; } = default!;
    public string? Color { get; set; }
}

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
