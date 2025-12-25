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
    }else if (tool === 'gobuster') {
    command = 'gobuster';
    const wordlistBase = '/usr/share/wordlists'; // Adjust based on your server
    
    switch (mode) {
      case 'common': args = ['dir', '-u', target, '-w', `${wordlistBase}/dirb/common.txt`]; break;
      case 'medium': args = ['dir', '-u', target, '-w', `${wordlistBase}/dirbuster/directory-list-2.3-medium.txt`]; break;
      case 'big':    args = ['dir', '-u', target, '-w', `${wordlistBase}/dirb/big.txt`]; break;
      case 'custom': args = [...customFlags.split(' ')]; break;
      default:      args = ['dir', '-u', target];
    }
    }else if (tool === 'subfinder') {
      command = 'subfinder';
      switch (mode) {
        case 'passive': args = ['-d', target, '-silent']; break;
        case 'all':     args = ['-d', target, '-all', '-silent']; break;
        case 'recursive': args = ['-d', target, '-recursive', '-silent']; break;
        case 'custom':  args = [...customFlags.split(' '), '-d', target]; break;
        default:        args = ['-d', target];
      }
    } else if (tool === 'nikto') {
    command = 'nikto';
    switch (mode) {
      case 'quick':    args = ['-h', target, '-Tuning', '123b']; break; // Software, interesting files, headers
      case 'full':     args = ['-h', target, '-C', 'all']; break;       // All CGI directories
      case 'secure':   args = ['-h', target, '-ssl']; break;            // Force SSL scan
      case 'custom':   args = [...customFlags.split(' '), '-h', target]; break;
      default:         args = ['-h', target, '-nossl']; 
    }
    // Standard Nikto hygiene flags
    args.push('-Display', '1'); // Only show found items
    args.push('-nointeractive');
    }else if (tool === 'sqlmap') {
      command = 'sqlmap';
      // Use --batch to prevent sqlmap from hanging on interactive prompts
      // Use --random-agent to avoid detection
      switch (mode) {
        case 'probe':  args = ['-u', target, '--batch', '--random-agent', '--level=1']; break;
        case 'dbs':    args = ['-u', target, '--batch', '--random-agent', '--dbs']; break;
        case 'tables': args = ['-u', target, '--batch', '--random-agent', '--tables']; break;
        case 'custom': args = ['-u', target, ...customFlags.split(' '), '--batch']; break;
        default:       args = ['-u', target, '--batch'];
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