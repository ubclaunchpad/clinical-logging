import { AppBar } from "../../components/AppBar/AppBar";
import { Divider } from "@mui/material";
import "./ManualEntry.css"

const ManualEntry = () => {
  return (
    <div>
      <AppBar />
      <div className="manual-entry-container">
        <Divider />
        <h2>1. Surgical and Patient Information</h2>
        <p>Case no.</p>
        <input className="text-input" placeholder="1234567"/>
        <input className="text-input" placeholder="1234567"/>
        <h2>2. Examinations and Investigations</h2>
        <h2>3. Case Planning</h2>
        <textarea className="case-planning-text-area"/>
        <h2>4. Learning Points</h2>
        <textarea className="learning-points-text-area"/>
        <textarea className="learning-points-text-area"/>
      </div>
    </div>
  );
};

export default ManualEntry;
