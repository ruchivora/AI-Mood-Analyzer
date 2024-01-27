import Editor from "@/components/Editor"
import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"

/* 
  Here, if where: id = id is done, 
  then anyone can pass any id and the data 
  can be retrieved. So, we don't do that.
*/

const getEntry = async (id) => {
    const user = await getUserByClerkId()
    const entry = await prisma.journalEntry.findUnique({
        where: {
            userId_id: {
                userId: user.id,
                id: id
            }
        },
        include: {
            analysis: true,
        }
    })

    return entry;
}

const EntryPage = async ({params}) => {
    const entry = await getEntry(params.id);


    return (
        <div className="h-full w-full ">
            <Editor entry={entry}/>
        </div>
    )
}

export default EntryPage
