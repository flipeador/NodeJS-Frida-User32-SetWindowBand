const mUser32 = Module.load('user32.dll');

const pGetWindowBand = mUser32.getExportByName('GetWindowBand');
const fGetWindowBand = new SystemFunction(pGetWindowBand, 'int', ['pointer', 'pointer']);

const pSetWindowBand = mUser32.getExportByName('SetWindowBand');
const fSetWindowBand = new SystemFunction(pSetWindowBand, 'int', ['pointer', 'pointer', 'uint']);

let args;

function getWindowBand(hWnd) {
    const buffer = Memory.alloc(4);
    const result = fGetWindowBand(ptr(hWnd), buffer);
    return { ...result, band: buffer.readU32() };
}

function setWindowBand(hWnd, band) {
    return fSetWindowBand(ptr(hWnd), ptr(0), band);
}

Interceptor.attach(pSetWindowBand, {
    onLeave() {
        if (args) {
            Interceptor.detachAll();

            const swb = setWindowBand(args.hWnd, args.band);
            const gwb = getWindowBand(args.hWnd);

            send({ cmd: 'done', swb, gwb });
        }
    }
});

function OnMessage(message) {
    args = message;
    send({ cmd: 'start', info: 'waiting for the start menu to show' });
}

recv(OnMessage);
