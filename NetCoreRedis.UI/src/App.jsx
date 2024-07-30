// App.jsx
import React, { useEffect, useState } from "react";
import { Routes, Route, UNSAFE_LocationContext } from "react-router-dom";
import { Heading } from "@chakra-ui/react";
import SpecialtyCard from "./components/SpecialtyCard";
import Groups from "./Groups";
import Students from "./Students";
import { fetchSpecialties } from "./services/specialities.ts";
import "./App.css";

function App() {
  const [specialties, setSpecialties] = useState([]);

  useEffect(() => {
    const fetchSpecialtiesData = async () => {
      const data = await fetchSpecialties();
      setSpecialties(data);
    };
    fetchSpecialtiesData();
  }, []);

  return (
    <Routes>
      <Route
        path="/specialties"
        element={
          <section className="main">
            <div className="main__inner">
              <div className="heading-container">
                <Heading>Список специальностей</Heading>
              </div>
              <ul className="cards-container">
                {specialties.map((s) => (
                  <SpecialtyCard
                    key={s.specialtyId}
                    specialtyId={s.specialtyId}
                    specialtyName={s.specialtyName}
                    activeGroup={s.count}
                  />
                ))}
              </ul>
            </div>
          </section>
        }
      />
      <Route path="/specialties/:specialtyId/groups" element={<Groups />} />
      <Route path="/group/:groupId/students" element={<Students />} />
    </Routes>
  );
}

export default App;
