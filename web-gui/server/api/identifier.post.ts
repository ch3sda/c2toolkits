import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
const execAsync = promisify(exec);

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { input, mode } = body; // mode = "encode" | "hash"

  if (!input) return { success: false, error: "No input provided." };

  // Path to your Bash script
const scriptPath = path.resolve(process.cwd(), '../tools/identifier/identifier.sh');
  try {
    // Escape quotes to avoid command injection
    const safeInput = input.replace(/"/g, '\\"');
    const safeMode = mode === "hash" ? "hash" : "encode";

    const command = `bash "${scriptPath}" "${safeInput}" "${safeMode}"`;

    const { stdout, stderr } = await execAsync(command);

    if (stderr) return { success: false, error: stderr.trim() };

    let output;
    try {
      output = JSON.parse(stdout);
    } catch {
      // If parsing fails, return raw output
      output = { raw: stdout.trim() };
    }

    return { success: true, output };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
});
