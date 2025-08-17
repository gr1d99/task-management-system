using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class RenameTaskNameField : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "ix_tasks_name",
                table: "tasks");

            migrationBuilder.DropColumn(
                name: "name",
                table: "tasks");

            migrationBuilder.AddColumn<string>(
                name: "title",
                table: "tasks",
                type: "character varying(255)",
                maxLength: 255,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "title",
                table: "tasks");

            migrationBuilder.AddColumn<string>(
                name: "name",
                table: "tasks",
                type: "character varying(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "ix_tasks_name",
                table: "tasks",
                column: "name",
                unique: true);
        }
    }
}
