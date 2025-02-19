import React from "react";
import axios from "axios";
import { URL_USERS } from "../Path";
import { useState } from "react";

function Upload() {
  const [file, setFile] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);

  const uploadFile = async () => {
    if (!file) return alert("Fayl tanlang!");

    const formData = new FormData();
    formData.append("file", file);

    await axios.post(`${URL_USERS}` + "upload/", formData);
    alert("Fayl yuklandi!");
  };
  const searchFiles = async () => {
    const res = await axios.get(
      `http://127.0.0.1:8000/search/?query=${searchQuery}`
    );
    setResults(res.data.results);
  };

  const downloadFile = async (filename) => {
    window.location.href = `http://127.0.0.1:8000/download/${filename}`;
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>PDF Yuklash</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={uploadFile}>Yuklash</button>

      <h2>PDF Qidirish</h2>
      <input
        type="text"
        placeholder="Fayl nomini kiriting..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={searchFiles}>Qidirish</button>

      <h2>Natijalar</h2>
      <ul>
        {results.map((filename) => (
          <li key={filename}>
            {filename}{" "}
            <button onClick={() => downloadFile(filename)}>Yuklab olish</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Upload;
