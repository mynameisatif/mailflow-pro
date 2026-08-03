import fs from 'fs';
import path from 'path';

const readmePath = path.resolve('README.md');
const pdfPath = path.resolve('PROJECT_SUMMARY.pdf');
const text = fs.readFileSync(readmePath, 'utf-8');
const lines = text.split('\n');

const wrapLine = (line, maxChars) => {
  const segments = [];
  let remaining = line;
  while (remaining.length > maxChars) {
    let splitAt = remaining.lastIndexOf(' ', maxChars);
    if (splitAt === -1) splitAt = maxChars;
    segments.push(remaining.slice(0, splitAt));
    remaining = remaining.slice(splitAt).trim();
  }
  if (remaining.length > 0) segments.push(remaining);
  return segments;
};

const wrapped = [];
for (const line of lines) {
  if (line.trim() === '') {
    wrapped.push('');
  } else {
    wrapped.push(...wrapLine(line, 90));
  }
}

const pageWidth = 612;
const pageHeight = 792;
const margin = 72;
const lineHeight = 14;
const maxLines = Math.floor((pageHeight - margin * 2) / lineHeight);

const pages = [];
let current = [];
for (const line of wrapped) {
  if (current.length >= maxLines) {
    pages.push(current);
    current = [];
  }
  current.push(line);
}
if (current.length > 0) pages.push(current);

const objects = [];
const objectOffsets = [];
let offset = 0;

const write = (data) => {
  const buffer = Buffer.from(data, 'utf8');
  offset += buffer.length;
  objects.push(buffer);
};

const addObject = (content) => {
  objectOffsets.push(offset);
  write(`${objectOffsets.length} 0 obj\n${content}\nendobj\n`);
};

const contentObjects = [];
for (const page of pages) {
  let stream = 'BT\n/F1 12 Tf\n72 720 Td\n';
  for (const line of page) {
    const escaped = line.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
    stream += `(${escaped}) Tj\nT*\n`;
  }
  stream += 'ET\n';
  const length = Buffer.byteLength(stream, 'utf8');
  const contentObj = `<< /Length ${length} >>\nstream\n${stream}endstream`;
  contentObjects.push(contentObj);
}

addObject('<< /Type /Catalog /Pages 2 0 R >>');
addObject(`<< /Type /Pages /Kids [${pages.map((_, i) => `${i + 3} 0 R`).join(' ')}] /Count ${pages.length} >>`);
for (let i = 0; i < pages.length; i += 1) {
  addObject(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 ${pages.length + 3} 0 R >> >> /Contents ${i + 3 + pages.length} 0 R >>`);
}
addObject('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>');
for (const contentObj of contentObjects) {
  addObject(contentObj);
}

const xrefOffset = offset;
write('xref\n0 ' + (objectOffsets.length + 1) + '\n0000000000 65535 f \n');
for (const objOffset of objectOffsets) {
  write(objOffset.toString().padStart(10, '0') + ' 00000 n \n');
}
write(`trailer\n<< /Size ${objectOffsets.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`);

fs.writeFileSync(pdfPath, Buffer.concat(objects));
console.log('Generated PDF at', pdfPath);
