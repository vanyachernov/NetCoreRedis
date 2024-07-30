import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StudentCard from "./components/StudentCard";
import { Heading, Button } from "@chakra-ui/react";
import { fetchStudents, formatDate } from "./services/students";
import { useDisclosure } from "@chakra-ui/react";
import InitialFocus from "./components/dialogs/InitialFocus";

function Students() {
  const { groupId } = useParams();
  const [students, setStudents] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchStudentsData = async () => {
      const data = await fetchStudents(groupId);
      setStudents(data);
    };
    fetchStudentsData();
  }, [groupId]);

  const handleAddStudent = (newStudent) => {
    setStudents((prevStudents) => [...prevStudents, newStudent]);
  };

  return (
    <div>
      <div className="heading-container">
        <Heading>Список студентов</Heading>
        <Button bg="teal" color="white" onClick={onOpen}>
          Добавить студента
        </Button>
      </div>
      <ul className="students-container">
        {students.map((student) => (
          <StudentCard
            key={student.id}
            groupId={groupId}
            studentId={student.id}
            studentName={student.firstName}
            studentMiddleName={student.middleName}
            studentSurname={student.lastName}
            studentBirth={formatDate(student.birthDate)}
            studentEducationForm={student.directionName}
          />
        ))}
      </ul>
      <InitialFocus groupId={groupId} isOpen={isOpen} onClose={onClose} onAddStudent={handleAddStudent}/>
    </div>
  );
}

export default Students;
