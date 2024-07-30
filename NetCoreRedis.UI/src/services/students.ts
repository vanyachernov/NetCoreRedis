import axios from "axios";
import { format, parseISO } from 'date-fns';

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
        console.log(enrichedGroups);
        return enrichedGroups;
    } catch (e) {
        console.error(e);
        return [];
    }
}