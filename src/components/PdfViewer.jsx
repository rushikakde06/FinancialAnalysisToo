import React, { useEffect, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
// Set PDF.js worker (required for rendering)
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export default function PdfViewer({ pdfUrl, pagesMeta, setPagesMeta, pagesRefs }) {
  const containerRef = useRef(null);

// Load and render PDF when URL changes
  useEffect(() => {
    if (!pdfUrl) return;

    const load = async () => {
      const loadingTask = pdfjsLib.getDocument(pdfUrl);
      const pdf = await loadingTask.promise;

      const pages = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const scale = 1.3;
        const viewport = page.getViewport({ scale });
        pages.push({ pageNum: i, page, viewport, scale });
      }

      const container = containerRef.current;
      container.innerHTML = "";
      const newMeta = [];

      for (const meta of pages) {
        // Create page wrapper
        const wrapper = document.createElement("div");
        wrapper.className = "mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200";
        // Page label
        const label = document.createElement("div");
        label.textContent = `Page ${meta.pageNum}`;
        label.className = "mb-2 text-sm font-semibold text-gray-700";
       // Canvas for rendering
        const canvas = document.createElement("canvas");
        canvas.className = "max-w-full h-auto block";
        wrapper.appendChild(label);
        wrapper.appendChild(canvas);
        container.appendChild(wrapper);

        // Store ref for scrolling
        pagesRefs.current[meta.pageNum - 1] = wrapper;
        // Render page
        const ctx = canvas.getContext("2d");
        canvas.width = Math.floor(meta.viewport.width);
        canvas.height = Math.floor(meta.viewport.height);

        await meta.page.render({ canvasContext: ctx, viewport: meta.viewport }).promise;

        newMeta.push({
          pageNum: meta.pageNum,
          page: meta.page,
          viewport: meta.viewport,
          canvas,
          context: ctx,
          scale: meta.scale,
        });
      }

      setPagesMeta(newMeta);
    };

    load();
  }, [pdfUrl, setPagesMeta, pagesRefs]);

  return (
    <div
      ref={containerRef}
      className="h-full overflow-y-auto p-4 bg-gray-50"
      style={{ scrollbarGutter: "stable" }}
    />
  );
}