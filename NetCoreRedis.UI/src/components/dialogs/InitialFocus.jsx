import React, { useState } from "react";
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
import { useDisclosure } from "@chakra-ui/react";
import { addStudent } from "../../services/students";

function InitialFocus({ groupId, isOpen, onClose, onAddStudent }) {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [birthDay, setBirthday] = useState("");
  const [educationForm, setEducationForm] = useState("");

  const handleSubmit = async () => {
    try {
      const studentData = {
        groupId,
        firstName: name,
        lastName: surname,
        middleName: middleName,
        birthDate: birthDay,
        educationForm: Number(educationForm),
      };
      await addStudent(studentData);
      onAddStudent(studentData);
      onClose();
    } catch (error) {
      console.error("Error adding student:", error);
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
        <ModalHeader>Добавить студента</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Имя</FormLabel>
            <Input
              ref={initialRef}
              placeholder="Имя"
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Фамилия</FormLabel>
            <Input
              placeholder="Фамилия"
              onChange={(e) => setSurname(e.target.value)}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Отчество</FormLabel>
            <Input
              placeholder="Отчество"
              onChange={(e) => setMiddleName(e.target.value)}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Дата рождения</FormLabel>
            <Input
              type="date"
              placeholder="Дата рождения"
              onChange={(e) => setBirthday(e.target.value)}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Форма обучения</FormLabel>
            <Select
              placeholder="Выберите форму обучения"
              onChange={(e) => setEducationForm(e.target.value)}
            >
              <option value="1">Бюджет</option>
              <option value="2">Контракт</option>
            </Select>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={handleSubmit}>
            Сохранить
          </Button>
          <Button onClick={onClose}>Отмена</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default InitialFocus;
