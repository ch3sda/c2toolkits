import { spawn } from 'child_process';

// Track active processes to allow cancellation
const activeProcesses = new Map();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { tool, target, mode, customFlags, action } = body;

  // Handle Cancellation Request
  if (action === 'cancel') {
    const proc = activeProcesses.get(target);
    if (proc) {
      proc.kill('SIGINT'); // Sends Ctrl+C signal
      activeProcesses.delete(target);
      return { success: true, message: 'Process Terminated' };
    }
    return { success: false, error: 'No active process found' };
  }

  if (!tool || !target) return { success: false, error: 'Target Buffer Empty' };

  return new Promise((resolve) => {
    let command = 'nmap';
    let args: string[] = [];

    // Build Arguments
    if (tool === 'nmap') {
      switch (mode) {
        case 'quick': args = ['-T4', target]; break;
        case 'top':   args = ['--top-ports', '100', target]; break;
        case 'os':    args = ['-O', target]; break;
        case 'full':  args = ['-p-', '-A', '-T4', target]; break;
        case 'vuln':  args = ['--script', 'vuln', target]; break;
        case 'custom': args = [...customFlags.split(' '), target]; break;
        default:      args = [target];
      }
    }

    const child = spawn(command, args);
    activeProcesses.set(target, child);

    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (data) => { stdout += data; });
    child.stderr.on('data', (data) => { stderr += data; });

    child.on('close', (code) => {
      activeProcesses.delete(target);
      resolve({
        success: code === 0 || code === null,
        output: stdout || stderr,
        command_executed: `${command} ${args.join(' ')}`,
        cancelled: code === null
      });
    });

    // Safety timeout
    setTimeout(() => {
      if (activeProcesses.has(target)) {
        child.kill();
        activeProcesses.delete(target);
      }
    }, 120000);
  });
});