import React, { useState } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

const PDFViewer = ( pdfUrl) => {
    return (
        <div style={{ height: "90vh", border: "1px solid #ccc" }}>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js">
                <Viewer fileUrl={pdfUrl} />
            </Worker>
        </div>
    );
};

export default PDFViewer;