// Takes in raw string and splits into array of lines, \n delimeter
// Optional boolean parameter to include other delimeters: . ? !
export function SplitLinesFromRaw(raw, allDelim = false) {
  // Add new lines after end-of-sentence punctuation
  if (allDelim) {
    for (let i = 0; i < raw.length; ++i) {
      if (
        raw[i] === "." ||
        raw[i] === "。" ||
        raw[i] === "!" ||
        raw[i] === "?" ||
        raw[i] === "！" ||
        raw[i] === "？"
      ) {
        if (raw[i + 1] === '"' || raw[i + 1] === "”") {
          ++i;
        }
        raw = raw.substr(0, i + 1) + "\n" + raw.substr(i + 1);
      }
    }
  }

  // Split raw by new-line character
  let rawSplit = raw.split(/\n/);

  // Trim leading/trailing whitespace and remove any blank lines after splitting
  for (let i = 0; i < rawSplit.length; ++i) {
    rawSplit[i] = rawSplit[i].trim();
    if (rawSplit[i] === "") {
      rawSplit.splice(i, 1);
      --i;
    }
  }

  return rawSplit;
}

// Takes in raw string and returns number of 'lines' based on \n delimeter
// Optional boolean parameter to include other delimeters: . ? !
export function CountLinesRaw(raw, allDelim) {
  return SplitLinesFromRaw(raw, allDelim).length;
}

// Calculates the diffs between all the entries (array)
// Assumes entries[0] is the original, and all others are corrections
export function CalculateDiffs(entries) {
  const Diff = require("diff");
  const diffLines = []; // Organized by line, not by entry
  for (let i = 0; i < entries[0].length; ++i) {
    diffLines.push([]);
  }

  // Determine if Chinese or other to split by char or word
  const REGEX_CHINESE =
    /[\u4e00-\u9fff]|[\u3400-\u4dbf]|[\u{20000}-\u{2a6df}]|[\u{2a700}-\u{2b73f}]|[\u{2b740}-\u{2b81f}]|[\u{2b820}-\u{2ceaf}]|[\uf900-\ufaff]|[\u3300-\u33ff]|[\ufe30-\ufe4f]|[\uf900-\ufaff]|[\u{2f800}-\u{2fa1f}]/u;
  const hasChinese = REGEX_CHINESE.test(entries[0][0]);

  for (let i = 1; i < entries.length; ++i) {
    // Iterate over all entries
    for (let j = 0; j < entries[i].length; ++j) {
      // Iterate over all lines for each entry
      if (hasChinese) {
        diffLines[j].push(
          Diff.diffChars(entries[0][j].trim(), entries[i][j].trim())
        );
      } else {
        diffLines[j].push(
          Diff.diffWords(entries[0][j].trim(), entries[i][j].trim())
        );
      }
    }
  }

  return diffLines;
}

export function FormatEntriesToLines(entries) {
  const byLines = []; // Organized by line, not by entry
  for (let i = 0; i < entries[0].length; ++i) {
    byLines.push([]);
  }

  for (let i = 1; i < entries.length; ++i) {
    // Iterate over all entries
    for (let j = 0; j < entries[i].length; ++j) {
      // Iterate over all lines for each entry
      byLines[j].push(entries[i][j].trim());
    }
  }

  return byLines;
}

// Returns whether a given line has any corrections
export function AnyCorrections(line) {
  for (let i = 0; i < line.length; ++i) {
    if (line[i].added || line[i].removed) {
      return true;
    }
  }
  return false;
}

// If line exceeds limit of characters, trimmed from the middle and replaced with '...'
// Returns trimmed sentence
export function TrimSentence(line) {
  const LENGTH_LIMIT = 25;
  if (line.length > LENGTH_LIMIT) {
    line = `${line.substr(0, 15)}.....${line.substr(line.length - 10)}`;
  }
  return line;
}

export function ExtractCorrection(raw) {
  // Remove all crossed out text
  raw = raw.replace(/<span style="[^>]*?line-through;.*?">.*?<\/span>/g, "");

  // Remove spans for added text
  raw = raw.replace(/<(.|\n)*?>/g, "");

  // Remove any special characters
  raw = raw.replace(/&[a-z]+;/g, " ");

  return raw;
}

// // Get raw input values from chrome extension
// export function GetRawFromExtension() {
//     chrome.runtime.sendMessage({
//         type: 'raw-request'
//     });
// }
//
// // Receive response from chrome extension
// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//     if (request.type === 'raw-request') {
//         console.log(request.raw);
//
//         document.querySelector('#raw-input').innerHTML = request.raw[0];
//         document.querySelector('button').click();
//     }
// });
