using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddUsernameAndRemoveInvalidColumns : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "first_name",
                table: "people");

            migrationBuilder.RenameColumn(
                name: "last_name",
                table: "people",
                newName: "username");

            migrationBuilder.UpdateData(
                table: "people",
                keyColumn: "id",
                keyValue: 1001L,
                column: "username",
                value: "admin");

            migrationBuilder.UpdateData(
                table: "people",
                keyColumn: "id",
                keyValue: 1002L,
                column: "username",
                value: "gideon");

            migrationBuilder.UpdateData(
                table: "people",
                keyColumn: "id",
                keyValue: 1003L,
                column: "username",
                value: "guest");

            migrationBuilder.CreateIndex(
                name: "ix_people_username",
                table: "people",
                column: "username",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "ix_people_username",
                table: "people");

            migrationBuilder.RenameColumn(
                name: "username",
                table: "people",
                newName: "last_name");

            migrationBuilder.AddColumn<string>(
                name: "first_name",
                table: "people",
                type: "character varying(20)",
                maxLength: 20,
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "people",
                keyColumn: "id",
                keyValue: 1001L,
                columns: new[] { "first_name", "last_name" },
                values: new object[] { "Tms", "Admin" });

            migrationBuilder.UpdateData(
                table: "people",
                keyColumn: "id",
                keyValue: 1002L,
                columns: new[] { "first_name", "last_name" },
                values: new object[] { "Gideon", "Tms" });

            migrationBuilder.UpdateData(
                table: "people",
                keyColumn: "id",
                keyValue: 1003L,
                columns: new[] { "first_name", "last_name" },
                values: new object[] { "Guest", "Tms" });
        }
    }
}
