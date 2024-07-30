import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StudentCard from "./components/StudentCard";
import { Heading, Button, Flex } from "@chakra-ui/react";
import { fetchStudents, formatDate } from "./services/students";
import { useDisclosure } from "@chakra-ui/react";
import InitialFocus from "./components/dialogs/InitialFocus";

function Students() {
  const { groupId } = useParams();
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchStudentsData = async () => {
      const data = await fetchStudents(groupId);
      setStudents(data);
    };
    fetchStudentsData();
  }, [groupId]);

  const handleAddStudent = () => {
    setSelectedStudent(null);
    setIsEditMode(false);
    onOpen();
  };

  const handleEditStudent = (student) => {
    setSelectedStudent(student);
    setIsEditMode(true);
    onOpen();
  };

  return (
    <div>
      <div className="heading-container">
        <Heading>Список студентов</Heading>
        <Button bg="teal" color="white" onClick={handleAddStudent}>
          Добавить студента
        </Button>
      </div>
      <div className="students-wrapper">
        {students.length > 0 ? (
          <ul className="students-container">
            {students.map((student) => (
              <StudentCard
                key={student.id}
                student={student}
                onEdit={handleEditStudent}
              />
            ))}
          </ul>
        ) : (
          <Flex
            direction="row"
            justifyContent="center"
            alignItems="center"
            color="red"
            textAlign="center"
            height="100%"
          >
            <Heading fontSize="2xl">
              Студентов в этой группе пока нет, но Вы можете их добавить, нажав
              на кнопку "Добавить студента"!
            </Heading>
          </Flex>
        )}
      </div>
      <InitialFocus
        groupId={groupId}
        isOpen={isOpen}
        onClose={onClose}
        isEditMode={isEditMode}
        student={selectedStudent}
      />
    </div>
  );
}

export default Students;
