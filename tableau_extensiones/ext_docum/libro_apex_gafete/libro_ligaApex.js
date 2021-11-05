'use strict';

/**
Funciones para presentar el LIBRO que liga la documentaicón de Tableau
 */

// Función que contiene todo el codigo
(function () {
	// const table = $('#parameterTable');
	// const tableBody = table.children('tbody');
	const C_LIGA_APEX_GAFETE = 'https://apexqa.izzi.mx:9091/ords/f?p=gafete_tablero:gafete::::ClearCache:par_codigo:';
	const C_CODIGO_SIN_INFO = 'SIN_INFORMACION';
	const C_SETCODIGOTABLERO = 'CFG_CODIGO_TABLERO';

	var var_sw_proc = "OK";
	var var_CodigoTablero = "ND";


	// función que se activa despues de cargar la página
	$(document).ready(function () {
		// $("#mytrace").html(function(i,origText){return origText + "</br> Ready ............";});
		tableau.extensions.initializeAsync({ 'configure':configure }).then(function () {
			// $("#mytrace").html(function(i,origText){return origText + "</br> inicia funcion - initializeAsync ";});
			Jala_Cfg();
			if (var_sw_proc == "OK") {
				dibuja_gafete();
			} else {
				desdibuja_gafete();
			}
			// $("#mytrace").html(function(i,origText){return origText + "</br> termina funcion - initializeAsync ";});
		}, function () { console.log('Error while Initializing: ' + err.toString()); });
		// $("#mytrace").html(function(i,origText){return origText + "</br> ..............";});
		// $("#mytrace").html(function(i,origText){return origText + "</br> fin funcion - ready";});
		// $("#mytrace").html(function(i,origText){return origText + "</br> ::::::::::::::";});
	});


	// Funcion para ocultar el dibujo, solo deja los mensajes
	function desdibuja_gafete() {
		// $("#mytrace").html(function(i,origText){return origText + "</br> ..............";});
		// $("#mytrace").html(function(i,origText){return origText + "</br> inicia funcion - desdibuja_gafete.....";});

		$('#gafete-mensaje-resultado').show();
		$('#gafete-mensaje-espera').hide();
		$('.gafete-contenedor').hide();

		// $("#mytrace").html(function(i,origText){return origText + "</br> ..............";});
		// $("#mytrace").html(function(i,origText){return origText + "</br> FIN funcion - desdibuja_gafete.....";});
		// $("#mytrace").html(function(i,origText){return origText + "</br> ..............";});
	}


	// Funcion para obtener datos del tablero y habilitar la pagina
	function dibuja_gafete() {
		// $("#mytrace").html(function(i,origText){return origText + "</br> ..............";});
		// $("#mytrace").html(function(i,origText){return origText + "</br> inicia funcion - dibuja_gafete.....";});
		// $("#mytrace").html(function(i,origText){return origText + "</br> ..............";});

		let my_url_gafete = C_LIGA_APEX_GAFETE + var_CodigoTablero;
		$(".gafete-iframe").attr("src", my_url_gafete);
		// $("#mytrace").html(function(i,origText){return origText + "</br> my_url_gafete......: " + my_url_gafete;});


		$('#gafete-mensaje-resultado').hide();
		$('#gafete-mensaje-espera').hide();
		$('.gafete-contenedor').show();

		// $("#mytrace").html(function(i,origText){return origText + "</br> ..............";});
		// $("#mytrace").html(function(i,origText){return origText + "</br> fin funcion - dibuja_gafete.....";});
		// $("#mytrace").html(function(i,origText){return origText + "</br> ::::::::::::::";});
	} // fin: dibuja_gafete


    // La configuración permite captar el codigo del tablero
    function Jala_Cfg() {
		// $("#mytrace").html(function(i,origText){return origText + "</br> inicia funcion - Jala_Cfg";});

		// Dato obtenido de los Settings que se guardan con cada configuracion
		var_CodigoTablero = tableau.extensions.settings.get(C_SETCODIGOTABLERO);
		// $("#mytrace").html(function(i,origText){return origText + "</br> codigo leido settings:" + var_CodigoTablero;});
		if (var_CodigoTablero == undefined || var_CodigoTablero == C_CODIGO_SIN_INFO) {
			// $("#mytrace").html(function(i,origText){return origText + "</br> var_CodigoTablero no definida";});
			var_CodigoTablero = C_CODIGO_SIN_INFO;
			$('#gafete-mensaje-resultado').text("Proceda a configurar la extensión ");
			var_sw_proc = "ERROR: NO ESTA CONFIGURADO";
		}
		// $("#mytrace").html(function(i,origText){return origText + "</br> ...var_sw_proc......: " + var_sw_proc;});
		// $("#mytrace").html(function(i,origText){return origText + "</br> ...var_CodigoTablero: " + var_CodigoTablero;});
		// $("#mytrace").html(function(i,origText){return origText + "</br> ..............";});
		// $("#mytrace").html(function(i,origText){return origText + "</br> fin funcion - Jala_Cfg";});
		// $("#mytrace").html(function(i,origText){return origText + "</br> ::::::::::::::";});
	}  // fin Jala_Cfg



    // La configuración permite captar el codigo del tablero
    function configure() {
		// $("#mytrace").html(function(i,origText){return origText + "</br> inicia funcion - configure";});
		// liga de la página de configuracion.
		const popupUrl = "./libro_ligaApex_cfg.html";
		let defaultPayload=var_CodigoTablero;
		tableau.extensions.ui.displayDialogAsync(popupUrl, defaultPayload, { height:300, width:500 }).then((closePayload) => {
			// $("#mytrace").html(function(i,origText){return origText + "</br> inicia funcion - displayDialogAsync";});
			var_sw_proc = "OK"
			Jala_Cfg();
			if (var_sw_proc == "OK") {
				dibuja_gafete();
			} else {
				desdibuja_gafete();
			}
			// $("#mytrace").html(function(i,origText){return origText + "</br> fin funcion - displayDialogAsync";});
		}).catch((error) => {
			switch (error.errorCode) {
			case tableau.ErrorCodes.DialogClosedByUser:
			  console.log("Dialog was closed by user");
			  break;
			default:
			  console.error(error.message);
			}
			});
		// $("#mytrace").html(function(i,origText){return origText + "</br> ..............";});
		// $("#mytrace").html(function(i,origText){return origText + "</br> fin funcion - configure";});
		// $("#mytrace").html(function(i,origText){return origText + "</br> ::::::::::::::";});
	}  // fin configure


})();  // fin funcion completa