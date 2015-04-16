/**
 * Inspect.EL Copyright (c) 2014 Miguel Castillo.
 *
 * Licensed under MIT
 */

define(function(require /*, exports, module*/) {
    "use strict";

    var AppInit            = brackets.getModule("utils/AppInit");
    var CommandManager     = brackets.getModule("command/CommandManager");
    var Menus              = brackets.getModule("command/Menus");
    var PreferencesManager = brackets.getModule("preferences/PreferencesManager");
    var PREFERENCES_KEY    = "brackets-inspect-editor-dom";
    var prefs              = PreferencesManager.getExtensionPrefs(PREFERENCES_KEY);
    var COMMAND_ID         = PREFERENCES_KEY;
    var menu               = Menus.getMenu(Menus.AppMenuBar.EDIT_MENU);
    var command            = CommandManager.register("Inspect Editor DOM", COMMAND_ID, setEnabled);
    var inspectRules       = require("text!main.css");
    var $inspect           = $("<style id='inspect'>").appendTo("head");


    prefs.definePreference("enabled", "boolean", false).on("change", function() {
        var value = prefs.get("enabled");
        $inspect.text(value ? inspectRules : "");

        if (value !== command.getChecked()) {
            command.setChecked(value);
        }
    });

    menu.addMenuDivider();
    menu.addMenuItem(COMMAND_ID);


    function setEnabled() {
        prefs.set("enabled", !command.getChecked());
    }


    function initialize() {
        command.setChecked(prefs.get("enabled"));
    }


    AppInit.appReady(initialize);
});
