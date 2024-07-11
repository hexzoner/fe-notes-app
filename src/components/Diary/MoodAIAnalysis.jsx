import { useRef, useState } from "react";
import { Charts } from "@/components/Diary";
import ReactMarkdown from "react-markdown";
import { useOutletContext } from "react-router-dom";

const chatUrl = `https://gen-ai-wbs-consumer-api.onrender.com/api/v1/chat/completions`;
const AI_MODE = "production";

const MoodAIAnalysis = ({ entries }) => {
  const { loading, setLoading } = useOutletContext();
  const [results, setResults] = useState("");
  const [chartsData, setChartsData] = useState([]);
  const entriesPacked = entries.map((x) => {
    return { title: x.title, content: x.content };
  });
  const modalRef = useRef();
  const _messages = [
    { role: "system", content: "You are a mood and sentiment analyst and expert JavaScript developer. You always provide the answers in the correct JSON format." },
    {
      role: "user",
      content:
        `Provide mood and sentiment analysis of the data inside. 
        Divide your answer in two parts. First part named "summary" is a single string written
        in proper Markdown with a mood and emotions summary of each 'Title' dont include anything from the initial message.
        Second part named "charts" is same analysis but in the format for Recharts library in React JS:
        X axis is 'title' and Y axis are 'mood' from (0)worst to 10(best) and 'informative' from 0(on info) to 10(tons of info)
        "charts" is array of objects {"title", "mood", "informative"}` + JSON.stringify(entriesPacked),
    },
  ];

  const handleAISummary = async () => {
    try {
      setLoading(true);
      const res = await fetch(chatUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "c9y7k5aewfsbd7skbofped",
          mode: AI_MODE,
          provider: "open-ai",
        },
        body: JSON.stringify({
          model: "gpt-4o",
          response_format: { type: "json_object" },
          messages: _messages,
        }),
      });

      const data = await res.json();
      // console.log(data.message.content);
      const parsed = JSON.parse(data.message.content);
      setResults(parsed.summary);
      // console.log(parsed);
      setChartsData(parsed.charts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-4 right-4">
        <button onClick={() => modalRef.current.showModal()} className="bg-purple-400 hover:bg-purple-300 text-white font-bold py-2 px-4 rounded-full shadow-lg w-10 h-10">
          ✨
        </button>
      </div>

      <dialog id="modal-note" className="modal" ref={modalRef}>
        <div className="modal-box h-[600px] py-0 w-full max-w-6xl">
          {loading ? (
            <span className="loading loading-dots loading-lg absolute top-1/2 right-1/2"></span>
          ) : (
            <div>
              <div className="modal-action items-center justify-between mb-2">
                <h1 className="text-2xl text-center">Get your AI Gen Mood Analysis</h1>
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-6 top-6">✕</button>
                </form>
              </div>
              <div className="flex items-center gap-3">
                <div className="textarea textarea-primary w-1/2 h-[450px] overflow-y-scroll rounded-md">
                  {results.length === 0 ? "AI SUMMARY GOES HERE..." : <ReactMarkdown>{results}</ReactMarkdown>}
                </div>
                <div className="textarea textarea-secondary w-1/2 h-[450px] overflow-y-scroll rounded-md">
                  <Charts aiSummary={chartsData} />
                </div>
              </div>
              <div className="flex justify-center">
                <button className="mt-5 btn bg-purple-500 hover:bg-purple-400 text-white" onClick={handleAISummary}>
                  Gen AI mood analysis ✨
                </button>
              </div>
            </div>
          )}
        </div>
      </dialog>
    </>
  );
};

export default MoodAIAnalysis;

// const MarkdownDisplay = ({ markdown }) => {
//   return <ReactMarkdown>{markdown}</ReactMarkdown>;
// };
