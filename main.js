/*
    Window z-order in Windows 10
    - https://blog.adeltax.com/window-z-order-in-windows-10/

    Frida
    - https://github.com/oleavr/frida-agent-example
    - https://frida.re/docs/functions/
    - https://frida.re/docs/javascript-api/

    Usage
    - node main.js <hwnd> <hwndInsertAfter> <band>
    - hwnd: A handle to the window.
    - hwndInsertAfter: A handle to the window to precede the positioned window in the Z order.
    - band: One of the ZBID values.
*/

const fs = require('fs');
const util = require('util');
const childProc = require('child_process');
const exec = util.promisify(childProc.exec);
const frida = require('frida');

const ZBID = {
    DEFAULT: 0,
    DESKTOP : 1,
    UIACCESS : 2,
    IMMERSIVE_IHM : 3,
    IMMERSIVE_NOTIFICATION : 4,
    IMMERSIVE_APPCHROME : 5,
    IMMERSIVE_MOGO : 6,
    IMMERSIVE_EDGY : 7,
    IMMERSIVE_INACTIVEMOBODY : 8,
    IMMERSIVE_INACTIVEDOCK : 9,
    IMMERSIVE_ACTIVEMOBODY : 10,
    IMMERSIVE_ACTIVEDOCK : 11,
    IMMERSIVE_BACKGROUND : 12,
    IMMERSIVE_SEARCH : 13,
    GENUINE_WINDOWS : 14,
    IMMERSIVE_RESTRICTED : 15,
    SYSTEM_TOOLS : 16,
    // Windows 10+
    LOCK : 17,
    ABOVELOCK_UX : 18
};

async function powershell(command)
{
    return (await exec(`powershell -command "${command}"`))
        .stdout.trim();
}

async function main()
{
    const hwnd = Number.parseInt(process.argv[2]);
    const hwndInsertAfter = Number.parseInt(process.argv[3]);
    const band = Number.parseInt(process.argv[4]);

    if (Object.values(ZBID).indexOf(band) == -1)
        throw 'invalid band';

    let session = null;

    try {
        session = await frida.attach('explorer.exe');
    } catch (error) {
        // Workaround in case there is more than one 'explorer.exe' process.
        const message = `${error}`;
        if (message.startsWith('Error: Ambiguous name; it matches:')) {
            const pid = Number.parseInt(`${error}`.match(/\d+/)[0]);
            session = await frida.attach(pid);
        } else {
            throw error;
        }
    }

    const code = fs.readFileSync('./script.js', 'utf8');

    const script = await session.createScript(code);

    script.message.connect(function (message, data) {
        console.log(message);

        if (message.payload.reason == 'waiting') {
            //powershell("(New-Object -ComObject 'wscript.shell').SendKeys('^{ESC}')")
        } else if (message.payload.reason == 'done') {
            process.exit(message.error);
        }
    });

    await script.load();

    const message = {
        hwnd: hwnd,
        hwndInsertAfter: hwndInsertAfter,
        band: band
    };

    script.post(message);
}

main();
