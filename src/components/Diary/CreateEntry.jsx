import { useRef, useState } from "react";
import axios from "axios";
import DialogModal from "../DialogModal";

const CreateEntry = ({ setEntries }) => {
  const modalRef = useRef(null);
  const [{ title, author, image, content }, setForm] = useState({
    title: "",
    author: "",
    image: "",
    content: "",
  });

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!author || !image || !content) return alert("Please fill in all fields");
      const { data } = await axios.post(`${import.meta.env.VITE_NOTES_API}/entries`, {
        title,
        author,
        image,
        content,
      });
      setEntries((prev) => [data, ...prev]);
      setForm({ title: "", author: "", image: "", content: "" });
      modalRef.current.close();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="fixed bottom-4 right-16">
        <button onClick={() => modalRef.current.showModal()} className="bg-red-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded-full shadow-lg w-10 h-10">
          +
        </button>
      </div>
      <DialogModal modalRef={modalRef} form={(title, author, image, content)} handleSubmit={handleSubmit} handleChange={handleChange} modalTitle={"Create the Note"} modalButtonName={"Create"} />
    </>
  );
};

export default CreateEntry;
