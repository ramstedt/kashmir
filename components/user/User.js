export default function User({ session }) {
  return (
    <>
      <div>user info</div>
      <div>{session.user.email}</div>
    </>
  );
}
