import { useEffect, useState } from "react";
import axios from "axios";
import { CreateEntry, MoodAIAnalysis, EntriesList } from "@/components/Diary";
import { toast } from "react-toastify";

const Diary = () => {
  const [entries, seEntries] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_NOTES_API}/entries`);
        seEntries(data);
        setLoading(false);
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <EntriesList entries={entries} setEntries={seEntries} loading={loading} />
      <CreateEntry setEntries={seEntries} />
      <MoodAIAnalysis entries={entries} />
    </>
  );
};

export default Diary;
