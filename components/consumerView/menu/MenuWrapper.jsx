import MenuNav from "../navbar/MenuNav";

export default function ConsumerWrapper({ children }) {
  return (
    <>
      <MenuNav />
      <div className="max-w-lg m-auto">
        <div className="mx-[6%]">{children}</div>
      </div>
    </>
  );
}
