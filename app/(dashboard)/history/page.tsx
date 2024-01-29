import {getUserByClerkId} from "@/utils/auth";
import {prisma} from "@/utils/db";
import {all} from "deepmerge";
import HistoryChart from "@/components/HistoryChart";

const getData = async () => {
  const user = await getUserByClerkId();
  const analyses = await prisma.analysis.findMany({
    where: {
      userId: user.id
    },
    orderBy: {
      createdAt: 'asc'
    }

  })
  const sum = analyses.reduce((all, current) => all + current.sentimentScore, 0)
  const avg = Math.round(sum / analyses.length)

  return {analyses, avg}
}
const History = async () => {
  const {analyses, avg} = await getData();
  console.log('analyses', analyses)

  return (
    <div className='h-full w-full'>
      <div>{`Avg. Sentiment ${avg}`}</div>
      <div className='p-4 h-full w-full'>
        <HistoryChart data={analyses}/>
      </div>
    </div>
  )
}

export default History
