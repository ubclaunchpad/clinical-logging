import "./LogbookModalInformation.css"
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

export default function LogbookModalInformation({ title, type, dateCreated, storage }) {
  return (
    <div className="logbook-modal-information">
        <PencilSquareIcon className="modal-icon"/>
        <h1>{title}</h1>
        <h3 className="type-information">Type: <span className="type-font">{type}</span></h3>
        <span>Created: {dateCreated}</span>
        <div className="modal-storage-info">
            <div className="modal-storage-count-div">
                <span className="modal-storage-count">{storage}</span>/100 logs used
            </div>

            <span className="modal-storage-percentage">{storage}%</span>
        </div>
        <BorderLinearProgress variant="determinate" value={storage}/>
    </div>
  );
}

// Customized Linear Progress Bar
// https://mui.com/material-ui/react-progress/?srsltid=AfmBOorDtjgBdjfmabYQ_boMTPLmihdHEIxU8G2lbdBC32pek2RR3QWh
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
    ...theme.applyStyles('dark', {
      backgroundColor: theme.palette.grey[800],
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#244B94',
    ...theme.applyStyles('dark', {
      backgroundColor: '#308fe8',
    }),
  },
}));
