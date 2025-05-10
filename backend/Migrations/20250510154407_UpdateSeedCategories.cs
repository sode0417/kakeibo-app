using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class UpdateSeedCategories : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "0aa5bd49-4012-4672-80a7-22de02ecdcd6");

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "657489ba-4804-42ca-9ecc-30e91ad7d4fa");

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "f28a52ca-56b5-4ac6-8fb7-5fcf3574af5d");

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "Color", "Name" },
                values: new object[,]
                {
                    { "1", "#FF5733", "食費" },
                    { "2", "#33FF57", "交通費" },
                    { "3", "#3357FF", "娯楽" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "1");

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "2");

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: "3");

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "Color", "Name" },
                values: new object[,]
                {
                    { "0aa5bd49-4012-4672-80a7-22de02ecdcd6", "#3357FF", "娯楽" },
                    { "657489ba-4804-42ca-9ecc-30e91ad7d4fa", "#FF5733", "食費" },
                    { "f28a52ca-56b5-4ac6-8fb7-5fcf3574af5d", "#33FF57", "交通費" }
                });
        }
    }
}
