import axios from "axios";
import { format, parseISO } from 'date-fns';
import moment from 'moment';

const baseUrl = 'http://localhost:5198/api';

const EducationForm = {
    Budget: 1,
    Contract: 2
};

export const formatDate = (isoDate) => {
    const date = parseISO(isoDate);
    return format(date, 'dd.MM.yyyy');
  };

function getEducationalFormName(formId) {
    switch (formId) {
        case EducationForm.Budget:
            return 'Бюджет';
        case EducationForm.Contract:
            return 'Контракт';
        default:
            return 'Неизвестная форма';
    }
}

export const fetchStudents = async (groupId: number) => {
    try {
        const studentsData = await axios.get(`${baseUrl}/students`);
        // const filteredGroups = studentsData.data.filter(g => g.groupId === groupId);
        const enrichedGroups = studentsData.data.map(student => ({
            ...student,
            directionName: getEducationalFormName(student.educationForm)
        }));
        return enrichedGroups;
    } catch (e) {
        console.error(e);
        return [];
    }
}

export const addStudent = async (studentData) => {
    try {
        console.log(studentData);
        await axios.post(`${baseUrl}/students/create`, {
            groupId: studentData.groupId,
            firstName: studentData.firstName,
            lastName: studentData.lastName,
            middleName: studentData.middleName,
            birthDate: moment.utc(studentData.birthDate).format("YYYY-MM-DDTHH:mm:ss[Z]"),
            educationForm: studentData.educationForm
        });
    } catch (error) {
      console.error(`Error adding student:`, error);
      throw new Error(`Unable to adding student`);
    }
  };

export const deleteStudentById = async (studentId) => {
    try {
      await axios.delete(`${baseUrl}/students/${studentId}`);
      console.log(`Student with ID ${studentId} deleted successfully`);
    } catch (error) {
      console.error(`Error deleting student with ID ${studentId}:`, error);
      throw new Error(`Unable to delete student with ID ${studentId}`);
    }
  };