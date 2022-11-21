import { slide as Menu } from "react-burger-menu";
import Link from "next/link";
import { useState } from "react";

export default function AdminNav() {
  return (
    <>
      <Menu>
        <div className="mb-4 text-sm">Admin</div>
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
