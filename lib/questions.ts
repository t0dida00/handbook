import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'questions.json');

export function getQuestions() {
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  console.log(jsonData)
  return JSON.parse(jsonData);
  
}
