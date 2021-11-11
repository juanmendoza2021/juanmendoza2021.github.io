'use strict';

/**
Funciones para presentar el LIBRO que liga la documentaicón de Tableau
 */

// Función que contiene todo el codigo
(function () {
	//const C_LIGAAPEXREPODOCTOS = 'https://apexqa.izzi.mx:9091/ords/edw/r/info_general_tab/entidad?par_codigo=';
	const C_LIGAAPEXREPODOCTOS = 'https://hlozsi9l4od21gp-mibasedatos01.adb.us-phoenix-1.oraclecloudapps.com/ords/r/miapex01/info_general_tab/entidad?par_codigo=';
	const C_LIGA_CFG              = './libro_cnx_man_cfg.html';
	const C_CODIGO_SIN_INFO       = 'SIN_INFORMACION';
	const C_NO_DEFINIDO           = 'No definido';
	const C_PAR_SET_CODIGO        = 'CFG_CODIGO_TABLERO';
	const C_PAR_SET_OWNER         = 'CFG_PROPIETARIOS';
	const C_PAR_SET_SOPORTE       = 'CFG_SOPORTEADORES';

	let var_sw_proc = "OK";
	let var_Par_CodigoTablero = "ND";
	let var_Par_Owners  = "ND";
	let var_Par_Soporteadores = "ND";
	let var_Par_LiegaApex = "ND";
	let var_string = "ND";

	// función que se activa despues de cargar la página
	$(document).ready(function () {
		// $("#mytrace").html(function(i,origText){return origText + "</br> Ready ............";});
		$('#gafete-mensaje-espera').show();
		$('#gafete-mensaje-resultado').show();
		$('.gafete-contenedor').show();
		tableau.extensions.initializeAsync({ 'configure':configure }).then(function () {
			// $("#mytrace").html(function(i,origText){return origText + "</br> inicia funcion - initializeAsync ";});
			Jala_Cfg();
			if (var_sw_proc == "OK") {
				dibujaLibroDoctos();
			} else {
				desDibujaLibroDoctos();
			}
			// $("#mytrace").html(function(i,origText){return origText + "</br> termina funcion - initializeAsync ";});
		}, function () { console.log('Error while Initializing: ' + err.toString()); });
		// $("#mytrace").html(function(i,origText){return origText + "</br> ..............";});
		// $("#mytrace").html(function(i,origText){return origText + "</br> fin funcion - ready";});
		// $("#mytrace").html(function(i,origText){return origText + "</br> ::::::::::::::";});
	});


// -------------------------------

	// Funcion para ocultar el dibujo, solo deja los mensajes
	function desDibujaLibroDoctos() {
		// $("#mytrace").html(function(i,origText){return origText + "</br> ..............";});
		// $("#mytrace").html(function(i,origText){return origText + "</br> inicia funcion - desDibujaLibroDoctos.....";});

		$('#gafete-mensaje-resultado').show();
		$('#gafete-mensaje-espera').hide();
		$('.gafete-contenedor').hide();

		// $('#gafete-mensaje-resultado').show();
		// $('#gafete-mensaje-espera').show();
		// $('.gafete-contenedor').show();
		
		// $("#mytrace").html(function(i,origText){return origText + "</br> ..............";});
		// $("#mytrace").html(function(i,origText){return origText + "</br> FIN funcion - desDibujaLibroDoctos.....";});
		// $("#mytrace").html(function(i,origText){return origText + "</br> ..............";});
	}


	// Funcion para obtener datos del tablero y habilitar la pagina
	function dibujaLibroDoctos() {
		// $("#mytrace").html(function(i,origText){return origText + "</br> ..............";});
		// $("#mytrace").html(function(i,origText){return origText + "</br> inicia funcion - dibujaLibroDoctos.....";});
		// $("#mytrace").html(function(i,origText){return origText + "</br> ..............";});
        var_Par_LiegaApex = C_LIGAAPEXREPODOCTOS + var_Par_CodigoTablero;

		// $("#mytrace").html(function(i,origText){return origText + "</br> var_Par_CodigoTablero......: " + var_Par_CodigoTablero;});
		// $("#mytrace").html(function(i,origText){return origText + "</br> var_Par_CodigoTablero..: " + var_Par_CodigoTablero;});
		// $("#mytrace").html(function(i,origText){return origText + "</br> var_Par_Owners.........: " + var_Par_Owners;});
		// $("#mytrace").html(function(i,origText){return origText + "</br> var_Par_Soporteadores..: " + var_Par_Soporteadores;});
		// $("#mytrace").html(function(i,origText){return origText + "</br> var_Par_LiegaApex......: " + var_Par_LiegaApex;});


		let var_str1_owner = var_Par_Owners;
		let var_str2_owner = var_str1_owner.replace(/\n/g,"</br>");
		let var_str1_sopor = var_Par_Soporteadores;
		let var_str2_sopor = var_str1_sopor.replace(/\n/g,"</br>");
		
		$('#gafete-propietarios').html(var_str2_owner);
		$('#gafete-soporteadores').html(var_str2_sopor);
		$("#gafete-ligadinamicalibro").attr("href", var_Par_LiegaApex);

		$('#gafete-mensaje-resultado').hide();
		$('#gafete-mensaje-espera').hide();
		$('.gafete-contenedor').show();

		// $('#gafete-mensaje-resultado').show();
		// $('#gafete-mensaje-espera').show();
		// $('.gafete-contenedor').show();


		// $("#mytrace").html(function(i,origText){return origText + "</br> ..............";});
		// $("#mytrace").html(function(i,origText){return origText + "</br> fin funcion - dibujaLibroDoctos.....";});
		// $("#mytrace").html(function(i,origText){return origText + "</br> ::::::::::::::";});
	} // fin: dibujaLibroDoctos


    // La configuración permite captar el codigo del tablero
    function Jala_Cfg() {
		// $("#mytrace").html(function(i,origText){return origText + "</br> inicia funcion - Jala_Cfg";});  
		// Dato obtenido de los Settings que se guardan con cada configuracion
		var_sw_proc             = "OK";
		var_Par_CodigoTablero   = tableau.extensions.settings.get(C_PAR_SET_CODIGO);
		var_Par_Owners          = tableau.extensions.settings.get(C_PAR_SET_OWNER);
		var_Par_Soporteadores   = tableau.extensions.settings.get(C_PAR_SET_SOPORTE);		
		// $("#mytrace").html(function(i,origText){return origText + "</br> leido var_Par_CodigoTablero:" + var_Par_CodigoTablero;});
		// $("#mytrace").html(function(i,origText){return origText + "</br> leido var_Par_Owners:" + var_Par_Owners;});
		// $("#mytrace").html(function(i,origText){return origText + "</br> leido var_Par_Soporteadores:" + var_Par_Soporteadores;});
		if (var_Par_CodigoTablero == undefined || var_Par_CodigoTablero == C_CODIGO_SIN_INFO) {
			var_Par_CodigoTablero = C_CODIGO_SIN_INFO;
			$('#gafete-mensaje-resultado').text("Proceda a configurar la extensión ");
			var_sw_proc = "ERROR: NO ESTA CONFIGURADO";
		}
		if (var_Par_Owners == undefined || var_Par_Owners == "") {
			var_Par_Owners = C_NO_DEFINIDO;
		}
		if (var_Par_Soporteadores == undefined || var_Par_Soporteadores == "") {
			var_Par_Soporteadores = C_NO_DEFINIDO;
		}

		// $("#mytrace").html(function(i,origText){return origText + "</br> ..............";});
		// $("#mytrace").html(function(i,origText){return origText + "</br> fin funcion - Jala_Cfg";});
		// $("#mytrace").html(function(i,origText){return origText + "</br> ::::::::::::::";});
	}  // fin Jala_Cfg



    // La configuración permite captar el codigo del tablero
    function configure() {
		// $("#mytrace").html(function(i,origText){return origText + "</br> inicia funcion - configure";});
		// liga de la página de configuracion.
		const popupUrl = C_LIGA_CFG;
		let defaultPayload=var_Par_CodigoTablero;
		tableau.extensions.ui.displayDialogAsync(popupUrl, defaultPayload, { height:400, width:500 }).then((closePayload) => {
			// $("#mytrace").html(function(i,origText){return origText + "</br> inicia funcion - displayDialogAsync";});
			Jala_Cfg();
			if (var_sw_proc == "OK") {
				dibujaLibroDoctos();
			} else {
				desDibujaLibroDoctos();
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