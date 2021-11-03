'use strict';

/*
Funciones para cargar el parámetro de la extension.
Parametro: Codigo de tablero
El parametro se guarda en los "settings"
	CFG_CODIGO_TABLERO
Revisar que el valor de este campo sea igual al que se
encuentra en la función que invoca.	
*/

// Función que contiene todo el codigo
(function () {
	const C_SETCODIGOTABLERO = 'CFG_CODIGO_TABLERO';

	$(document).ready(function () {
		// Activacion de la sección TRACE
		// $('.divtrace').show();
		// -----
		// $("#mytracecfg").html(function(i,origText){return origText + "</br> CFG Ready";});
		tableau.extensions.initializeDialogAsync().then(function (openPayload) {
			$('#parDiagCodigoTablero').val(openPayload);
			buildDialog();
		});
	}); // Fin funcion ready

    function buildDialog() {
		// $("#mytracecfg").html(function(i,origText){return origText + "</br> CFG inicia: buildDialog";});
        //$('#cancel').click(closeDialog);
        $('#aceptarBoton').click(aceptarBoton);
        // $('.select').select2();  // Revisar el uso  ...................
    } // fin funcion buildDialog

	// Revisar el uso ....................
    function reloadSettings() {
		// $("#mytracecfg").html(function(i,origText){return origText + "</br> CFG inicia: reloadSettings";});
    }  // fin funcion reloadSettings

    function closeDialog() {
		// $("#mytracecfg").html(function(i,origText){return origText + "</br> CFG inicia: closeDialog";});
        tableau.extensions.ui.closeDialog("");
    } // fin funcion  closeDialog

    function aceptarBoton() {
		// $("#mytracecfg").html(function(i,origText){return origText + "</br> CFG inicia: aceptarBoton";});

        tableau.extensions.settings.set(C_SETCODIGOTABLERO, $("#parDiagCodigoTablero").val());

		// $("#mytracecfg").html(function(i,origText){return origText + "</br> CFG antes: saveAsync";});
        tableau.extensions.settings.saveAsync().then((currentSettings) => {
		    // $("#mytracecfg").html(function(i,origText){return origText + "</br> CFG inicia: saveAsync";});
            tableau.extensions.ui.closeDialog($("#parDiagCodigoTablero").val());
        });
		// $("#mytracecfg").html(function(i,origText){return origText + "</br> CFG fin: aceptarBoton";});
    } // fin funcion aceptarBoton

})(); // Fin Funcion complete
