import AdultCardiac from "../../assets/images/adult-cardiac-book.png";
import CongenitalCardiac from "../../assets/images/congenital-cardiac-book.png";
import Obstetrics from "../../assets/images/obstetrics-book.png";
import GeneralSurgery from "../../assets/images/general-surgery-book.png";
import Ophthalmology from "../../assets/images/ophthalmology-book.png";

/** Mapping of logbook types to their class names and images */
export const LogbookTypeInfo = {
  "Cardiac Surgery - Adult": {
    className: "",
    image: AdultCardiac,
  },
  "Cardiac Surgery - Congenital": {
    className: "congenital",
    image: CongenitalCardiac,
  },
  Ophthalmology: {
    className: "ophthalmology",
    image: Ophthalmology,
  },
  "Obstetrics/Gynecology": {
    className: "obstetrics",
    image: Obstetrics,
  },
  "General Surgery": {
    className: "general-surgery",
    image: GeneralSurgery,
  },
};
