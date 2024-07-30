using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NetCoreRedis.Entities;
using NetCoreRedis.Enums;
using NetCoreRedis.Infrastructure;
using NetCoreRedis.Infrastructure.Services;

namespace NetCoreRedis.Controllers
{
    [ApiController]
    [Route("api/students")]
    public class StudentsController : ControllerBase
    {
        private readonly ILogger<GroupsController> _logger;
        private readonly ICacheService _cacheService;
        private readonly ApplicationDbContext _context;

        public StudentsController(
            ILogger<GroupsController> logger,
            ICacheService cacheService,
            ApplicationDbContext context
        )
        {
            _logger = logger;
            _cacheService = cacheService;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<StudentResponseDto>>> Get()
        {
            // Check cache data
            var cachedStudents = _cacheService.GetData<IEnumerable<StudentResponseDto>>("students");

            if (cachedStudents != null && cachedStudents.Count() > 0)
            {
                return Ok(cachedStudents);
            }

            var students = await _context.Students.Include(s => s.Group).ToListAsync();

            var studentResponseDtos = students
                .Select(s => new StudentResponseDto(
                    Id: s.Id,
                    GroupId: s.GroupId,
                    FirstName: s.FirstName,
                    MiddleName: s.MiddleName,
                    LastName: s.LastName,
                    BirthDate: s.DateOfBirth,
                    EducationForm: (int)s.EducationForm
                ))
                .ToList();

            // Set expiry time
            var expiryTime = DateTimeOffset.Now.AddSeconds(30);
            _cacheService.SetData("students", studentResponseDtos, expiryTime);

            return Ok(studentResponseDtos);
        }

        [HttpPost("create")]
        public async Task<ActionResult<StudentResponseDto>> Post(
            [FromBody] StudentRequestDto student
        )
        {
            var newStudentEntity = new StudentEntity
            {
                Id = Guid.NewGuid(),
                GroupId = student.GroupId,
                FirstName = student.FirstName,
                MiddleName = student.MiddleName,
                LastName = student.LastName,
                DateOfBirth = student.BirthDate,
                EducationForm = (EducationFormEntity)student.EducationForm
            };

            var newStudent = await _context.Students.AddAsync(newStudentEntity);

            var expiryTime = DateTimeOffset.Now.AddSeconds(30);
            _cacheService.SetData<StudentEntity>(
                $"student{newStudentEntity.Id}",
                newStudent.Entity,
                expiryTime
            );

            await _context.SaveChangesAsync();

            var newStudentEntityDto = new StudentResponseDto(
                newStudentEntity.Id,
                newStudentEntity.GroupId,
                newStudentEntity.FirstName,
                newStudentEntity.MiddleName,
                newStudentEntity.LastName,
                newStudentEntity.DateOfBirth,
                (int)newStudentEntity.EducationForm
            );

            return Ok(newStudentEntityDto);
        }

        [HttpDelete("{studentId:guid}")]
        public async Task<IActionResult> Delete([FromRoute] Guid studentId)
        {
            var student = await _context.Students.FirstOrDefaultAsync(g => g.Id == studentId);

            if (student == null)
            {
                return NotFound();
            }

            _context.Remove(student);
            _cacheService.RemoveData($"student{studentId}");
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
