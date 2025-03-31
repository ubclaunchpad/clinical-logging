import { PlusIcon } from "@heroicons/react/24/outline";
import "./AddLogbookCard.css";

export default function AddLogbookCard({onClick}) {
  return (
    <div className="add-logbook-card" onClick={onClick}>
      <PlusIcon className="plus-circle-icon" />
      <span>Add Log Book</span>
    </div>
  );
}
