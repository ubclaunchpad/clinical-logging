import { LogbookTypeInfo } from "./LogbookTypeInfo";
import LogRectangle from "../../assets/images/LogRectangle.png";
import formatType from "../../utils/helpers/formatType"
import formatDate from "../../utils/helpers/formatDate";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useState } from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import "./LogbookCard.css";
import LogbookModalInformation from "./LogbookModalInformation";
import LogbookModalRecentLogs from "./LogbookModalRecentLogs";

export default function LogbookCard({ title, type, storage, created, id }) {
  const formattedType = formatType(type);
  const formattedDate = formatDate(created);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  /** Retrieve type information from the mapping */
  const typeInfo = LogbookTypeInfo[formattedType] || {};

  /** Construct class name */
  const className = ["logbook-card", typeInfo.className]
    .filter(Boolean)
    .join(" ");

  /** Get the corresponding book image */
  const bookImage = typeInfo.image || LogRectangle; // Fallback to LogRectangle if image not found

  return (
    <>
      <div className={className} onClick={handleOpen}>
        <div className="book-cover">
          <img src={bookImage} alt={formattedType} className="book-cover-image" />
        </div>
        <div className="details-container">
          <img src={LogRectangle} alt="" className="log-rectangle" />
          <div className="book-details">
            <h3 className="book-title">{title}</h3>
            <div className="type-label">
              Type: <span className="type-value">{formattedType}</span>
            </div>
            <div className="storage-info">
              Storage: <span className="storage-count">{storage}</span>/ 100 logs
              used
            </div>
            <div className="created-date">
              <strong>Created</strong> {formattedDate}
            </div>
          </div>
        </div>
      </div>

      <Modal open={open} onClose={handleClose}>
        <Box className="logbook-modal-content">
          <button className="close-modal-button" onClick={handleClose}>
            <XMarkIcon className="close-x-icon"/>
          </button>
          <div className="modal-container">
            <div className="modal-image-container">
              <ChevronLeftIcon/>
              <img src={bookImage} alt={formattedType} className="modal-book-cover-image" />
              <ChevronRightIcon/>
            </div>
            <LogbookModalInformation title={title} type={formattedType} dateCreated={formattedDate} storage={storage}/>
            <LogbookModalRecentLogs logbookID={id}/>
          </div>
        </Box>
      </Modal>
    </>
  );
}
