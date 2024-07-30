import React, { useState } from "react";
import {
  Text,
  Grid,
  GridItem,
  Button,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { deleteStudentById, formatDate } from "../services/students";
import "./styles/StudentCard.css";

function StudentCard({
  studentId,
  studentName,
  studentSurname,
  studentMiddleName,
  studentBirth,
  studentEducationForm,
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/students/${studentId}`);
  };

  const handleDelete = async () => {
    await deleteStudentById(studentId);
    setIsDeleting(false);
  };

  return (
    <article className="article">
      <Grid
        templateAreas={`"studentName studentBirth"
                        ". ."
                        "studentForm controls"`}
        gridTemplateColumns={"2fr 1fr"}
        gap={6}
      >
        <GridItem area={"studentName"}>
          <Text fontSize="25px">{studentSurname}</Text>
          <Text fontSize="20px">{studentName}</Text>
          <Text fontSize="20px">{studentMiddleName}</Text>
        </GridItem>
        <GridItem area={"studentBirth"} justifySelf="end" pt="2">
          <Text fontSize="18px">{studentBirth}</Text>
        </GridItem>
        <GridItem area={"studentForm"}>
          <Text fontSize="2xl">{studentEducationForm}</Text>
        </GridItem>
        <GridItem area={"controls"} justifySelf="end">
          <Button
            border="2px solid black"
            bgColor="red"
            color="white"
            onClick={onOpen}
          >
            Удалить
          </Button>
        </GridItem>
      </Grid>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Удаление студента
            </AlertDialogHeader>

            <AlertDialogBody>
              Вы уверены, что хотите удалить студента? Восстановление
              невозможно.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Отменить
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Удалить
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </article>
  );
}

export default StudentCard;
