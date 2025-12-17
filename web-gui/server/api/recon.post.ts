import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { tool, target, options } = body;

  // Security: Validate inputs!
  if (!tool || !target) {
    return { success: false, error: 'Missing required parameters' };
  }

  try {
    let command = '';
    
    switch (tool) {
      case 'nmap':
        command = `nmap -T4 ${target}`;
        break;
      case 'whois':
        command = `whois ${target}`;
        break;
      // Add more tools as needed
      default:
        return { success: false, error: 'Unknown tool' };
    }

    const { stdout, stderr } = await execAsync(command, { timeout: 30000 });
    
    return { 
      success: true, 
      output: stdout,
      error: stderr || null
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
});