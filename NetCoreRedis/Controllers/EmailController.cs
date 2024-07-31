using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NetCoreRedis.Entities;
using NetCoreRedis.Enums;
using NetCoreRedis.Infrastructure;
using NetCoreRedis.Infrastructure.Services;

namespace NetCoreRedis.Controllers
{
    [ApiController]
    [Route("api/email")]
    public class EmailController : ControllerBase
    {
        private readonly ILogger<EmailController> _logger;
        private readonly IEmailService _emailService;

        public EmailController(ILogger<EmailController> logger, IEmailService emailService)
        {
            _logger = logger;
            _emailService = emailService;
        }

        [HttpPost("send")]
        public async Task<ActionResult> SendEmail([FromBody] EmailRequestDto email)
        {
            await _emailService.Send(email);

            return Ok($"Email successfully sent to {email.To}!");
        }
    }
}
