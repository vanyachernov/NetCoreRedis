public record GroupRequestDto (
    int EnrolmentYear,
    int Specialty,
    int Semester
);

public record GroupResponseDto(
    Guid Id,
    int EnrolmentYear,
    int Specialty,
    int Semester,
    DateTime CreatedDate,
    DateTime UpdatedDate,
    List<StudentResponseDto>? Students = null
);