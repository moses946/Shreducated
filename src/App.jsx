import { useState } from "react";
import Generator from "./components/Generator";
import Hero from "./components/Hero";
import Workout from "./components/Workout";
import { generateWorkout } from "./utils/Functions";

export default function App() {
  const [workout, setWorkout] = useState(null);
  const [poison, setPoison] = useState("individual");
  const [muscleGroups, setMuscleGroups] = useState([]);
  const [goals, setGoals] = useState("strength_power");

  function updateWorkout() {
    if (muscleGroups.length < 1) {
      return;
    }
    let newWorkout = generateWorkout({ poison, muscleGroups, goals });
    setWorkout(newWorkout);
    setTimeout(()=>{
      window.location.href = "#workout"

    },150)
  }

  function resetWorkouts() {
    setPoison("individual");
    setMuscleGroups([]);
    setGoals("strength_power");
    setTimeout(()=>{
      window.location.href = "#generate"

    },100)
    setWorkout(null);
  }
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-r from-slate-800 to-slate-950 text-white text-sm sm:text-base">
      <Hero />
      <Generator
        poison={poison}
        setPoison={setPoison}
        muscleGroups={muscleGroups}
        setMuscleGroups={setMuscleGroups}
        goals={goals}
        setGoals={setGoals}
        generateWorkout={updateWorkout}
      />
      {workout && <Workout workout={workout} resetWorkouts={resetWorkouts} />}
    </main>
  );
}
