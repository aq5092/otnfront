import { useState, useEffect } from "react";
import axios from "axios";
import { FaFolder, FaFile, FaTrash, FaDownload, FaUpload } from "react-icons/fa";
import { URL_USERS } from "../Path";
import "./FolderTree.css"; // 📌 CSS faylni import qilish
import { Link } from "react-router-dom";
function FolderTree() {
  const [tree, setTree] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchFolders();
  }, []);

  const fetchFolders = async () => {
    const res = await axios.get(`${URL_USERS}` +"list-folders/");
    setTree(res.data.tree);
  };

  const uploadFile = async () => {
    if (!file || !selectedFolder) return alert("Fayl va papkani tanlang!");

    const formData = new FormData();
    formData.append("file", file);

    await axios.post(`${URL_USERS}` +`upload-file/`, formData, {
      params: { folder_path: selectedFolder },
    });

    setFile(null);
    fetchFolders();
  };

  const deleteItem = async (itemPath) => {
    if (window.confirm(`"${itemPath}" ni o‘chirmoqchimisiz?`)) {
      await axios.delete(`${URL_USERS}` +`delete-item/`, {
        params: { item_path: itemPath },
      });
      fetchFolders();
    }
  };

  const renderTree = (nodes, parentPath = "") =>
    nodes.map((node) => {
      const fullPath = parentPath ? `${parentPath}/${node.name}` : node.name;

      return (
        <div key={fullPath} style={{ marginLeft: "20px" }}>
          <div
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={() => setSelectedFolder(node.type === "folder" ? fullPath : null)}
          >
            {node.type === "folder" ? <FaFolder /> : <FaFile />}
            <span style={{ marginLeft: "5px" }}>{node.name}</span>

            {node.type === "file" && (
              <>
                <a href={`${URL_USERS}` +`download-file/?file_path=${fullPath}`} target="_blank" rel="noopener noreferrer">
                  <FaDownload style={{ marginLeft: "10px" }} />
                </a>
              </>
            )}

            <FaTrash style={{ marginLeft: "10px", color: "red", cursor: "pointer" }} onClick={() => deleteItem(fullPath)} />
          </div>

          {node.children && renderTree(node.children, fullPath)}
        </div>
      );
    });
    const addFolder = async () => {
      const parentName = prompt("Yangi nomini kiriting:");
      const folderName = prompt("Yangi papka nomini kiriting:");
      if (!folderName) return;

      await axios.post(`${URL_USERS}` +`create-folder/?parent_path=${parentName}`+ `&folder_name=${folderName}`);
      fetchFolders();
    }

  return (
    <div>
        <div>
      <h4>Mehnat va me'yorlashtirish bo'limining xujjatlari</h4>
      <button onClick={addFolder} className="btn btn-info">📂 Add </button> <Link to={"/home"} className="btn btn-primary">
        {" "}
        Home
      </Link>
      </div>
      <br/>

      {/* Fayl yuklash */}
      <div>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={uploadFile}>
          <FaUpload /> Yuklash
        </button>
      </div>

      {/* Papkalar va fayllar daraxti */}
      <div>{renderTree(tree)}</div>

      {selectedFolder && <p>Tanlangan papka: {selectedFolder}</p>}
    </div>
  );
}

export default FolderTree;
