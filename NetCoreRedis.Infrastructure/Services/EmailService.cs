using Microsoft.Extensions.Configuration;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace NetCoreRedis.Infrastructure.Services;

public class EmailService(IConfiguration configuration) : IEmailService
{
    private readonly IConfiguration _config = configuration;

    public async Task Send(EmailRequestDto email)
    {
        var apiKey = _config.GetSection("EmailGrid:EmailKey").Value;
        var client = new SendGridClient(apiKey);
        var from = new EmailAddress(
            _config.GetSection("EmailGrid:EmailAddress").Value,
            _config.GetSection("EmailGrid:EmailUser").Value
        );
        var subject = "Sending with Twilio SendGrid is Fun";
        var to = new EmailAddress(email.To);
        var plainTextContent = email.Subject;
        var htmlContent = email.Message;
        var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);

        await client.SendEmailAsync(msg).ConfigureAwait(false);
    }
};
