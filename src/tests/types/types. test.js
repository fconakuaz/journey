const { types } = require("node-sass");


describe('Pruebas con nuestros pasivos...', () => {

    test('debe de tener', () => {
        expect( types ).toEqual({
            // Basic
            login               : '[Auth] Login',
            logout              : '[Auth] Logout',
            
            // UI
            uiSetError          : '[UI] Set Error',
            uiRemoveError       : '[UI] Remove Error',
            uiStartLoading      : '[UI] Start loading',
            uiFinishLoading     : '[UI] Finish loading',

            // Notes
            notesAdded          : '[Notes] New note',
            notesActive         : '[Notes] Set active note',
            notesLoad           : '[Notes] Load notes',
            notesUpdate         : '[Notes] Update note',
            notesFileUrl        : '[Notes] Update image url',
            notesDelete         : '[Notes] Delete note',
            notesLogoutCleaning : '[Notes] Logout cleaning',
        });

    });
    
});