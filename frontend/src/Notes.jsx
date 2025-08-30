import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

/*export default function Notes({ token }) {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  const fetchNotes = () => {
    axios
      .get("http://127.0.0.1:8000/notes", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setNotes(res.data))
      .catch(() => {
        setError("Failed to fetch notes. Please login again.");
        navigate("/");
      });
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
    fetchNotes();
  }, [token, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = editId
      ? `http://127.0.0.1:8000/notes/${editId}`
      : "http://127.0.0.1:8000/notes";
    const method = editId ? "put" : "post";

    axios({
      method,
      url,
      headers: { Authorization: `Bearer ${token}` },
      data: { title, content },
    })
      .then((res) => {
        if (editId) {
          setNotes(notes.map((n) => (n.id === editId ? res.data : n)));
          setEditId(null);
        } else {
          setNotes([...notes, res.data]);
        }
        setTitle("");
        setContent("");
      })
      .catch(() => setError("Failed to save note"));
  };

  const handleEdit = (note) => {
    setEditId(note.id);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => setNotes(notes.filter((n) => n.id !== id)))
      .catch(() => setError("Failed to delete note"));
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Notes</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}

      {/* Create/Edit note form }
      <form onSubmit={handleSubmit} className="mb-6 space-y-2">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
        >
          {editId ? "Update Note" : "Add Note"}
        </button>
      </form>

      {/* Notes list }
      <ul className="space-y-2">
        {notes.length > 0 ? (
          notes.map((note) => (
            <li key={note.id} className="p-4 bg-gray-100 rounded shadow flex justify-between items-start">
              <div>
                <h3 className="font-bold">{note.title}</h3>
                <p>{note.content}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(note)}
                  className="bg-yellow-400 text-white px-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(note.id)}
                  className="bg-red-500 text-white px-2 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <p>No notes found</p>
        )}
      </ul>
    </div>
  );
}*/
/*export default function Notes({ token }) {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  const fetchNotes = () => {
    axios
      .get("http://127.0.0.1:8000/notes", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setNotes(res.data))
      .catch(() => {
        setError("Failed to fetch notes. Please login again.");
        navigate("/");
      });
  };

  useEffect(() => {
    if (!token) navigate("/");
    else fetchNotes();
  }, [token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = editId ? `http://127.0.0.1:8000/notes/${editId}` : "http://127.0.0.1:8000/notes";
    const method = editId ? "put" : "post";

    axios({ method, url, headers: { Authorization: `Bearer ${token}` }, data: { title, content } })
      .then((res) => {
        if (editId) {
          setNotes(notes.map((n) => (n.id === editId ? res.data : n)));
          setEditId(null);
        } else setNotes([...notes, res.data]);
        setTitle("");
        setContent("");
      })
      .catch(() => setError("Failed to save note"));
  };

  const handleEdit = (note) => {
    setEditId(note.id);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/notes/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => setNotes(notes.filter((n) => n.id !== id)))
      .catch(() => setError("Failed to delete note"));
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Your Notes</h1>
      {error && <p className="text-red-500 mb-2 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="mb-6 bg-white p-6 rounded-xl shadow-md space-y-3">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          required
        />
        <button
          type="submit"
          className={`w-full py-3 rounded-lg text-white font-semibold ${
            editId ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-500 hover:bg-blue-600"
          } transition`}
        >
          {editId ? "Update Note" : "Add Note"}
        </button>
      </form>

      <ul className="space-y-4">
        {notes.length > 0 ? (
          notes.map((note) => (
            <li key={note.id} className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg text-gray-800">{note.title}</h3>
                <p className="text-gray-600">{note.content}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(note)}
                  className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(note.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500">No notes found</p>
        )}
      </ul>
    </div>
  );
}
*/
export default function Notes({ token }) {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  const fetchNotes = () => {
    axios
      .get("http://127.0.0.1:8000/notes", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setNotes(res.data))
      .catch(() => navigate("/"));
  };

  useEffect(() => {
    if (!token) navigate("/");
    else fetchNotes();
  }, [token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = editId ? `http://127.0.0.1:8000/notes/${editId}` : "http://127.0.0.1:8000/notes";
    const method = editId ? "put" : "post";

    axios({ method, url, headers: { Authorization: `Bearer ${token}` }, data: { title, content } })
      .then((res) => {
        if (editId) setNotes(notes.map((n) => (n.id === editId ? res.data : n)));
        else setNotes([...notes, res.data]);
        setTitle("");
        setContent("");
        setEditId(null);
      });
  };

  const handleEdit = (note) => {
    setEditId(note.id);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:8000/notes/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => setNotes(notes.filter((n) => n.id !== id)));
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(notes);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setNotes(reordered);
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500">
      <h1 className="text-4xl font-extrabold mb-6 text-white text-center">Your Notes</h1>

      {/* Create/Edit form */}
      <form onSubmit={handleSubmit} className="mb-6 bg-white p-6 rounded-2xl shadow-lg space-y-3 max-w-3xl mx-auto">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
          required
        />
        <button className={`w-full py-3 rounded-lg text-white font-bold ${editId ? "bg-yellow-500 hover:bg-yellow-600" : "bg-purple-600 hover:bg-purple-700"} transition`}>
          {editId ? "Update Note" : "Add Note"}
        </button>
      </form>

      {/* Draggable notes */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="notes">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef} className="space-y-4 max-w-3xl mx-auto">
              {notes.map((note, index) => (
                <Draggable key={note.id} draggableId={`${note.id}`} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="p-4 bg-white rounded-2xl shadow hover:shadow-xl transition flex justify-between items-start"
                    >
                      <div>
                        <h3 className="font-semibold text-lg text-gray-800">{note.title}</h3>
                        <p className="text-gray-600">{note.content}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button onClick={() => handleEdit(note)} className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition">
                          Edit
                        </button>
                        <button onClick={() => handleDelete(note.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">
                          Delete
                        </button>
                      </div>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
