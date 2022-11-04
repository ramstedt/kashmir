export default function Button({ text, value }) {
  return (
    <button className="cursor-pointer bg-spaceCadet text-white border-solid border-2 border-spaceCadet px-2 py-2 rounded-2xl w-full max-w-xl">
      {text}
    </button>
  );
}
