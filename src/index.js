import process from 'node:process';
import fs from 'node:fs';
import frida from 'frida';

const hWnd = parseInt(process.argv[2]);
const band = parseInt(process.argv[3]);

let session;

try {
    session = await frida.attach('explorer.exe');
} catch (error) {
    // Workaround in case there are several 'explorer.exe' processes.
    if (error.message.startsWith('Ambiguous name; it matches:')) {
        const pid = Number.parseInt(error.message.match(/\d+/)[0]);
        session = await frida.attach(pid);
    }
    else throw error;
}

const code = fs.readFileSync('./src/scripts/explorer.js', 'utf8');

const script = await session.createScript(code);

script.message.connect(
    ({ payload }) => {
        console.log(payload);
        if (payload.cmd === 'done')
            process.exit(payload.swb.lastError);
    }
);

await script.load();

script.post({ hWnd, band });
