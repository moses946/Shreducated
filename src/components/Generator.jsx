import { useState } from "react";
import { SCHEMES, WORKOUTS } from "../utils/swoldier";
import SectionWrapper from "./SectionWrapper";
import Button from "./Button";

function Header(props) {
  const { index, title, description } = props;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-center gap-2">
        <p className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-400">
          {index}
        </p>
        <h4 className="text-xl sm:text-2xl md:text-3xl">{title}</h4>
      </div>
      <p className="text-sm sm:text-base mx-auto">{description}</p>
    </div>
  );
}

Header.propTypes = {
  title: String,
  description: String,
  index: String,
};

export default function Generator(props) {
  const {
    poison,
    setPoison,
    goals,
    setGoals,
    muscleGroups,
    setMuscleGroups,
    generateWorkout,
  } = props;
  const [showModal, setShowModal] = useState(false);

  function updateMuscles(muscleGroup) {
    if (muscleGroups.includes(muscleGroup)) {
      setMuscleGroups(
        muscleGroups.filter((setMuscle) => setMuscle !== muscleGroup)
      );
      return;
    }

    if (muscleGroups.length > 2) {
      return;
    }
    if (poison !== "individual") {
      setMuscleGroups([muscleGroup]);
      setShowModal(false);
      return;
    }

    setMuscleGroups([...muscleGroups, muscleGroup]);

    if (muscleGroups.length === 2) {
      setShowModal(false);
      return;
    }
  }

  function toggleModal() {
    setShowModal(!showModal);
  }
  return (
    <SectionWrapper
      header={"generate your workout"}
      title={["Your", "Shreducation", "begins now"]}
      id={"generate"}
    >
      <Header
        index={"01"}
        title={"Pick your poison"}
        description={"Select the workout you wish to endure."}
      />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Object.keys(WORKOUTS).map((type, typeIndex) => {
          return (
            <button
              onClick={() => {
                setMuscleGroups([]);
                setPoison(type);
              }}
              key={typeIndex}
              className={
                "bg-slate-950 border  py-3 rounded-lg duration-200  hover:border-blue-400 " +
                (type === poison ? "border-blue-600" : "border-slate-950")
              }
            >
              <p className="capitalize">{type.replaceAll("_", " ")}</p>
            </button>
          );
        })}
      </div>

      <Header
        index={"02"}
        title={"Lock on targets"}
        description={"Select the muscles judged for annihilation."}
      />
      <div className="bg-slate-950 p-1 rounded-lg flex flex-col">
        <button
          className={
            "relative  p-3 flex items-center justify-center " +
            (showModal && "border-b border-blue-400")
          }
          onClick={toggleModal}
        >
          <p className="capitalize">
            {muscleGroups.length === 0
              ? "Select muscle groups"
              : muscleGroups.map((val, idx) => {
                  return idx !== 0 ? <span> & {val}</span> : <span>{val}</span>;
                })}
          </p>
          <i className="fa-solid fa-caret-down absolute right-3 top-1/2 -translate-y-1/2 "></i>
        </button>
        {showModal && (
          <div className="flex flex-col">
            {(poison === "individual"
              ? WORKOUTS[poison]
              : Object.keys(WORKOUTS[poison])
            ).map((muscleGroup, muscleGroupIndex) => {
              return (
                <button
                  key={muscleGroupIndex}
                  onClick={() => {
                    updateMuscles(muscleGroup);
                  }}
                  className={
                    muscleGroups.includes(muscleGroup) && "text-blue-600 px-4"
                  }
                >
                  <p className="capitalize p-2 text-center hover:text-blue-600">
                    {muscleGroup}
                  </p>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <Header
        index={"03"}
        title={"Become Juggernaut"}
        description={"Select your ultimate objective."}
      />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {Object.keys(SCHEMES).map((scheme, schemeIndex) => {
          return (
            <button
              onClick={() => {
                setGoals(scheme);
              }}
              key={schemeIndex}
              className={
                "bg-slate-950 border  py-3 px-4 rounded-lg duration-200  hover:border-blue-400 " +
                (scheme === goals ? "border-blue-600" : "border-slate-950")
              }
            >
              <p className="capitalize">{scheme.replaceAll("_", " & ")}</p>
            </button>
          );
        })}
      </div>

      <Button title={"Formulate"} func={generateWorkout} />
    </SectionWrapper>
  );
}

Generator.propTypes = {
  poison: String,
  muscleGroups: Array,
  goals: String,
  setPoison: Function,
  setMuscleGroups: Function,
  setGoals: Function,
  generateWorkout: Function,
};
