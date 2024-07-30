import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
} from "@chakra-ui/react";
import moment from "moment";
import { addStudent, updateStudent } from "../../services/students";

function InitialFocus({ groupId, isOpen, onClose, isEditMode, student }) {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [birthDay, setBirthday] = useState("");
  const [educationForm, setEducationForm] = useState("");

  useEffect(() => {
    if (isEditMode && student) {
      setName(student.firstName);
      setSurname(student.lastName);
      setMiddleName(student.middleName);
      setBirthday(moment(student.birthDate).format("YYYY-MM-DD")); // Форматируем дату
      setEducationForm(student.educationForm);
    } else {
      setName("");
      setSurname("");
      setMiddleName("");
      setBirthday("");
      setEducationForm("");
    }
  }, [isEditMode, student]);

  const handleSubmit = async () => {
    try {
      const studentData = {
        groupId,
        firstName: name,
        lastName: surname,
        middleName: middleName,
        birthDate: moment(birthDay).format("YYYY-MM-DD"), // Форматируем дату перед отправкой
        educationForm: Number(educationForm),
      };
      if (isEditMode) {
        await updateStudent(student.id, studentData);
      } else {
        await addStudent(studentData);
      }
      onClose();
    } catch (error) {
      console.error(
        `Error ${isEditMode ? "updating" : "adding"} student:`,
        error
      );
    }
  };

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {isEditMode ? "Редактировать студента" : "Добавить студента"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Имя</FormLabel>
            <Input
              ref={initialRef}
              placeholder="Имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Фамилия</FormLabel>
            <Input
              placeholder="Фамилия"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Отчество</FormLabel>
            <Input
              placeholder="Отчество"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Дата рождения</FormLabel>
            <Input
              type="date"
              placeholder="Дата рождения"
              value={birthDay}
              onChange={(e) => setBirthday(e.target.value)}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Форма обучения</FormLabel>
            <Select
              placeholder="Выберите форму обучения"
              value={educationForm}
              onChange={(e) => setEducationForm(e.target.value)}
            >
              <option value="1">Бюджет</option>
              <option value="2">Контракт</option>
            </Select>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose}>Отмена</Button>
          <Button colorScheme="teal" ml={3} onClick={handleSubmit}>
            {isEditMode ? "Сохранить" : "Добавить"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default InitialFocus;
