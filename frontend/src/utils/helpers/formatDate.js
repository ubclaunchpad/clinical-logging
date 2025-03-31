/** Formats date to "YYYY-MM-DD HH:MM" */
export default function formatDate(date) {
    const createdDate = new Date(date);
    return `${createdDate.toLocaleDateString('en-CA')} ${createdDate.toLocaleTimeString('en-CA', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    })}`;
}
  