export default function Button({ text, value }) {
  return (
    <button className="cursor-pointer bg-cobalt text-white border-solid border-2 border-cobalt px-2 py-2 rounded-2xl w-full max-w-xl hover:bg-spaceCadet hover:border-spaceCadet">
      {text}
    </button>
  );
}
