import React from "react";
import "./Table1.css";
import EditIcon from "@mui/icons-material/Edit";

const Table1 = () => {
  return (
    <div className="table-container">
      <div className="notification-container">
        <p className="notification-text">
          Your photos have been successfully transcribed!
          <br />
          Please review and edit the information as needed.
        </p>
      </div>
      <div className="edit-button-container">
        <button className="edit-button">
          <EditIcon />
          Edit
        </button>
      </div>

      <div className="header-section">
        <div className="header-cell">Case No.</div>
        <div className="header-cell">Type:</div>
        <div className="header-cell">Surgeon:</div>
        <div className="header-cell">OR Date:</div>
      </div>

      <div className="info-section">
        <div className="info-cell">1234567</div>
        <div className="info-cell type-cell">&lt;insert type&gt;</div>
        <div className="info-cell">&lt;surgeon name&gt;</div>
        <div className="info-cell">&lt;MM/YY/DD&gt;</div>
      </div>

      <div className="patient-section">
        <div className="left-column">
          <div className="info-pair">
            <div className="label">Patient ID:</div>
            <div className="value">&lt;patient ID&gt;</div>
          </div>
          <div className="info-pair">
            <div className="label">Age:</div>
            <div className="value">30</div>
          </div>
          <div className="info-pair">
            <div className="label">Gender:</div>
            <div className="value">M</div>
          </div>
          <div className="info-pair">
            <div className="label">HPI:</div>
            <div className="value">&lt;hpi&gt;</div>
          </div>
        </div>

        <div className="right-column">
          <div className="indication-section">
            <div className="indication-header">
              Indication for Surgery/Reason for Referral:
            </div>
            <div className="indication-text">
              Lorem ipsum dolor sit amet consectetur.
            </div>
          </div>
          <div className="social-section">
            <div className="social-header">Social:</div>
            <div className="social-row">
              <div className="social-cell">
                EtOH: <span>None</span>
              </div>
              <div className="social-cell">
                Drugs: <span>Occasional</span>
              </div>
              <div className="social-cell">
                Smoking: <span>Quit</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="medical-section">
        <div className="pmhx-column">
          <div className="medical-header">PMHx</div>
          <div className="condition-row">
            <div className="condition">HTN</div>
            <div className="c-value">&lt;##&gt;</div>
          </div>
          <div className="condition-row">
            <div className="condition">DM II</div>
            <div className="c-value">&lt;##&gt;</div>
          </div>
          <div className="condition-row">
            <div className="condition">DLP</div>
            <div className="c-value">&lt;##&gt;</div>
          </div>
          <div className="condition-row">
            <div className="condition">CVA</div>
            <div className="c-value">&lt;##&gt;</div>
          </div>
        </div>

        <div className="meds-column">
          <div className="medical-header">Meds (last dose)</div>
          <div className="meds-text">
            Lorem ipsum dolor sit amet consectetur. Nisi nec ultricies commodo.
          </div>
        </div>

        <div className="allergies-column">
          <div className="medical-header">Allergies</div>
          <div className="allergies-text">
            Lorem ipsum dolor sit amet consectetur. Et ac porta turpis rutrum
            pellentesque id vulputate hendrerit. Venenatis elementum sagittis
            luctus urna.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table1;
