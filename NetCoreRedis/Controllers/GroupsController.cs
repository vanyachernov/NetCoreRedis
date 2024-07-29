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
        public async Task<IActionResult> Get()
        {
            // Check cache data
            var cacheData = _cacheService.GetData<IEnumerable<GroupEntity>>("groups");

            if (cacheData != null && cacheData.Count() > 0)
            {
                return Ok(cacheData);
            }

            cacheData = await _context
                .Groups
                .ToListAsync();

            // Set expiry time
            var expiryTime = DateTimeOffset.Now.AddSeconds(30);
            _cacheService.SetData<IEnumerable<GroupEntity>>("groups", cacheData, expiryTime);

            return Ok(cacheData);
        }

        [HttpPost("create")]
        public async Task<IActionResult> Post([FromBody] GroupRequestDto group)
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

            var newGroup = await _context.Groups
                .AddAsync(newGroupEntity);

            var expiryTime = DateTimeOffset.Now.AddSeconds(30);
            _cacheService.SetData<GroupEntity>($"group{newGroupEntity.Id}", newGroup.Entity, expiryTime);

            await _context.SaveChangesAsync();

            return Ok(newGroup.Entity);
        }

        [HttpDelete("{groupId:guid}")]
        public async Task<IActionResult> Delete([FromRoute] Guid groupId)
        {
            var group = await _context.Groups
                .FirstOrDefaultAsync(g => g.Id == groupId);

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
