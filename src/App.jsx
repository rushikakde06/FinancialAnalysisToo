import React, { useState, useRef, useEffect } from "react";
import Header from "./components/Header";
import PdfViewer from "./components/PdfViewer";
import Sidebar from "./components/Sidebar";
import * as pdfjsLib from "pdfjs-dist";

import MaerskPDF from "./assets/MaerskQ22025InterimReport.pdf";

export default function App() {
  const [pdfUrl] = useState(MaerskPDF);
  const [pagesMeta, setPagesMeta] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const pagesRefs = useRef([]);
  const [highlightTrigger, setHighlightTrigger] = useState(0);

  // Re-highlight when searchWord or pages change
  useEffect(() => {
    if (!pagesMeta.length || !searchWord.trim()) return;
    highlightAll();
  }, [searchWord, pagesMeta, highlightTrigger]);

  const highlightAll = async () => {
    const needle = searchWord.trim().toLowerCase();

    for (const meta of pagesMeta) {
      // Clear canvas
      const ctx = meta.context;
      ctx.clearRect(0, 0, meta.canvas.width, meta.canvas.height);
      await meta.page.render({
        canvasContext: ctx,
        viewport: meta.viewport,
      }).promise;

      const textContent = await meta.page.getTextContent();

      ctx.save();
      ctx.globalAlpha = 0.35;
      ctx.fillStyle = "yellow";

      textContent.items.forEach((item) => {
        const str = (item.str || "").toLowerCase();
        if (!str.includes(needle)) return;

        const tr = pdfjsLib.Util.transform(meta.viewport.transform, item.transform);
        const x = tr[4];
        const y = tr[5];
        const fontHeight = Math.hypot(tr[2], tr[3]);
        let width = (item.width || 0) * meta.scale;
        if (!width || width < 1) width = str.length * (fontHeight * 0.55);

        ctx.fillRect(x, y - fontHeight, width, fontHeight);
      });

      ctx.restore();
    }
  };

  const scrollToPage = (pageNum) => {
    const wrapper = pagesRefs.current[pageNum - 1];
    if (wrapper) {
      wrapper.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleCitationClick = (phrase, pageNum) => {
    setSearchWord(phrase);
    setHighlightTrigger(prev => prev + 1);
    setTimeout(() => scrollToPage(pageNum), 400);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <section className="w-full md:w-1/2 overflow-hidden flex flex-col">
          <PdfViewer
            pdfUrl={pdfUrl}
            pagesMeta={pagesMeta}
            setPagesMeta={setPagesMeta}
            pagesRefs={pagesRefs}
            onHighlight={() => searchWord && highlightAll()}
          />
        </section>
        <section className="hidden md:block w-full md:w-1/2">
          <Sidebar onCitationClick={handleCitationClick} />
        </section>
      </div>
    </div>
  );
}