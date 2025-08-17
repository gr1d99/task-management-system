using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddTaskStatus : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "status_id",
                table: "tasks",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "statuses",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "text", nullable: false),
                    created_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    updated_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_statuses", x => x.id);
                });

            migrationBuilder.InsertData(
                table: "statuses",
                columns: new[] { "id", "created_at", "name", "updated_at" },
                values: new object[,]
                {
                    { 1001L, new DateTimeOffset(new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "TODO", null },
                    { 1002L, new DateTimeOffset(new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "IN_PROGRESS", null },
                    { 1003L, new DateTimeOffset(new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "DONE", null }
                });

            migrationBuilder.CreateIndex(
                name: "ix_tasks_status_id",
                table: "tasks",
                column: "status_id");

            migrationBuilder.CreateIndex(
                name: "ix_statuses_name",
                table: "statuses",
                column: "name",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "fk_tasks_statuses_status_id",
                table: "tasks",
                column: "status_id",
                principalTable: "statuses",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_tasks_statuses_status_id",
                table: "tasks");

            migrationBuilder.DropTable(
                name: "statuses");

            migrationBuilder.DropIndex(
                name: "ix_tasks_status_id",
                table: "tasks");

            migrationBuilder.DropColumn(
                name: "status_id",
                table: "tasks");
        }
    }
}
