import EntryCard from "@/components/EntryCard"
import NewEntryCard from "@/components/NewEntryCard"
import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"
import Link from "next/link"
import { analyze } from "@/utils/ai"
import Question from "@/components/Question";


const getEntries = async () => {
  const user = await getUserByClerkId()
  const entries = await prisma.journalEntry.findMany({
    where:{
      userId: user.id
    },
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      analysis: {
        select: {
          mood: true,
          summary: true,
          color: true
        }
      }
    }

  })

  return entries
}
  
const JournalPage = async () => {
  const entries = await getEntries()


  return (
  <div className="p-10 bg-zinc-400/10 h-full">
    <h2 className="text-3xl mb-8">Journal</h2>
    <div className="my-8">
      <Question/>
    </div>
    <div className="grid grid-cols-4 gap-5 py-10">
      <NewEntryCard/>
      { entries.map(entry => (
        // eslint-disable-next-line react/jsx-key
        <Link href={`/journal/${entry.id}`}>
          <EntryCard key={entry.id} entry={entry}/>
        </Link>
      ))}
    </div>
  </div>  
    
  )
  
}

export default JournalPage
