import React from "react";
import { Text, Grid, GridItem, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import "./styles/StudentCard.css";

function StudentCard({
  studentId,
  studentName,
  studentSurname,
  studentMiddleName,
  studentBirth,
  studentEducationForm,
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/students/${studentId}`);
  };

  return (
    <article className="article">
      <Grid
        templateAreas={`"studentName ."
                        ". ."
                        "studentBirth controls"`}
        gridTemplateColumns={"2fr 1fr"}
        gap={6}
      >
        <GridItem area={"studentName"}>
          <Text fontSize="25px">{studentSurname}</Text>
          <Text fontSize="20px">{studentMiddleName}</Text>
          <Text fontSize="20px">{studentName}</Text>
        </GridItem>
        <GridItem area={"studentBirth"}>
          <Text fontSize="2xl">{studentEducationForm}</Text>
        </GridItem>
        <GridItem area={"controls"} justifySelf="end">
          <Button
            border="2px solid black"
            bgColor="red"
            color="white"
            onClick={handleClick}
          >
            Удалить
          </Button>
        </GridItem>
      </Grid>
    </article>
  );
}

export default StudentCard;
