import Link from "next/link";

export default function Header() {
  return (
    <header>
      <div className="flex justify-center">
        <span className="text-xl mt-10">Capital Region Covid Data</span>
      </div>
      <nav className="flex justify-center">
        <div className="flex items-baseline justify-center flex-wrap mt-10">
          <ul className="flex">
            <li className="mr-6">
              <Link href="/">
                <a className="text-blue-500 hover:text-blue-800">Counties</a>
              </Link>
            </li>
            <li className="">
              <Link href="/region">
                <a className="text-blue-500 hover:text-blue-800">
                  Capital Region
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
