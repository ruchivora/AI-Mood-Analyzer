import {getUserByClerkId} from "@/utils/auth";
import {prisma} from "@/utils/db";
import HistoryChart from "@/components/HistoryChart";
import {rgb} from "d3-color";

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
  const sentimentAnalysis = analyzeSentiment(avg)

  // @ts-ignore
  return (
    <div className='h-full w-full bg-zinc-400/10 p-10'>
      <h2 className="text-3xl mb-8">Mood History</h2>

      <div className="overflow-hidden rounded-lg bg-white shadow w-2/4 px-5 py-6 mb-8">
        <div className="border-b-2 pb-2 font-medium text-xl">Average Sentiment</div>
        <div className="pt-2">
          <span className="text-3xl">{avg}</span>
          <span className="pl-4" style={{color: sentimentAnalysis.color}}>{sentimentAnalysis.message}</span>
        </div>
      </div>

      <div className='h-[500px] overflow-hidden rounded-lg bg-white shadow px-5 py-6'>
        <HistoryChart data={analyses}/>
      </div>
    </div>
  )
}

const analyzeSentiment = (avgSentiment: number): {color: string, message:string} => {
  let color;
  let message;

  if (avgSentiment >= -10 && avgSentiment <= -2) {
    color = '#FF0000';
    message = 'Your mood is okay';
  } else if (avgSentiment >= -1 && avgSentiment <= 5) {
    color = '#0101FE';
    message = 'Your mood is good';
  } else if (avgSentiment >= 6 && avgSentiment <= 10) {
    color = '#C7A40EFF';
    message = 'Your mood is happy';
  } else {
    color = '#808080';
    message = 'Mood analysis not available';
  }

  return { color, message };
};
export default History
