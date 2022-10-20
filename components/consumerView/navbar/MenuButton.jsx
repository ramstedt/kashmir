export default function MenuButton({ text, value }) {
  return (
    <label className="m-0 p-0">
      <input type="checkbox" value={value} className="peer hidden" />
      <div className="peer-checked:bg-spaceCadet peer-checked:text-white border-solid border-2 border-spaceCadet text-cobalt px-2 py-2 m-1 rounded-2xl">
        {text}
      </div>
    </label>
  );
}
