/**
 * The Hex - form backend (Google Apps Script web app)
 * Saves room bookings and job applications to a Google Sheet, résumés to a Drive folder,
 * and emails you a notice for each one.
 *
 * Setup: see README.md, step 3.
 */
const NOTIFY_EMAIL = '';                 // optional: your email for a notice on each submission
const FOLDER_NAME = 'The Hex - resumes';

function sheet_(name, headers) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(name);
  if (!sh) { sh = ss.insertSheet(name); sh.appendRow(headers); sh.setFrozenRows(1); sh.getRange(1, 1, 1, headers.length).setFontWeight('bold'); }
  return sh;
}
function folder_() {
  const it = DriveApp.getFoldersByName(FOLDER_NAME);
  return it.hasNext() ? it.next() : DriveApp.createFolder(FOLDER_NAME);
}
function clean_(v, n) { return String(v == null ? '' : v).slice(0, n || 2000); }
function json_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }

function doPost(e) {
  const lock = LockService.getScriptLock(); lock.waitLock(20000);
  try {
    const d = JSON.parse(e.postData.contents);
    const when = new Date();
    if (d.type === 'booking') {
      sheet_('Bookings', ['Received', 'Space', 'Date', 'Start', 'People', 'Event type', 'Name', 'Email', 'Notes', 'Status'])
        .appendRow([when, clean_(d.space, 100), clean_(d.date, 20), clean_(d.time, 10), clean_(d.people, 10), clean_(d.eventType, 60),
                    clean_(d.name, 120), clean_(d.email, 200), clean_(d.notes), 'New']);
      if (NOTIFY_EMAIL) MailApp.sendEmail(NOTIFY_EMAIL, 'The Hex: booking request - ' + clean_(d.space, 100),
        clean_(d.name, 120) + ' (' + clean_(d.email, 200) + ') wants ' + clean_(d.space, 100) + ' on ' + clean_(d.date, 20) + ' at ' + clean_(d.time, 10) + ' for ' + clean_(d.people, 10) + ' people.\n\n' + clean_(d.notes));
    } else if (d.type === 'application') {
      let link = '';
      if (d.file && d.file.data) {
        const blob = Utilities.newBlob(Utilities.base64Decode(d.file.data), d.file.mime, clean_(d.name, 80) + ' - ' + clean_(d.file.name, 120));
        link = folder_().createFile(blob).getUrl();
      }
      sheet_('Applications', ['Received', 'Role', 'Name', 'Email', 'Why the Hex', 'Résumé', 'Status'])
        .appendRow([when, clean_(d.role, 100), clean_(d.name, 120), clean_(d.email, 200), clean_(d.why), link, 'New']);
      if (NOTIFY_EMAIL) MailApp.sendEmail(NOTIFY_EMAIL, 'The Hex: application - ' + clean_(d.role, 100), clean_(d.name, 120) + ' (' + clean_(d.email, 200) + ')\n' + link);
    } else {
      return json_({ ok: false, error: 'unknown type' });
    }
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally { lock.releaseLock(); }
}
function doGet() { return json_({ ok: true, service: 'The Hex forms' }); }
