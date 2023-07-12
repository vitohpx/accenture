using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace accenture_backend.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Empresas",
                columns: table => new
                {
                    CNPJ = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    NomeFantasia = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CEP = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Empresas", x => x.CNPJ);
                });

            migrationBuilder.CreateTable(
                name: "Fornecedores",
                columns: table => new
                {
                    CNPJCPF = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Nome = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CEP = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RG = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DataNascimento = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Fornecedores", x => x.CNPJCPF);
                });

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EmpresaFornecedor");

            migrationBuilder.DropTable(
                name: "Empresas");

            migrationBuilder.DropTable(
                name: "Fornecedores");
        }
    }
}
