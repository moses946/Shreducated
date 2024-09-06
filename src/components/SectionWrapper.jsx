export default function SectionWrapper(props) {
  const { children, header, title, id } = props;
  return (
    <section id={id} className="min-h-screen flex flex-col gap-10">
      <div className="flex flex-col justify-center items-center py-10 bg-slate-950 gap-2 p-4">
        <p className="uppercase font-medium">{header}</p>
        <h2 className="font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
          {title[0]} <span className="uppercase text-blue-400">{title[1]}</span>{" "}
          {title[2]}
        </h2>
      </div>
      <div className="max-w-[800px] w-full flex flex-col mx-auto gap-10 p-4">
        {children}
      </div>
    </section>
  );
}

SectionWrapper.propTypes = {
  children: String,
  header: String,
  title: Array,
  id: String,
};
