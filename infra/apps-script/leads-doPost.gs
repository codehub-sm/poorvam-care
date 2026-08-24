/**
 * Poorvam Care — lead capture endpoint (Google Apps Script web app).
 *
 * This file is the source of truth for the script deployed at
 *   https://script.google.com/macros/s/AKfycbzlz71svz_5jZu8xw5_V6pHZlEPI53zPtg9Ye4UcDm8Eet8zKi4A62mlkxIxr7SgLilWg/exec
 * It lives in the repo because the previous version did not, and that is how a
 * silent data loss survived unnoticed: nobody could diff the mapping.
 *
 * WHAT WENT WRONG BEFORE
 * The old script wrote a row by looking up each sheet header in the posted
 * object. Any payload key without a matching column was dropped with no error,
 * and the client still showed "Message Sent!". When the online-enquiry form
 * shipped with new keys (parentName, country, leadId, stage, concern, language,
 * notes) the sheet still had the old contact-form columns, so a real lead landed
 * as nothing but an email address, an age, and a timestamp.
 *
 * THE RULE THIS FILE ENFORCES
 * A field is never dropped. If a payload key has no column, the column is
 * created. Adding a form field costs a column; it can never cost a lead.
 *
 * Header matching is normalised (lowercased, non-alphanumerics stripped), so an
 * existing human-readable column like "Child Age" is reused for `childAge`
 * instead of being duplicated.
 *
 * The response is JSON. That is what lets the client report a *verified*
 * success instead of assuming one.
 */

/** Tab the leads are written to. Created on first write if absent. */
var SHEET_NAME = 'Leads';

/** Preferred left-to-right column order. Unlisted keys append to the right. */
var CANONICAL_ORDER = [
  'timestamp', 'leadId', 'form', 'stage', 'name', 'email', 'phone', 'country',
  'childName', 'childAge', 'service', 'concern', 'language', 'message',
  'consent', 'pageUrl'
];

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    // Header creation is read-modify-write; two concurrent submissions would
    // otherwise race and write a row against a stale header list.
    lock.waitLock(30000);
  } catch (err) {
    return jsonOut({ ok: false, error: 'busy' });
  }

  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonOut({ ok: false, error: 'empty body' });
    }

    var data = JSON.parse(e.postData.contents);
    var sheet = getSheet_();
    var headers = readHeaders_(sheet);

    // Any key we have no column for gets one, in canonical order first.
    var keys = orderKeys_(Object.keys(data));
    var missing = [];
    for (var i = 0; i < keys.length; i++) {
      if (indexOfHeader_(headers, keys[i]) === -1 && missing.indexOf(keys[i]) === -1) {
        missing.push(keys[i]);
      }
    }
    if (missing.length) {
      sheet.getRange(1, headers.length + 1, 1, missing.length).setValues([missing]);
      headers = headers.concat(missing);
    }

    var row = [];
    for (var c = 0; c < headers.length; c++) {
      row.push(valueFor_(data, headers[c]));
    }
    sheet.appendRow(row);

    return jsonOut({ ok: true, row: sheet.getLastRow(), columnsAdded: missing });
  } catch (err) {
    // Surfaced to the client so it can tell the parent to WhatsApp instead of
    // showing a success screen over a lost lead.
    return jsonOut({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

/** Health check: open the /exec URL in a browser to confirm the deployment. */
function doGet() {
  return jsonOut({ ok: true, service: 'poorvam-leads' });
}

/* ------------------------------------------------------------------ */

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0] || ss.insertSheet(SHEET_NAME);
}

function readHeaders_(sheet) {
  var lastCol = sheet.getLastColumn();
  if (lastCol < 1) return [];
  var values = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  var headers = [];
  for (var i = 0; i < values.length; i++) headers.push(String(values[i]));
  // Trim trailing blanks so new columns land next to real data, not past a gap.
  while (headers.length && normalise_(headers[headers.length - 1]) === '') headers.pop();
  return headers;
}

/** "Child Age", "child_age" and "childAge" are the same column. */
function normalise_(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9]/g, '');
}

function indexOfHeader_(headers, key) {
  var want = normalise_(key);
  for (var i = 0; i < headers.length; i++) {
    if (normalise_(headers[i]) === want) return i;
  }
  return -1;
}

function orderKeys_(keys) {
  var ordered = [];
  for (var i = 0; i < CANONICAL_ORDER.length; i++) {
    if (keys.indexOf(CANONICAL_ORDER[i]) !== -1) ordered.push(CANONICAL_ORDER[i]);
  }
  for (var j = 0; j < keys.length; j++) {
    if (ordered.indexOf(keys[j]) === -1) ordered.push(keys[j]);
  }
  return ordered;
}

/** Reads a payload value for a header, tolerating header formatting drift. */
function valueFor_(data, header) {
  var want = normalise_(header);
  for (var k in data) {
    if (!Object.prototype.hasOwnProperty.call(data, k)) continue;
    if (normalise_(k) !== want) continue;
    var v = data[k];
    if (v === null || v === undefined) return '';
    if (typeof v === 'object') return JSON.stringify(v);
    // Leading "+" and long digit strings must stay text, or Sheets eats the
    // plus and renders a 12-digit phone number in scientific notation.
    if (typeof v === 'string' && /^\+?\d{7,}$/.test(v)) return "'" + v;
    return v;
  }
  return '';
}

function jsonOut(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
