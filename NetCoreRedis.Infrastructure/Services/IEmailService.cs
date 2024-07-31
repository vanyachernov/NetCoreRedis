namespace NetCoreRedis.Infrastructure.Services;

public record EmailRequestDto (
    string To,
    string Subject,
    string Message
);

public interface IEmailService
{
    Task Send(EmailRequestDto email);
};
