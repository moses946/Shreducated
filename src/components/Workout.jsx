import Button from "./Button";
import ExerciseCard from "./ExerciseCard";
import SectionWrapper from "./SectionWrapper";

export default function Workout(props) {
  const { workout, resetWorkouts } = props;
  return (
    <SectionWrapper id={"workout"} header={"Welcome To"} title={["The", "Danger", "zone"]}>
      <div className="flex flex-col gap-4">
        {workout.map((exercise, idx) => {
          return <ExerciseCard key={idx} exercise={exercise} i={idx} />;
        })}
        <Button
          func={() => {
            resetWorkouts();
          }}
          title={"Start Over"}
        />
      </div>
    </SectionWrapper>
  );
}

Workout.propTypes = {
  workout: Array,
  resetWorkouts: Function,
};
