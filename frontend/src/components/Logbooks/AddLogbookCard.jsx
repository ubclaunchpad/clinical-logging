import { PlusIcon } from "@heroicons/react/24/outline";
import "./AddLogbookCard.css";

export default function AddLogbookCard() {
  return (
    <div className="add-logbook-card">
      <PlusIcon className="plus-circle-icon" />
      <span>Add Log Book</span>
    </div>
  );
}
