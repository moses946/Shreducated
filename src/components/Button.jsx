export default function Button(props) {
  const { title, func } = props;
  return (
    <button
      onClick={func}
      className="px-8 mx-auto py-4 rounded-md border border-blue-400 border-solid bg-slate-950 blueShadow duration-200"
    >
      <p>{title}</p>
    </button>
  );
}

Button.propTypes = {
  title: String,
  func: Function,
};
