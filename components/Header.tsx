import Link from "next/link";

export default function Header() {
  const navItems: string[] = ['/', 'auth', 'change-password']
  return (
    <header className="bg-gray-500 text-black h-20 px-10">
      <nav className="h-full">
        <ul className="flex gap-24 items-center h-full">
          {navItems.map(item => {
            return <li key={item}>
              <Link href={item}>{item}</Link>
            </li>
          })}
        </ul>
      </nav>
    </header>
  );
}
