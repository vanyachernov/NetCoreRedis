import React, { useState } from "react";
import {
  Flex,
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

function StudentCard({ student, onEdit }) {
  const { id, firstName, lastName, middleName, birthDate, directionName } =
    student;
  const [isDeleting, setIsDeleting] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const navigate = useNavigate();

  const handleDelete = async () => {
    await deleteStudentById(id);
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
          <Text fontSize="25px">{lastName}</Text>
          <Text fontSize="20px">{firstName}</Text>
          <Text fontSize="20px">{middleName}</Text>
        </GridItem>
        <GridItem area={"studentBirth"} justifySelf="end" pt="2">
          <Text fontSize="18px">{formatDate(birthDate)}</Text>
        </GridItem>
        <GridItem area={"studentForm"}>
          <Text fontSize="2xl">{directionName}</Text>
        </GridItem>
        <GridItem area={"controls"} justifySelf="end">
          <Flex gap={3}>
            <Button
              border="2px solid black"
              bgColor="teal"
              color="white"
              onClick={() => onEdit(student)}
            >
              Редактировать
            </Button>
            <Button
              border="2px solid black"
              bgColor="red"
              color="white"
              onClick={onOpen}
            >
              Удалить
            </Button>
          </Flex>
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
