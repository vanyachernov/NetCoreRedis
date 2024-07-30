import React from "react";
import { Text, Grid, GridItem, Button } from "@chakra-ui/react";
import "./styles/SpecialityCard.css";

function SpecialityCard({ specialityName, activeGroup }) {
  return (
    <article className="article">
      <Grid
        templateAreas={`"specialityTitle groupCount"
                              ". controls"`}
        gap={6}
      >
        <GridItem area={"specialityTitle"}>
          <Text fontSize="2xl" className="specialityTitle">
            {specialityName}
          </Text>
        </GridItem>
        <GridItem area={"groupCount"} justifySelf="end">
          <Text textAlign="right" mt="2" fontSize="s" fontWeight="bold">
            Активных групп: {activeGroup}
          </Text>
        </GridItem>
        <GridItem area={"controls"} justifySelf="end">
          <Button
            border="2px solid black"
            bgColor="rgb(125, 170, 120)"
            color="white"
          >
            Список групп
          </Button>
        </GridItem>
      </Grid>
    </article>
  );
}

export default SpecialityCard;
