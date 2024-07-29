public record StudentRequestDto(
    Guid GroupId,
    string FirstName,
    string MiddleName,
    string LastName,
    DateTime BirthDate,
    int EducationForm
);

public record StudentResponseDto(
    Guid Id,
    string FirstName,
    string MiddleName,
    string LastName,
    DateTime BirthDate,
    int EducationForm
);
