import { useEffect, useState } from "react";
import "./App.css";
import { Heading } from "@chakra-ui/react";
import SpecialityCard from "./components/SpecialityCard";
import { fetchSpecialities } from "./services/specialities";

function App() {
  const [specialityName, setSpecialityName] = useState("");
  const [activeGroups, setActiveGroups] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      fetchSpecialities();
    };

    fetchData();
  }, []);

  return (
    <section className="main">
      <div className="main__inner">
        <div className="heading-container">
          <Heading>Список специальностей</Heading>
        </div>
        <div className="cards-container">
          <SpecialityCard
            specialityName={specialityName}
            activeGroup={activeGroups}
          />
        </div>
      </div>
    </section>
  );
}

export default App;
