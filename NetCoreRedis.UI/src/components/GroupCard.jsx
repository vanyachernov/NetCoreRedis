import React from "react";
import { Text, Grid, GridItem, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import "./styles/GroupCard.css";

function GroupCard({
  groupId,
  groupName,
  groupYear,
  groupSemester,
  studentsAmount,
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/group/${groupId}/students`);
  };

  return (
    <article className="article">
      <Grid
        templateAreas={`"groupTitle groupCount"
                        ". ."
                        "groupSemester controls"`}
        gridTemplateColumns={"2fr 1fr"}
        gap={6}
      >
        <GridItem area={"groupTitle"}>
          <Text fontSize="2xl">{groupName}</Text>
          <Text>{groupYear}</Text>
        </GridItem>
        <GridItem area={"groupCount"} justifySelf="end">
          <Text textAlign="right" mt="2" fontSize="s" fontWeight="bold">
            Студентов: {studentsAmount}
          </Text>
        </GridItem>
        <GridItem area={"groupSemester"}>
          <Text fontSize="2xl">{groupSemester}-й cеместр</Text>
        </GridItem>
        <GridItem area={"controls"} justifySelf="end">
          <Button
            border="2px solid black"
            bgColor="rgb(125, 170, 120)"
            color="white"
            onClick={handleClick}
          >
            Детальнее
          </Button>
        </GridItem>
      </Grid>
    </article>
  );
}

export default GroupCard;
