import {color} from "d3-color";

const EntryCard = ({entry}) => {
  const date : string = new Date(entry.createdAt).toDateString()
  let {summary, mood, color} = entry.analysis
  summary = summary.substring(0,15)

  console.log('entry', entry)
  console.log('summary', summary)
  console.log('mood', mood)

  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5 ">{date}</div>
      <div className="px-4 py-5"><span className="font-semibold">Analysis:</span> {summary}</div>
      <div className="px-4 py-4 text-b font-semibold bg-gray-50" style={{color: color}}>Mood: {mood}</div>
    </div>
  )
}

export default EntryCard
