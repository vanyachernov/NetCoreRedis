import axios from "axios";

const baseUrl = 'http://localhost:5198/api';

const Specialty = {
  SoftwareEngineering: 121,
  ComputerEngineering: 123
};

function getSpecialtyName(specialtyId) {
    switch (specialtyId) {
        case Specialty.SoftwareEngineering:
            return 'Инженерия программного обеспечения';
        case Specialty.ComputerEngineering:
            return 'Компьютерная инженерия';
        default:
            return 'Неизвестная специальность';
    }
}

function countGroupsBySpecialty(groups) {
  const countMap = {};

  groups.forEach(group => {
      const specialtyId = group.specialty;
      if (!countMap[specialtyId]) {
          countMap[specialtyId] = {
              specialtyName: getSpecialtyName(specialtyId),
              specialtyId: specialtyId,
              count: 0
          };
      }
      countMap[specialtyId].count += 1;
  });

  return Object.values(countMap);
}

export const fetchSpecialties = async () => {
    try {
        const groupsData = await axios.get(`${baseUrl}/groups`);
        const specialitiesData = countGroupsBySpecialty(groupsData.data);
        return specialitiesData;
    } catch (e) {
        console.error(e);
        return [];
    }
}
