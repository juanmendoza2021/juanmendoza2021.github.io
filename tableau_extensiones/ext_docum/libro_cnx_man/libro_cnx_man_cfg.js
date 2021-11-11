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
	const C_CODIGO_SIN_INFO       = 'SIN_INFORMACION';
	const C_NO_DEFINIDO           = 'No definido';
	const C_PAR_SET_CODIGO        = 'CFG_CODIGO_TABLERO';
	const C_PAR_SET_OWNER         = 'CFG_PROPIETARIOS';
	const C_PAR_SET_SOPORTE       = 'CFG_SOPORTEADORES';
	let var_sw_proc_cfg        = "OK";	
	let var_Par_CodigoTablero  = "ND";
	let var_Par_Owners         = "ND";
	let var_Par_Soporteadores  = "ND";
	
	$(document).ready(function () {
		// Activacion de la sección TRACE
		// $('.divtrace').show();
		// -----
		// $("#mytracecfg").html(function(i,origText){return origText + "</br> CFG Ready";});
		tableau.extensions.initializeDialogAsync().then(function (openPayload) {
			buildDialog();
		});
	}); // Fin funcion ready

    function buildDialog() {
		// $("#mytracecfg").html(function(i,origText){return origText + "</br> CFG inicia: buildDialog";});
		Jala_Cfg();
		if (var_sw_proc_cfg != "OK") {
			var_Par_CodigoTablero    = C_CODIGO_SIN_INFO;
			var_Par_Owners           = C_NO_DEFINIDO;
			var_Par_Soporteadores    = C_NO_DEFINIDO;			
		}
		$('#parDiagCodigoTablero').val(var_Par_CodigoTablero);
		$('#parDiagOwners').val(var_Par_Owners);
		$('#parDiagSoporte').val(var_Par_Soporteadores);
		//$('#cancel').click(closeDialog);
        $('#aceptarBoton').click(aceptarBoton);
        // $('.select').select2();  // Revisar el uso  ...................
    } // fin funcion buildDialog

    function Jala_Cfg() {
		// $("#mytracecfg").html(function(i,origText){return origText + "</br> inicia funcion - Jala_Cfg";});  
		var_Par_CodigoTablero = tableau.extensions.settings.get(C_PAR_SET_CODIGO);
		var_Par_Owners = tableau.extensions.settings.get(C_PAR_SET_OWNER);
		var_Par_Soporteadores = tableau.extensions.settings.get(C_PAR_SET_SOPORTE);		
		if (var_Par_CodigoTablero == undefined || var_Par_CodigoTablero == C_CODIGO_SIN_INFO) {
			var_Par_CodigoTablero = C_CODIGO_SIN_INFO;
			$('#gafete-mensaje-resultado').text("Proceda a configurar la extensión ");
			var_sw_proc_cfg = "ERROR: NO ESTA CONFIGURADO";
		}
		if (var_Par_Owners == undefined || var_Par_Owners == "") {
			var_Par_Owners = C_NO_DEFINIDO;
		}
		if (var_Par_Soporteadores == undefined || var_Par_Soporteadores == "") {
			var_Par_Soporteadores = C_NO_DEFINIDO;
		}
	}  // fin Jala_Cfg
	
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
		
        tableau.extensions.settings.set(C_PAR_SET_CODIGO, $("#parDiagCodigoTablero").val());
        tableau.extensions.settings.set(C_PAR_SET_OWNER, $("#parDiagOwners").val());
        tableau.extensions.settings.set(C_PAR_SET_SOPORTE, $("#parDiagSoporte").val());

        tableau.extensions.settings.saveAsync().then((currentSettings) => {
		    // $("#mytracecfg").html(function(i,origText){return origText + "</br> CFG inicia: saveAsync";});
            tableau.extensions.ui.closeDialog($("#parDiagCodigoTablero").val());
        });
		// $("#mytracecfg").html(function(i,origText){return origText + "</br> CFG fin: aceptarBoton";});
    } // fin funcion aceptarBoton

})(); // Fin Funcion complete
