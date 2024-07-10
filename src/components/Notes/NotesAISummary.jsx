import { useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";

const chatUrl = `https://gen-ai-wbs-consumer-api.onrender.com/api/v1/chat/completions`;
const AI_MODE = "development";

const NotesAISummary = ({ notes }) => {
  const modalRef = useRef();
  const resultsRef = useRef();
  const [stream, setStream] = useState(false);
  const { loading, setLoading } = useOutletContext();
  const [streamingAnswer, setStreamingAnswer] = useState(false);
  const [results, setResults] = useState("");
  const notesPacked = notes.map((x) => {
    return { title: x.title, content: x.content };
  });
  const messages = [
    { role: "system", content: "You are an expert analyst. You send messages formatted in a proper Markdown" },
    {
      role: "user",
      content:
        `Provide a summary of the contents of the notes for each 'Title' 
      but dont include anything from the initial message. Notes: ` + JSON.stringify(notesPacked),
    },
  ];

  const handleAISummary = async () => {
    // resultsRef.current.innerHtml = "";
    setResults("");
    try {
      if (!stream) setLoading(true);
      else setStreamingAnswer(true);
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
          stream: stream,
          messages: messages,
        }),
      });

      if (stream) {
        const reader = res.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let result = false;
        // const newMessageId = crypto.randomUUID();
        while (!(result = await reader.read()).done) {
          const chunk = decoder.decode(result.value, { stream: true });
          const lines = chunk.split("\n");
          lines.forEach((line) => {
            if (line.startsWith("data:")) {
              const jsonStr = line.replace("data:", "");
              const data = JSON.parse(jsonStr);
              const content = data.choices[0]?.delta?.content;

              if (content) {
                // console.log(content);
                setResults((prev) => (prev = `${prev}${content}`));
              }
            }
          });
        }
      } else {
        const data = await res.json();
        setResults(data.message.content);
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
      setStreamingAnswer(false);
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
        <div className="modal-box h-[600px] py-0">
          {loading ? (
            <span className="loading loading-dots loading-lg absolute top-1/2 right-1/2"></span>
          ) : (
            <>
              <div className="modal-action items-center justify-between mb-2">
                <h1 className="text-2xl text-center">Get AI Gen summary</h1>
                <label htmlFor="Stream?" className="flex items-center gap-1">
                  Stream?
                  <input id="Stream?" type="checkbox" className="toggle toggle-error" checked={stream} onChange={() => setStream((p) => !p)} />
                </label>

                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-6 top-6">✕</button>
                </form>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="textarea textarea-success w-full h-[400px] overflow-y-scroll" ref={resultsRef}>
                  {results === "" ? <p>AI SUMMARY GOES HERE</p> : results}
                </div>
                {!streamingAnswer && (
                  <button className="mt-5 btn bg-purple-500 hover:bg-purple-400 text-white" onClick={handleAISummary}>
                    Gen AI summary ✨
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </dialog>
    </>
  );
};

export default NotesAISummary;
