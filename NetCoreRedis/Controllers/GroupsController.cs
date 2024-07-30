using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NetCoreRedis.Entities;
using NetCoreRedis.Enums;
using NetCoreRedis.Infrastructure;
using NetCoreRedis.Infrastructure.Services;

namespace NetCoreRedis.Controllers
{
    [ApiController]
    [Route("api/groups")]
    public class GroupsController : ControllerBase
    {
        private readonly ILogger<GroupsController> _logger;
        private readonly ICacheService _cacheService;
        private readonly ApplicationDbContext _context;

        public GroupsController(
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
        public async Task<ActionResult<IEnumerable<GroupResponseDto>>> Get()
        {
            var cachedGroups = _cacheService.GetData<IEnumerable<GroupResponseDto>>("groups");

            if (cachedGroups != null && cachedGroups.Any())
            {
                return Ok(cachedGroups);
            }

            var groups = await _context.Groups.Include(g => g.Students).ToListAsync();

            var groupResponseDtos = groups
                .Select(g => new GroupResponseDto(
                    Id: g.Id,
                    EnrolmentYear: g.EnrolmentYear,
                    Specialty: (int)g.Specialty,
                    Semester: g.CurrentSemester,
                    CreatedDate: g.CreatedDate,
                    UpdatedDate: g.UpdatedDate,
                    Students: g.Students.Select(s => new StudentResponseDto(
                            Id: s.Id,
                            GroupId: s.GroupId,
                            FirstName: s.FirstName,
                            MiddleName: s.MiddleName,
                            LastName: s.LastName,
                            BirthDate: s.DateOfBirth,
                            EducationForm: (int)s.EducationForm
                        ))
                        .ToList()
                ))
                .ToList();

            var expiryTime = DateTimeOffset.Now.AddSeconds(30);
            _cacheService.SetData("groups", groupResponseDtos, expiryTime);

            return Ok(groupResponseDtos);
        }

        [HttpPost("create")]
        public async Task<ActionResult<GroupResponseDto>> Post([FromBody] GroupRequestDto group)
        {
            var newGroupEntity = new GroupEntity
            {
                Id = Guid.NewGuid(),
                EnrolmentYear = group.EnrolmentYear,
                Specialty = (SpecialtyEntity)group.Specialty,
                CurrentSemester = group.Semester,
                CreatedDate = DateTime.UtcNow,
                UpdatedDate = DateTime.UtcNow
            };

            var newGroup = await _context.Groups.AddAsync(newGroupEntity);

            var expiryTime = DateTimeOffset.Now.AddSeconds(30);
            _cacheService.SetData<GroupEntity>(
                $"group{newGroupEntity.Id}",
                newGroup.Entity,
                expiryTime
            );

            await _context.SaveChangesAsync();

            var newGroupEntityDto = new GroupResponseDto(
                newGroupEntity.Id,
                newGroupEntity.EnrolmentYear,
                (int)newGroupEntity.Specialty,
                newGroupEntity.CurrentSemester,
                newGroupEntity.CreatedDate,
                newGroupEntity.UpdatedDate
            );

            return Ok(newGroupEntityDto);
        }

        [HttpDelete("{groupId:guid}")]
        public async Task<IActionResult> Delete([FromRoute] Guid groupId)
        {
            var group = await _context.Groups.FirstOrDefaultAsync(g => g.Id == groupId);

            if (group == null)
            {
                return NotFound();
            }

            _context.Remove(group);
            _cacheService.RemoveData($"group{groupId}");
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
