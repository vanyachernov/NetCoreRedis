import React, { useEffect, useState } from "react";
import { fetchGroupsBySpecialtyId } from "./services/groups";
import { useParams } from "react-router-dom";
import GroupCard from "./components/GroupCard";
import { Heading, Flex } from "@chakra-ui/react";
import "./Group.css";

function Groups() {
  const { specialtyId } = useParams();
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroupsData = async () => {
      const data = await fetchGroupsBySpecialtyId(Number(specialtyId));
      setGroups(data);
    };
    fetchGroupsData();
  }, [specialtyId]);

  return (
    <div>
      <Flex alignItems="center" flexDirection="column">
        <Heading>Список групп</Heading>
        <Heading fontSize="2xl" pt="2" pb="4">
          Специальность: {specialtyId}
        </Heading>
      </Flex>
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
