/**
 * Inspect.EL Copyright (c) 2014 Miguel Castillo.
 *
 * Licensed under MIT
 */

define(function(require /*, exports, module*/) {
    'use strict';

    var CommandManager     = brackets.getModule('command/CommandManager'),
        Menus              = brackets.getModule('command/Menus'),
        PreferencesManager = brackets.getModule('preferences/PreferencesManager'),
        PREFERENCES_KEY    = 'brackets-inspect-editor-dom',
        prefs              = PreferencesManager.getExtensionPrefs(PREFERENCES_KEY);

    var inspectRules = require('text!main.css');
    var $inspect = $("<style id='inspect'>").appendTo("head");

    prefs.definePreference("enabled", "boolean", "false").on("change", function () {
        if (prefs.get('enabled') === true) {
            $inspect.text(inspectRules);
        }
        else {
            $inspect.text('');
        }
    });

    // Set up the menu and callback for it
    (function() {
        var COMMAND_ID = PREFERENCES_KEY,
            menu       = Menus.getMenu(Menus.AppMenuBar.EDIT_MENU),
            command    = CommandManager.register('Inspect Editor DOM', COMMAND_ID, setEnabled);

        menu.addMenuDivider();
        menu.addMenuItem(COMMAND_ID);

        function setEnabled() {
            var enabled = !command.getChecked();
            command.setChecked(enabled);
            prefs.set('enabled', enabled);
        }

        command.setChecked(prefs.get('enabled'));
        setEnabled();
    })();
});
