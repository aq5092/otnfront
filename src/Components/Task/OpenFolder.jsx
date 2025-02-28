import { useState, useEffect } from "react";
import axios from "axios";
import { URL_USERS } from "../Path";
import { Link, useNavigate} from "react-router-dom";
import {
  FaFolder,
  FaFile,
  FaTrash,
  FaDownload,
  FaUpload,
  
} from "react-icons/fa";
// import "./FolderTree.css"; // 📌 CSS import

import { Col, Container, Row } from "react-bootstrap";



function OpenFolder() {
  const [tree, setTree] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedItem, setSelectedItem] = useState("");
  const [formattedPath, setFormattedPath] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // 🔍 Qidiruv holati
  const [filteredTree, setFilteredTree] = useState([]);
 


  useEffect(() => {
    fetchFolders();
    if (typeof selectedItem === "string") {
      setFormattedPath(selectedItem.replace("/", "%5C"));
      // setFormattedPath(selectedItem.replace("\\", "/"));
    }
  }, [selectedItem]);

 

  // console.log(`${URL_USERS}` + formattedPath);
  const fetchFolders = async () => {
    const res = await axios.get(`${URL_USERS}` + "list-folders/");
    setTree(res.data.tree);
  };
  //   console.log(tree)
  const uploadFile = async () => {
    if (!file || !selectedFolder) return alert("Fayl va papkani tanlang!");

    const formData = new FormData();
    formData.append("file", file);

    await axios.post(`${URL_USERS}` + `upload-file/`, formData, {
      params: { folder_path: selectedFolder },
    });

    setFile(null);
    setPreviewUrl(null);
    fetchFolders();
    window.location.reload();
  };


  const deleteItem = async (item) => {
    const filename = item.split("/").pop();
    
    if (window.confirm(`"${item}" ni o‘chirmoqchimisiz?`)) {
    
      await axios.delete(`${URL_USERS}` + `delete-item/`, {
        params: { item_path: item , filename: filename},
      });
      fetchFolders();
    }
  };

  // const deleteItem = async (itemPath) => {
  //   if (window.confirm(`"${itemPath}" ni o‘chirmoqchimisiz?`)) {
  //     await axios.delete(`${URL_USERS}` + `delete-item/`, {
  //       params: { item_path: itemPath },
  //     });
  //     fetchFolders();
  //   }
  // };
  const handleClick = (item) => {
    setSelectedItem(item.path);
    console.log(item.name)
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
                  href={`${URL_USERS}` + `download-file/?file_path=${fullPath}`}
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
  const addFolder = async () => {
    const parentName = prompt("Diskni kiriting:");
    const folderName = prompt("Yangi papka nomini kiriting:");
    if (!folderName) return;

    await axios.post(
      `${URL_USERS}` +
        `create-folder/?parent_path=${parentName}` +
        `&folder_name=${folderName}`
    );
    fetchFolders();
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query) {
      setFilteredTree(tree);
      return;
    }

    // 🔍 Qidiruv bo‘yicha filter
    const filterNodes = (nodes) =>
      nodes
        .map((node) => {
          if (node.name.toLowerCase().includes(query.toLowerCase()))
            return node;
          if (node.children) {
            const filteredChildren = filterNodes(node.children);
            if (filteredChildren.length > 0)
              return { ...node, children: filteredChildren };
          }
          return null;
        })
        .filter(Boolean);

    setFilteredTree(filterNodes(tree));
  };
  
  return (
    <Container className="pdf">
      <Row>
        <Col>
          <div className="folder-container">
            <h4 className="folder-title">
              📂 Mehnat va me'yorlashtirish bo'lim hujjatlari
            </h4>
            <Link to={"/home"} className="btn btn-primary">
              {" "}
              Bosh menyu
            </Link>
            &nbsp;
            <button onClick={addFolder} className="btn btn-info">
              📂 Yangi papka{" "}
            </button>{" "}
            
            
            {selectedFolder && <p>Tanlangan papka: {selectedFolder}</p>}
            {/* Fayl yuklash */}
            <div className="folder-actions">
              <input type="file" onChange={handleFileSelect} />
              <button onClick={uploadFile}>
                <FaUpload /> Yuklash
              </button>
            </div>
            <div className="folder-container">
              {/* 🔍 Qidiruv qutisi */}
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Fayl yoki papka qidiring..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
              {/* Papkalar va fayllar daraxti */}
              {searchQuery ? (
                <div className="tree-container">{renderTree(filteredTree)}</div>
              ) : (
                <div className="tree-container">{renderTree(tree)}</div>
              )}
              
              {/* <div className="tree-container">{renderTree(filteredTree)}</div> */}
            </div>
            {/* Papkalar va fayllar daraxti */}
            {/* <div className="tree-container">{renderTree(tree)}</div> */}
            {/* {selectedFolder && <p>Tanlangan papka: {selectedFolder}</p>} */}
            {/* <div >{PDFViewer(previewUrl)}</div> */}
          </div>
        </Col>
        <Col>
          <div className="preview-container">
            <h6>📄 Tanlangan Fayl: {selectedItem}</h6>
            {/* {formattedPath} && */}
            {formattedPath ? (
              <iframe
                src={`${URL_USERS}` + formattedPath}
                width="100%"
                height="900px"
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
      {/* <div className="folder-container">
      <h2 className="folder-title">📂 Tree Folder + Fayl CRUD + 🔍 Qidiruv</h2> */}

      {/* 🔍 Qidiruv qutisi */}
      {/* <div className="search-bar">
       
        <input
          type="text"
          placeholder="Fayl yoki papka qidiring..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div> */}

      {/* Papkalar va fayllar daraxti */}
      {/* <div className="tree-container">{renderTree(filteredTree)}</div>

      {selectedFolder && <p>Tanlangan papka: {selectedFolder}</p>}
    </div> */}
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


export default OpenFolder;
