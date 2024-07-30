import React from "react";
import { Text, Grid, GridItem, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import "./styles/SpecialtyCard.css";

function SpecialtyCard({ specialtyId, specialtyName, activeGroup }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/specialties/${specialtyId}/groups`);
  };

  return (
    <article className="article">
      <Grid
        templateAreas={`"specialityTitle groupCount"
                        ". controls"`}
        gap={6}
      >
        <GridItem area={"specialityTitle"}>
          <Text fontSize="2xl" className="specialityTitle">
            {specialtyName}
          </Text>
        </GridItem>
        <GridItem area={"groupCount"} justifySelf="end">
          <Text textAlign="right" mt="2" fontSize="s" fontWeight="bold">
            Групп: {activeGroup}
          </Text>
        </GridItem>
        <GridItem area={"controls"} justifySelf="end">
          <Button
            border="2px solid black"
            bgColor="rgb(125, 170, 120)"
            color="white"
            onClick={handleClick}
          >
            Список групп
          </Button>
        </GridItem>
      </Grid>
    </article>
  );
}

export default SpecialtyCard;
