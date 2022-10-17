import { useRouter } from "next/router";

export default function Item() {
  const router = useRouter();
  const { item } = router.query;
  console.log(item);
  return (
    <>
      <p>Item: {item}</p>
    </>
  );
}
