import EntryCard from "./EntryCard";
import axios from "axios";
import { useRef, useState } from "react";
import DialogModal from "../DialogModal";

const EntriesList = ({ entries, setEntries, loading }) => {
  const modalRef = useRef(null);

  const [form, setForm] = useState({
    title: "",
    author: "",
    image: "",
    content: "",
  });
  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!form.author || !form.image || !form.content) return alert("Please fill in all fields");

      const { data } = await axios.put(`${import.meta.env.VITE_NOTES_API}/entries/${form._id}`, form);
      const _newList = [...entries];
      _newList[entries.indexOf(entries.find((x) => x._id === form._id))] = form;
      setEntries(_newList);
      setForm({ title: "", author: "", image: "", content: "" });

      modalRef.current.close();
    } catch (error) {
      console.error(error);
    }
  };

  function openForm() {
    modalRef.current.showModal();
  }

  return (
    <div className="bg-base-200">
      <div className="max-w-[1200px] m-auto min-h-screen">
        {!loading ? (
          <>
            {!entries.length && <p className="p-5 text-center text-3xl">No diary entries available</p>}
            <div className="p-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {entries.map((e) => (
                <EntryCard key={e._id} entry={e} form={form} setForm={setForm} openForm={openForm} />
              ))}
            </div>
          </>
        ) : (
          <div className="m-auto text-center  w-full">
            <span className="loading loading-spinner loading-lg h-[600px]"></span>
          </div>
        )}
        <DialogModal modalRef={modalRef} form={form} handleSubmit={handleSubmit} handleChange={handleChange} modalTitle={"Update the Note"} modalButtonName={"Update"} />
      </div>
    </div>
  );
};

export default EntriesList;
