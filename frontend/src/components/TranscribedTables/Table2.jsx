import React from "react";
import "./Table2.css";

const Table2 = () => {
  return (
    <div className="table-container">
      {/* Header Row */}
      <div className="header-row">
        <div className="exam-cell">EXAM</div>
        <div className="physical-section">
          <div className="physical-row">
            <div className="physical-cell">
              <span>___</span> kg
            </div>
            <div className="physical-cell">
              <span>___</span> cm
            </div>
            <div className="physical-cell">
              <span>___</span> m<sup>2</sup>
            </div>
          </div>
        </div>
        <div className="header-cell2">Veins</div>
        <div className="header-cell2">Allen Test</div>
        <div className="header-cell2">Pulses:</div>
      </div>

      {/* Exam Content */}
      <div className="info-row">
        <div className="left-placeholder">
          <p>...</p>
        </div>
        <div className="right-section-only">
          {/* Content for the right side */}
          <p>Diagrams.</p>
        </div>
        <div className="left-placeholder-2">
          <p>INVx</p>
          {/* Investigations Section */}
          <div className="investigations-section">
            <div className="investigations-content">
              <div className="invx-row">
                <div className="cell">Echo</div>
                <div className="cell">EF ___%</div>
                <div className="cell">RVFx</div>
              </div>
              <div className="rows">
                <div className="cells">WMA</div>
              </div>
              <div className="rows">
                <div className="cells">Aorta</div>
              </div>
              <div className="rows">
                <div className="cells">Valves</div>
              </div>
            </div>
          </div>
        </div>
        <div className="right-section-only-2">
          {/* Content for the right side */}
          <p>Diagrams.</p>
        </div>
        <div className="right-section-only-3">
          {/* Content for the right side */}
          <p>CXR</p>
        </div>
      </div>

      {/* CXR and CT Sections */}
      <div className="cxr-ct-section">
        <div className="ct-section"></div>
      </div>
    </div>
  );
};

export default Table2;
