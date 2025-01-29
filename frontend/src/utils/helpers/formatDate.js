/** Formats date from "YYYY-MM-DD HH:MM:SS.ssssss+TZ" to "YYYY-MM-DD" */
export default function formatDate(date) {
    const createdDate = new Date(date);
    return createdDate.toLocaleDateString('en-CA');
  }
  