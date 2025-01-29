/** Formats a given log type to a more readable display name */
export default function formatType(type) {
  let formattedType;
  switch (type) {
    case "adult_cardiac_logs":
      formattedType = "Cardiac Surgery - Adult";
      break;
    case "congenital_surgery_logs":
      formattedType = "Cardiac Surgery - Congenital";
      break;
    case "general_surgery_logs":
      formattedType = "General Surgery";
      break;
    case "gyn_logs":
      formattedType = "Obstetrics/Gynecology";
      break;
    case "ob_logs":
      formattedType = "Obstetrics/Gynecology";
      break;
    default:
      formattedType = "Unknown Type";
      break;
  }
  return formattedType;
}
