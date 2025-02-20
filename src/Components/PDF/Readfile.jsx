import { useState, useEffect } from "react";
import axios from "axios";
import { FaFolder, FaFile, FaTrash, FaDownload, FaUpload } from "react-icons/fa";
// import "./FolderTree.css"; // 📌 CSS import

function ReadFile() {
  const [tree, setTree] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    fetchFolders();
  }, []);

  const fetchFolders = async () => {
    const res = await axios.get("http://127.0.0.1:8000/list-folders/");
    setTree(res.data.tree);
  };

  const uploadFile = async () => {
    if (!file || !selectedFolder) return alert("Fayl va papkani tanlang!");

    const formData = new FormData();
    formData.append("file", file);

    await axios.post(`http://127.0.0.1:8000/upload-file/`, formData, {
      params: { folder_path: selectedFolder },
    });

    setFile(null);
    setPreviewUrl(null);
    fetchFolders();
  };

  const deleteItem = async (itemPath) => {
    if (window.confirm(`"${itemPath}" ni o‘chirmoqchimisiz?`)) {
      await axios.delete(`http://127.0.0.1:8000/delete-item/`, {
        params: { item_path: itemPath },
      });
      fetchFolders();
    }
  };

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const fileUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(fileUrl);
    }
  };

  const renderTree = (nodes, parentPath = "") =>
    nodes.map((node) => {
      const fullPath = parentPath ? `${parentPath}/${node.name}` : node.name;

      return (
        <div key={fullPath} className="tree-item">
          <div
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={() => setSelectedFolder(node.type === "folder" ? fullPath : null)}
          >
            <span className="tree-icon">
              {node.type === "folder" ? <FaFolder /> : <FaFile />}
            </span>
            <span>{node.name}</span>

            <div className="file-actions">
              {node.type === "file" && (
                <a
                  href={`http://127.0.0.1:8000/download-file/?file_path=${fullPath}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaDownload />
                </a>
              )}
              <button onClick={() => deleteItem(fullPath)}>
                <FaTrash />
              </button>
            </div>
          </div>

          {node.children && renderTree(node.children, fullPath)}
        </div>
      );
    });

  return (
    <div className="folder-container">
      <h2 className="folder-title">📂 Tree Folder + Fayl CRUD</h2>

      {/* Fayl yuklash */}
      <div className="folder-actions">
        <input type="file" onChange={handleFileSelect} />
        <button onClick={uploadFile}>
          <FaUpload /> Yuklash
        </button>
      </div>

      {/* Fayl preview */}
      {previewUrl && (
        <div className="preview-container">
          <h3>📄 Tanlangan Fayl:</h3>
          {file.type.startsWith("image/") ? (
            <img src={previewUrl} alt="Preview" className="preview-image" />
          ) : file.type === "application/pdf" ? (
            <iframe src={previewUrl} className="preview-pdf"></iframe>
          ) : (
            <p className="preview-text">{file.name}</p>
          )}
        </div>
      )}

      {/* Papkalar va fayllar daraxti */}
      <div className="tree-container">{renderTree(tree)}</div>

      {selectedFolder && <p>Tanlangan papka: {selectedFolder}</p>}
    </div>
  );
}

export default ReadFile;
