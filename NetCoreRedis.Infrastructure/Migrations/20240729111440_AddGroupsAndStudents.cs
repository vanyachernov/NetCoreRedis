using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace NetCoreRedis.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddGroupsAndStudents : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Groups",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    EnrolmentYear = table.Column<int>(type: "integer", nullable: false),
                    Specialty = table.Column<int>(type: "integer", nullable: false),
                    CurrentSemester = table.Column<int>(type: "integer", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Groups", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Students",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    GroupId = table.Column<Guid>(type: "uuid", nullable: false),
                    FirstName = table.Column<string>(type: "text", nullable: false),
                    MiddleName = table.Column<string>(type: "text", nullable: false),
                    LastName = table.Column<string>(type: "text", nullable: false),
                    DateOfBirth = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    EducationForm = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Students", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Students_Groups_GroupId",
                        column: x => x.GroupId,
                        principalTable: "Groups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Groups",
                columns: new[] { "Id", "CreatedDate", "CurrentSemester", "EnrolmentYear", "Specialty", "UpdatedDate" },
                values: new object[,]
                {
                    { new Guid("1789d03a-2d43-4509-8aed-abd93c446e02"), new DateTime(2024, 7, 29, 11, 14, 40, 491, DateTimeKind.Utc).AddTicks(7740), 1, 2024, 123, new DateTime(2024, 7, 29, 11, 14, 40, 491, DateTimeKind.Utc).AddTicks(7740) },
                    { new Guid("764bca2e-0220-42a7-9123-3794480b5496"), new DateTime(2024, 7, 29, 11, 14, 40, 491, DateTimeKind.Utc).AddTicks(7750), 1, 2021, 123, new DateTime(2024, 7, 29, 11, 14, 40, 491, DateTimeKind.Utc).AddTicks(7750) },
                    { new Guid("91978d64-07e7-49f5-affe-970111a5cb7f"), new DateTime(2024, 7, 29, 11, 14, 40, 491, DateTimeKind.Utc).AddTicks(7720), 1, 2024, 121, new DateTime(2024, 7, 29, 11, 14, 40, 491, DateTimeKind.Utc).AddTicks(7720) },
                    { new Guid("e166885b-f6ab-4b1d-97d6-4fcb2b8b52e8"), new DateTime(2024, 7, 29, 11, 14, 40, 491, DateTimeKind.Utc).AddTicks(7750), 1, 2024, 121, new DateTime(2024, 7, 29, 11, 14, 40, 491, DateTimeKind.Utc).AddTicks(7750) }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Students_GroupId",
                table: "Students",
                column: "GroupId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Students");

            migrationBuilder.DropTable(
                name: "Groups");
        }
    }
}
