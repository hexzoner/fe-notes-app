import { useEffect, useState } from "react";
import axios from "axios";
import { CreateNote, NotesAISummary, NotesList } from "@/components/Notes";
import { toast } from "react-toastify";

const SchoolNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_NOTES_API}/notes`);
        setNotes(data);
        setLoading(false);
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <NotesList notes={notes} setNotes={setNotes} loading={loading} />
      <CreateNote setNotes={setNotes} />
      <NotesAISummary notes={notes} />
    </>
  );
};

export default SchoolNotes;
