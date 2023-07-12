using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace accenture_backend.Migrations
{
    /// <inheritdoc />
    public partial class Fornecedor : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EmpresaFornecedor");

            migrationBuilder.AddColumn<string>(
                name: "EmpresaCNPJ",
                table: "Fornecedores",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "EmpresaCNPJ1",
                table: "Fornecedores",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Fornecedores_EmpresaCNPJ1",
                table: "Fornecedores",
                column: "EmpresaCNPJ1");

            migrationBuilder.AddForeignKey(
                name: "FK_Fornecedores_Empresas_EmpresaCNPJ1",
                table: "Fornecedores",
                column: "EmpresaCNPJ1",
                principalTable: "Empresas",
                principalColumn: "CNPJ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Fornecedores_Empresas_EmpresaCNPJ1",
                table: "Fornecedores");

            migrationBuilder.DropIndex(
                name: "IX_Fornecedores_EmpresaCNPJ1",
                table: "Fornecedores");

            migrationBuilder.DropColumn(
                name: "EmpresaCNPJ",
                table: "Fornecedores");

            migrationBuilder.DropColumn(
                name: "EmpresaCNPJ1",
                table: "Fornecedores");

            migrationBuilder.CreateTable(
                name: "EmpresaFornecedor",
                columns: table => new
                {
                    EmpresasCNPJ = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    FornecedoresCNPJCPF = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmpresaFornecedor", x => new { x.EmpresasCNPJ, x.FornecedoresCNPJCPF });
                    table.ForeignKey(
                        name: "FK_EmpresaFornecedor_Empresas_EmpresasCNPJ",
                        column: x => x.EmpresasCNPJ,
                        principalTable: "Empresas",
                        principalColumn: "CNPJ",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EmpresaFornecedor_Fornecedores_FornecedoresCNPJCPF",
                        column: x => x.FornecedoresCNPJCPF,
                        principalTable: "Fornecedores",
                        principalColumn: "CNPJCPF",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_EmpresaFornecedor_FornecedoresCNPJCPF",
                table: "EmpresaFornecedor",
                column: "FornecedoresCNPJCPF");
        }
    }
}
