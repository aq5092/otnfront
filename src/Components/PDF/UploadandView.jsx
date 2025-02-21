import { useState, useEffect } from "react";
import axios from "axios";
import { URL_USERS } from "../Path";
import {
  FaFolder,
  FaFile,
  FaTrash,
  FaDownload,
  FaUpload,
} from "react-icons/fa";
// import "./FolderTree.css"; // 📌 CSS import

import { Col, Container, Row } from "react-bootstrap";

function FolderTree() {
  const [tree, setTree] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedItem, setSelectedItem] = useState("");
  const [formattedPath, setFormattedPath] = useState("");
// /\\/g
  useEffect(() => {
    fetchFolders();
    if (typeof selectedItem === "string") {
      setFormattedPath(selectedItem.replace("/", "%5C"));
      // setFormattedPath(selectedItem.replace("\\", "/"));
    }
  }, [selectedItem]);
console.log(`${URL_USERS}`+formattedPath)
  const fetchFolders = async () => {
    const res = await axios.get(`${URL_USERS}`+"list-folders/");
    setTree(res.data.tree);
  };
  //   console.log(tree)
  const uploadFile = async () => {
    if (!file || !selectedFolder) return alert("Fayl va papkani tanlang!");

    const formData = new FormData();
    formData.append("file", file);

    await axios.post(`${URL_USERS}`+`upload-file/`, formData, {
      params: { folder_path: selectedFolder },
    });

    setFile(null);
    setPreviewUrl(null);
    fetchFolders();
  };

  const deleteItem = async (itemPath) => {
    if (window.confirm(`"${itemPath}" ni o‘chirmoqchimisiz?`)) {
      await axios.delete(`${URL_USERS}`+`delete-item/`, {
        params: { item_path: itemPath },
      });
      fetchFolders();
    }
  };
  const handleClick = (item) => {
  
    setSelectedItem(item.path);
 
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
      // console.log(fullPath)
      return (
        <div key={fullPath} className="tree-item">
          <div
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={() =>
              setSelectedFolder(node.type === "folder" ? fullPath : null)
            }
          >
            <span className="tree-icon">
              {node.type === "folder" ? <FaFolder /> : <FaFile />}
            </span>
            <span onClick={() => handleClick(node)}>{node.name} </span>

            <div className="file-actions">
              {node.type === "file" && (
                <a
                  href={`${URL_USERS}`+`download-file/?file_path=${fullPath}`}
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
    <Container>
      <Row>
        <Col>
          <div className="folder-container">
            <h2 className="folder-title">📂 Tree Folder + Fayl CRUD</h2>

            {/* Fayl yuklash */}
            <div className="folder-actions">
              <input type="file" onChange={handleFileSelect} />
              <button onClick={uploadFile}>
                <FaUpload /> Yuklash
              </button>
            </div>

            {/* Papkalar va fayllar daraxti */}
            <div className="tree-container">{renderTree(tree)}</div>

            {selectedFolder && <p>Tanlangan papka: {selectedFolder}</p>}
            {/* <div >{PDFViewer(previewUrl)}</div> */}
          </div>
        </Col>
        <Col>
          <div className="preview-container">
            <h3>📄 Tanlangan Fayl:</h3>
            {/* {formattedPath} && */}
            {formattedPath ? (
               <iframe

               src={`${URL_USERS}`+formattedPath}
               
               width="80%"
               height="600px"
               style={{ border: "1px solid black", marginTop: "20px" }}
             ></iframe>
            ) : (
                <iframe
                src={`./image/image2.jpg`}
                width="80%"
                height="600px"
                style={{ border: "1px solid black", marginTop: "20px" }}
              ></iframe>
            )}
            {/* <iframe
              src={`http://127.0.0.1:8000/`+formattedPath}
              width="80%"
              height="600px"
              style={{ border: "1px solid black", marginTop: "20px" }}
            ></iframe> */}

          </div>

          {/* Fayl preview */}
          {/* {previewUrl && (
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
          )} */}
        </Col>
      </Row>
      {/* <br />
      <Row>
        {tree.map((item, index) => (
          <Col key={index}>
            <h3>{item.name}</h3>
            <ul>
              {item.children.map((child, index) => (
                <li
                  key={index}
                  onClick={() => handleClick(child)}
                  style={{
                    cursor: "pointer",
                    padding: "5px",
                    borderBottom: "1px solid gray",
                  }}
                >
                  {child.name}
                </li>
              ))}
            </ul>
          </Col>
        ))}
      </Row> */}
    </Container>
  );
}

export default FolderTree;
