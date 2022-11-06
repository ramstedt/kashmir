import { slide as Menu } from "react-burger-menu";
import Link from "next/link";

export default function AdminNav() {
  // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
  return (
    <>
      <Menu right>
        <div className="mb-4">Admin Navigation</div>
        <Link href="/admin/dashboard">Dashboard</Link>
        <Link href="/admin/addnew">Add new</Link>
        <Link href="/">Orders</Link>
        <Link href="/">Menu</Link>
        <div className="mt-7">
          <Link href="/logout">Log out</Link>
        </div>
      </Menu>
    </>
  );
}
