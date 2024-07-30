import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StudentCard from "./components/StudentCard";
import { Heading, Text } from "@chakra-ui/react";
import { fetchStudents, formatDate } from "./services/students";

function Students() {
  const { groupId } = useParams();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudentsData = async () => {
      const data = await fetchStudents(groupId);
      setStudents(data);
    };
    fetchStudentsData();
  }, [groupId]);

  return (
    <div>
      <div className="heading-container">
        <Heading>Список студентов</Heading>
      </div>
      <ul className="students-container">
        {students.map((student) => (
          <StudentCard
            key={student.id}
            studentId={student.id}
            studentName={student.firstName}
            studentMiddleName={student.middleName}
            studentSurname={student.lastName}
            studentEducationForm={student.directionName}
          />
        ))}
      </ul>
    </div>
  );
}

export default Students;
