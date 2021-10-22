const user32 = Module.load('user32.dll');
const kernel32 = Module.load('kernel32.dll');

const setWindowBand = user32.getExportByName('SetWindowBand');
const f_setWindowBand = new NativeFunction(setWindowBand, 'int', ['pointer', 'pointer', 'uint']);

const getLastError = kernel32.getExportByName('GetLastError');
const f_getLastError = new NativeFunction(getLastError, 'uint', []);

let swbArgs = null;

Interceptor.attach(setWindowBand, {
    onEnter: function(args)
    {
        if (swbArgs)
        {
            send({
                reason: 'done',
                result: f_setWindowBand(swbArgs.hwnd, swbArgs.hwndInsertAfter, swbArgs.band),
                error: f_getLastError()
            });

            Interceptor.detachAll();
        }

        //send({name: 'onEnter'});
    },

    onLeave: function(retval)
    {
        //send({name: 'onLeave', retval: retval});
    }
});

function onMessage(message)
{
    swbArgs = {
        hwnd: ptr(message.hwnd),
        hwndInsertAfter: ptr(message.hwndInsertAfter),
        band: message.band
    };

    send({
        reason: 'waiting',
        message: 'waiting for the start menu to show'
    });

    recv(onMessage);
}

recv(onMessage);
