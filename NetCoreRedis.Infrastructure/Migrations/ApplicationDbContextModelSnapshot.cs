﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using NetCoreRedis.Infrastructure;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace NetCoreRedis.Infrastructure.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.7")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("NetCoreRedis.Entities.GroupEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("CurrentSemester")
                        .HasColumnType("integer");

                    b.Property<int>("EnrolmentYear")
                        .HasColumnType("integer");

                    b.Property<int>("Specialty")
                        .HasColumnType("integer");

                    b.Property<DateTime>("UpdatedDate")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.ToTable("Groups");

                    b.HasData(
                        new
                        {
                            Id = new Guid("91978d64-07e7-49f5-affe-970111a5cb7f"),
                            CreatedDate = new DateTime(2024, 7, 29, 11, 14, 40, 491, DateTimeKind.Utc).AddTicks(7720),
                            CurrentSemester = 1,
                            EnrolmentYear = 2024,
                            Specialty = 121,
                            UpdatedDate = new DateTime(2024, 7, 29, 11, 14, 40, 491, DateTimeKind.Utc).AddTicks(7720)
                        },
                        new
                        {
                            Id = new Guid("1789d03a-2d43-4509-8aed-abd93c446e02"),
                            CreatedDate = new DateTime(2024, 7, 29, 11, 14, 40, 491, DateTimeKind.Utc).AddTicks(7740),
                            CurrentSemester = 1,
                            EnrolmentYear = 2024,
                            Specialty = 123,
                            UpdatedDate = new DateTime(2024, 7, 29, 11, 14, 40, 491, DateTimeKind.Utc).AddTicks(7740)
                        },
                        new
                        {
                            Id = new Guid("e166885b-f6ab-4b1d-97d6-4fcb2b8b52e8"),
                            CreatedDate = new DateTime(2024, 7, 29, 11, 14, 40, 491, DateTimeKind.Utc).AddTicks(7750),
                            CurrentSemester = 1,
                            EnrolmentYear = 2024,
                            Specialty = 121,
                            UpdatedDate = new DateTime(2024, 7, 29, 11, 14, 40, 491, DateTimeKind.Utc).AddTicks(7750)
                        },
                        new
                        {
                            Id = new Guid("764bca2e-0220-42a7-9123-3794480b5496"),
                            CreatedDate = new DateTime(2024, 7, 29, 11, 14, 40, 491, DateTimeKind.Utc).AddTicks(7750),
                            CurrentSemester = 1,
                            EnrolmentYear = 2021,
                            Specialty = 123,
                            UpdatedDate = new DateTime(2024, 7, 29, 11, 14, 40, 491, DateTimeKind.Utc).AddTicks(7750)
                        });
                });

            modelBuilder.Entity("NetCoreRedis.Entities.StudentEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime>("DateOfBirth")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("EducationForm")
                        .HasColumnType("integer");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<Guid>("GroupId")
                        .HasColumnType("uuid");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("MiddleName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("GroupId");

                    b.ToTable("Students");
                });

            modelBuilder.Entity("NetCoreRedis.Entities.StudentEntity", b =>
                {
                    b.HasOne("NetCoreRedis.Entities.GroupEntity", "Group")
                        .WithMany("Students")
                        .HasForeignKey("GroupId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Group");
                });

            modelBuilder.Entity("NetCoreRedis.Entities.GroupEntity", b =>
                {
                    b.Navigation("Students");
                });
#pragma warning restore 612, 618
        }
    }
}
