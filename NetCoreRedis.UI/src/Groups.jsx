import React, { useEffect, useState } from "react";
import { fetchGroupsBySpecialtyId } from "./services/groups";
import { useParams } from "react-router-dom";
import GroupCard from "./components/GroupCard";
import { Heading, Text } from "@chakra-ui/react";

function Groups() {
  const { specialtyId } = useParams();
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroupsData = async () => {
      const data = await fetchGroupsBySpecialtyId(Number(specialtyId));
      console.log(data);
      setGroups(data);
    };
    fetchGroupsData();
  }, [specialtyId]);

  return (
    <div>
      <div className="heading-container">
        <Heading>Список групп</Heading>
        <Heading fontSize="3xl" pt="2">
          Специальность: {specialtyId}
        </Heading>
      </div>
      <ul className="groups-container">
        {groups.map((g) => (
          <GroupCard
            key={g.id}
            groupId={g.id}
            groupName={g.groupName}
            groupYear={g.enrolmentYear}
            groupSemester={g.semester}
            studentsAmount={g.students.length}
          />
        ))}
      </ul>
    </div>
  );
}

export default Groups;
