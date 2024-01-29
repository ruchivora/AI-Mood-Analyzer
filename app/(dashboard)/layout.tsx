import { UserButton } from "@clerk/nextjs";
import Link from 'next/link';


const links = [
  {href: '/', label: 'Home'},
  {href: '/journal', label: 'Journal'},
  {href: '/history', label: 'History'},
]
const DashboardLayout = ({children}) => {
    return <div className="h-screen w-screen relative">

      <header className="h-[60px] border-b border-black/10 grid grid-cols-2 gap-4">
        <div className="flex justify-start text-center items-center font-semibold mx-8 text-xl">AI Mood Analyzer</div>
        <div className="h-full w-full px-6 flex items-center justify-end ">
          <UserButton/>
        </div>
      </header>

      <div className="ml-[200px] h-full">
        <aside className="absolute w-[200px] top-auto left-0 h-full border-r border-black/10">
          {/*<div>Mood</div>*/}
          <ul>
            {links.map(link => (
              <li key={link.href} className='px-2 py-6 text-xl border-b-2 text-center font-medium'>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </aside>
        <div className="h-[calc(100vh-60px)]">{children}</div>
      </div>
    </div>
}

export default DashboardLayout;
