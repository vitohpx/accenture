﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using accenture_backend.DataContext;

#nullable disable

namespace accenture_backend.Migrations
{
    [DbContext(typeof(ApiDbContext))]
    [Migration("20230712192418_Initial")]
    partial class Initial
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.0-preview.6.23329.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("EmpresaFornecedor", b =>
                {
                    b.Property<string>("EmpresasCNPJ")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("FornecedoresCNPJCPF")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("EmpresasCNPJ", "FornecedoresCNPJCPF");

                    b.HasIndex("FornecedoresCNPJCPF");

                    b.ToTable("EmpresaFornecedor");
                });

            modelBuilder.Entity("accenture_backend.Models.Empresa", b =>
                {
                    b.Property<string>("CNPJ")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("CEP")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NomeFantasia")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("CNPJ");

                    b.ToTable("Empresas");
                });

            modelBuilder.Entity("accenture_backend.Models.Fornecedor", b =>
                {
                    b.Property<string>("CNPJCPF")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("CEP")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("DataNascimento")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RG")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("CNPJCPF");

                    b.ToTable("Fornecedores");
                });

            modelBuilder.Entity("EmpresaFornecedor", b =>
                {
                    b.HasOne("accenture_backend.Models.Empresa", null)
                        .WithMany()
                        .HasForeignKey("EmpresasCNPJ")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("accenture_backend.Models.Fornecedor", null)
                        .WithMany()
                        .HasForeignKey("FornecedoresCNPJCPF")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
