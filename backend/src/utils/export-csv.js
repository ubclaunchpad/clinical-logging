export default async function exportCSV(logbookLogs) {

    const csvHeader = Object.keys(logbookLogs[0]).join(',') + '\n';
    const csvBody= logbookLogs.map(row => Object.values(row).join(',')).join('\n');

    const csvFile = csvHeader + csvBody;
    return csvFile;
}