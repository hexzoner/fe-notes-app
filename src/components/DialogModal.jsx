export default function DialogModal({ modalRef, form, handleSubmit, handleChange, modalTitle, modalButtonName }) {
  return (
    <dialog id="modal-note" className="modal w-fit m-auto" ref={modalRef}>
      <div className="modal-box h-[520px]">
        <div className="modal-action justify-between mb-2">
          <h1 className="text-2xl text-center ml-3">{modalTitle}</h1>
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-6 top-6">✕</button>
          </form>
        </div>
        <form className="flex flex-col items-center justify-center gap-2" onSubmit={handleSubmit}>
          <label className="input input-bordered flex items-center w-full">
            <input className="grow" placeholder="Title" name="title" value={form.title} onChange={handleChange} />
          </label>
          <label className="input input-bordered flex items-center w-full">
            <input className="grow" placeholder="Author" name="author" value={form.author} onChange={handleChange} />
          </label>
          <label className="input input-bordered flex items-center w-full">
            <input className="grow" placeholder="Image URL" name="image" value={form.mage} onChange={handleChange} />
          </label>
          <div className="label w-full">
            <textarea cols={80} rows={10} className="textarea textarea-bordered h-40 resize-none" placeholder="Content" name="content" value={form.content} onChange={handleChange}></textarea>
          </div>

          <button className="btn btn-primary text-primary-content">{modalButtonName}</button>
        </form>
      </div>
    </dialog>
  );
}
