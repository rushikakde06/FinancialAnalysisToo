
import React from "react";

function Citation({ id, page, phrase, onClick }) {
  return (
    <span
      className="text-blue-600 underline cursor-pointer font-medium hover:text-blue-800"
      onClick={() => onClick(phrase, page)}
    >
      [{id}]
    </span>
  );
}

export default function Sidebar({ onCitationClick }) {
  return (
    <aside className="h-full overflow-y-auto p-6 bg-white border-l border-gray-200 text-sm leading-relaxed">
      <h2 className="text-lg font-bold mb-4 text-gray-800">
        Maersk Q2 2025 Interim Report
      </h2>

      <div className="space-y-5 text-gray-700">
        {/* ANALYSIS SECTION */}
        <section>
          <h3 className="font-bold text-base mb-2">Analysis</h3>
          <p>
            No extraordinary or one-off items affecting EBITDA were reported in Maersk’s Q2 2025 results. 
            The report explicitly notes that EBITDA improvements stemmed from operational performance—
            including volume growth, cost control, and margin improvement across Ocean, Logistics & 
            Services, and Terminals segments{" "}
            <Citation id={1} page={3} phrase="Maersk’s results continued to improve year-on-year" onClick={onCitationClick} />
            {" "}<Citation id={2} page={5} phrase="EBITDA increased to USD 2.3 bn" onClick={onCitationClick} />
            . Gains or losses from asset sales, which could qualify as 
            extraordinary items, are shown separately under EBIT and not included in EBITDA. The gain on 
            sale of non-current assets was USD 25 m in Q2 2025, significantly lower than USD 208 m in Q2 
            2024, but these affect EBIT, not EBITDA{" "}
            <Citation id={3} page={15} phrase="Gain on sale of non-current assets, etc" onClick={onCitationClick} />
            . Hence, Q2 2025 EBITDA reflects core operating 
            activities without one-off extraordinary adjustments.
          </p>
        </section>

        {/* FINDINGS SECTION */}
        <section>
          <h3 className="font-bold text-base mb-2">Findings</h3>
          <p>
            <strong>Page 3 — Highlights Q2 2025</strong><br />
            EBITDA increase (USD 2.3 bn vs USD 2.1 bn prior year) attributed to operational improvements; no 
            mention of extraordinary or one-off items.{" "}
            <Citation id={1} page={3} phrase="Maersk’s results continued to improve year-on-year" onClick={onCitationClick} />
          </p>
          <p>
            <strong>Page 5 — Review Q2 2025</strong><br />
            EBITDA rise driven by higher revenue and cost control across all segments; no extraordinary gains 
            or losses included.{" "}
            <Citation id={2} page={5} phrase="EBITDA increased to USD 2.3" onClick={onCitationClick} />
          </p>
          <p>
            <strong>Page 15 — Condensed Income Statement</strong><br />
            Gain on sale of non-current assets USD 25 m (vs USD 208 m prior year) reported separately below 
            EBITDA; therefore, not part of EBITDA.{" "}
            <Citation id={3} page={15} phrase="Gain on sale of non-current assets, etc" onClick={onCitationClick} />
          </p>
        </section>

        {/* SUPPORTING EVIDENCE */}
        <section>
          <h3 className="font-bold text-base mb-2">Supporting Evidence</h3>
          <p>
            <strong>[1] A.P. Moller – Maersk Q2 2025 Interim Report (7 Aug 2025) — Page 3 →</strong><br />
            “Maersk’s results continued to improve year-on-year … EBITDA of USD 2.3 bn (USD 2.1 bn) … 
            driven by volume and other revenue growth in Ocean, margin improvements in Logistics & 
            Services and significant top line growth in Terminals.”
          </p>
          <p>
            <strong>[2] A.P. Moller – Maersk Q2 2025 Interim Report (7 Aug 2025) — Page 5 →</strong><br />
            “EBITDA increased to USD 2.3 bn (USD 2.1 bn) … driven by higher revenue and cost management 
            … Ocean’s EBITDA … slightly increased by USD 36 m … Logistics & Services contributed 
            significantly with a USD 71 m increase … Terminals’ EBITDA increased by USD 50 m.”
          </p>
          <p>
            <strong>[3] A.P. Moller – Maersk Q2 2025 Interim Report (7 Aug 2025) — Page 15 →</strong><br />
            “Gain on sale of non-current assets, etc., net 25 (208) … Profit before depreciation, amortisation 
            and impairment losses, etc. (EBITDA) 2,298
          </p>
        </section>
      </div>
    </aside>
  );
}