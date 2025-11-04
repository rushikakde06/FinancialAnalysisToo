# Maersk Q2 2025 Financial Analysis Tool  



## What You See  
| Left Panel | Right Panel |
|-----------|------------|
| Full 25-page Maersk PDF | Exact analysis text with clickable **[1][2][3]** |

---

## Features  
- Official Maersk header (Q2 2025 + “ALL THE WAY”)  
- Pixel-perfect yellow highlight using **PDF.js text layer**  
- Smooth scroll to Page 15  
- Works **every single click** (canvas cleared each time)  
- Mobile-first (stacks on phone)  
- Zero file picker – PDF baked in  

---

## Tech Stack  

React 18 + Vite
PDF.js → canvas rendering + text coordinates
Tailwind CSS → header & responsive layout

## Folder Structure

maersk-q2-2025/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   ├── MaerskQ22025InterimReport.pdf
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── PdfViewer.jsx
│   │   └── Sidebar.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md   ← you are here

## How to Run

git clone https://github.com/rushikakde06/FinancialAnalysisToo.git
cd maersk-q2-2025
npm install && npm run dev
