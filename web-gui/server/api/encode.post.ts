import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const execAsync = promisify(exec);

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { tool, input, extra } = body; // extra = shift/key if needed
  const scriptPath = path.resolve(process.cwd(), '../tools/encode/cryptme.sh');

  try {
    const args = extra ? `"${input}" "${extra}"` : `"${input}"`;
    const command = `bash ${scriptPath} noninteractive ${tool} ${args}`;

    const { stdout, stderr } = await execAsync(command);

    if (stderr) return { success: false, error: stderr };
    return { success: true, output: stdout.trim() };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
});
