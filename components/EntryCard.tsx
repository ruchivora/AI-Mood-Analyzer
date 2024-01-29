import {color} from "d3-color";

const EntryCard = ({entry}) => {
  const date : string = new Date(entry.createdAt).toDateString()
  const {summary, mood, color} = entry.analysis

  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5 ">{date}</div>
      <div className="px-4 py-5"><span className="font-semibold">Analysis:</span> {summary.substring(0,15)}</div>
      <div className="px-4 py-4 text-b font-semibold bg-gray-50" style={{color: color}}>Mood: {mood}</div>
    </div>
  )
}

export default EntryCard
