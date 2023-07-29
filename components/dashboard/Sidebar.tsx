import Link from "next/link";
import React from "react";

type Props = {};

const Sidebar = (props: Props) => {
  return (
    <aside className="col-span-1">
      <ul className="space-y-4">
        <li><Link href="/dashboard">Dashboard</Link></li>
        <li>
          <Link href="/dashboard/settings">Settings</Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
