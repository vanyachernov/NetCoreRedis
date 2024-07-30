import axios from "axios";

const baseUrl = 'http://localhost:5198/api';

const Specialty = {
    SoftwareEngineering: 121,
    ComputerEngineering: 123
  };

function getDirectionName(specialtyId) {
    switch (specialtyId) {
        case Specialty.SoftwareEngineering:
            return 'П';
        case Specialty.ComputerEngineering:
            return 'Е';
        default:
            return 'Неизвестное направление';
    }
}

function getGroupName(specialtyId, admissionYear) {
    const directionInitial = getDirectionName(specialtyId);
    const admissionYearLastDigit = admissionYear % 10;

    return `${directionInitial}-${admissionYearLastDigit}`;
  }

export const fetchGroups = async () => {
    try {
        const groupsData = await axios.get(`${baseUrl}/groups`);
        return groupsData.data;
    } catch (e) {
        console.error(e);
        return [];
    }
}

export const fetchGroupsBySpecialtyId = async (specialtyId: number) => {
    try {
        const groupsData = await axios.get(`${baseUrl}/groups`);
        const filteredGroups = groupsData.data.filter(g => g.specialty === specialtyId);
        const enrichedGroups = filteredGroups.map(group => ({
            ...group,
            directionName: getDirectionName(specialtyId),
            groupName: getGroupName(specialtyId, group.enrolmentYear)
        }));
        return enrichedGroups;
    } catch (e) {
        console.error(e);
        return [];
    }
}