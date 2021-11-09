'use strict';

/**
Funciones para presentar el LIBRO que liga la documentaicón de Tableau
 */

// Función que contiene todo el codigo
(function () {
	// const table = $('#parameterTable');
	// const tableBody = table.children('tbody');
	const C_LIGAAPEXREPODOCTOS = 'https://apexqa.izzi.mx:9091/ords/edw/r/info_general_tab/entidad?par_codigo=';
	const C_CODIGO_SIN_INFO       = 'SIN_INFORMACION';
	const C_SETCODIGOTABLERO      = 'CFG_CODIGO_TABLERO';
	const C_PARAMETRO_DATOS_PROP  = 'par_libro_propietarios';
	const C_PARAMETRO_DATOS_SOP   = 'par_libro_soporte';
	const C_PARAMETRO_DATOS_LIGA  = 'par_libro_liga';
	const C_SEPARADOR_DATOS_QRY   = '<>';
	// const datasourcesSettingsKey = 'selectedDatasources';
	// let selectedDatasources = [];
	// var varPayload = " ";

	var var_parametro_encontrado;
	var var_sw_proc = "OK";
	var var_sw_par_owner = "OK";
	var var_sw_par_sop = "OK";
	var var_sw_par_liga = "OK";

	var var_DashboardName = "ND";
	var var_CodigoTablero = "ND";
	var var_Par_CodigoTablero = "ND";
	var var_Par_Owners  = "ND";
	var var_Par_Soporteadores = "ND";
	var var_Par_LiegaApex = "ND";

	// función que se activa despues de cargar la página
	$(document).ready(function () {
		// $("#mytrace").html(function(i,origText){return origText + "</br> Ready ............";});
		$('#gafete-mensaje-resultado').show();
		$('#gafete-mensaje-espera').show();
		$('.gafete-contenedor').show();
		tableau.extensions.initializeAsync({ 'configure':configure }).then(function () {
			// $("#mytrace").html(function(i,origText){return origText + "</br> inicia funcion - initializeAsync ";});
			Jala_Cfg();
			if (var_sw_proc == "OK") {
				BuscaPar_Liga();
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

    // Busca el parametro relacionado con el soporte al tablero
    function BuscaPar_Liga() {
		// $("#mytrace").html(function(i,origText){return origText + "</br> inicia funcion - BuscaPar_Liga.....";});
		let my_dashboard = tableau.extensions.dashboardContent.dashboard;
		my_dashboard.findParameterAsync(C_PARAMETRO_DATOS_LIGA).then(function(param) {
			if (param == undefined) {
				$('#gafete-mensaje-resultado').text("No encontré el parametro, debe llamarse: " + C_PARAMETRO_DATOS_LIGA);
				var_sw_par_liga = "ERROR: NO PARAMETRO";
				desDibujaLibroDoctos();
			} else {
				var_sw_par_liga = "OK";
				var_parametro_encontrado = param;
				DesglosaPar_Liga(var_parametro_encontrado);
				if (var_sw_par_liga == "OK") {
					// dibujaLibroDoctos();   revisar si se activa
					BuscaPar_Owner();
				} else {
					desDibujaLibroDoctos();
				}				
			}
		}).catch((error) => {
			switch (error.errorCode) {
			case tableau.ErrorCodes.DialogClosedByUser:
			  console.log("Dialog was closed by user");
			  break;
			default:
			  console.error(error.message);
			}
			});
		// $("#mytrace").html(function(i,origText){return origText + "</br> fin funcion - BuscaPar_Liga";});
	}  // fin BuscaPar_Liga
	
    // Separa en varios campos el valor del parametro
    function DesglosaPar_Liga(par) {
		// $("#mytrace").html(function(i,origText){return origText + "</br> inicia funcion - DesglosaPar_Liga.....";});
	    var_Par_CodigoTablero            = "ND";
		var_Par_Soporteadores            = "ND";
        let my_parametro_dataType        = par.dataType;
        let my_parametro_name            = par.name;
        let my_parametro_id              = par.id;
        let my_parametro_Values          = par.allowableValues;
		let my_valor_lista;
		if (par.allowableValues.type != 'list') {
			$('#gafete-mensaje-resultado').text("El parametro esta mal definido, debe tener una LIST");
			var_sw_par_liga = "ERROR: MAL DEFINICION PARAMETRO";
			return;
		}
		let my_pedazos = ["ND", "ND", "ND", "ND", "ND", "ND", "ND", "ND", "ND", "ND"];
		let my_arg1 = "ND";
		let my_sep = C_SEPARADOR_DATOS_QRY;
		let my_ind_busq = 0;
		let my_ind_ini = 0;
		let my_ind_fin = 0;
		let my_long_str = 0;
        my_parametro_Values.allowableValues.forEach(function (valor_permitido) {
			my_valor_lista = valor_permitido.formattedValue;
		    my_pedazos = ["ND", "ND", "ND", "ND", "ND", "ND", "ND", "ND", "ND", "ND"];
			my_ind_ini = 0;
			my_long_str = my_valor_lista.length;
			este_for_liga:
			for (let i = 0; i < 3 ; i++) {
				if (my_ind_ini >= my_long_str) {
					break este_for_liga;
				}
			    my_ind_fin = my_valor_lista.indexOf(my_sep,my_ind_ini);
				if (my_ind_fin == -1) {
					my_arg1 = my_valor_lista.substring(my_ind_ini);
					my_pedazos[i] = my_arg1;
					my_ind_ini = my_ind_fin;
					break este_for_liga;
				}
				if (my_ind_ini < my_ind_fin) {
					my_arg1 = my_valor_lista.substring(my_ind_ini,my_ind_fin);
					my_pedazos[i] = my_arg1;
					my_ind_ini = my_ind_fin + my_sep.length;
					continue este_for_liga;
				}
			}
			// termina extraccion, lista la tabla de argumentos

			if (var_CodigoTablero == my_pedazos[0]) {
				var_Par_CodigoTablero  = my_pedazos[0];
				var_Par_LiegaApex      = my_pedazos[1];
			}
        });
		if (var_CodigoTablero != var_Par_CodigoTablero) {
			$('#gafete-mensaje-resultado').text("No encontre liga con apex, codigo: " + var_CodigoTablero);
			var_sw_par_liga = "ERROR: NO ENCONTRADO";
		}
		// $("#mytrace").html(function(i,origText){return origText + "</br> fin funcion - DesglosaPar_Liga";});
	}  // fin DesglosaPar_Liga



// -------------------------------

    // Busca el parametro relacionado con el propietario
    function BuscaPar_Owner() {
		// $("#mytrace").html(function(i,origText){return origText + "</br> inicia funcion - BuscaPar_Owner.....";});

		let my_dashboard = tableau.extensions.dashboardContent.dashboard;

		my_dashboard.findParameterAsync(C_PARAMETRO_DATOS_PROP).then(function(param) {
			if (param == undefined) {
				$('#gafete-mensaje-resultado').text("No encontré el parametro, debe llamarse: " + C_PARAMETRO_DATOS_PROP );
				var_sw_par_owner = "ERROR: NO PARAMETRO";
				desDibujaLibroDoctos();
			} else {
				var_sw_par_owner = "OK";
				var_parametro_encontrado = param;
				DesglosaPar_Owner(var_parametro_encontrado);
				if (var_sw_par_owner == "OK") {
					// dibujaLibroDoctos();   revisar si se activa
					BuscaPar_Sop();
				} else {
					desDibujaLibroDoctos();
				}				
			}
		}).catch((error) => {
			switch (error.errorCode) {
			case tableau.ErrorCodes.DialogClosedByUser:
			  console.log("Dialog was closed by user");
			  break;
			default:
			  console.error(error.message);
			}
			});
		// $("#mytrace").html(function(i,origText){return origText + "</br> fin funcion - BuscaPar_Owner";});
	}  // fin BuscaPar_Owner

	
    // Separa en varios campos el valor del parametro
    function DesglosaPar_Owner(par) {
		// $("#mytrace").html(function(i,origText){return origText + "</br> inicia funcion - DesglosaPar_Owner.....";});

	    var_Par_CodigoTablero            = "ND";
		var_Par_Owners                   = "ND";
        let my_parametro_dataType        = par.dataType;
        let my_parametro_name            = par.name;
        let my_parametro_id              = par.id;
        let my_parametro_Values          = par.allowableValues;
		let my_valor_lista;

		if (par.allowableValues.type != 'list') {
			$('#gafete-mensaje-resultado').text("El parametro esta mal definido, debe tener una LIST");
			var_sw_par_owner = "ERROR: MAL DEFINICION PARAMETRO";
			desDibujaLibroDoctos();
			return;
		}

		let my_pedazos = ["ND", "ND", "ND", "ND", "ND", "ND", "ND", "ND", "ND", "ND"];
		let my_arg1 = "ND";
		let my_sep = C_SEPARADOR_DATOS_QRY;
		let my_ind_ini = 0;
		let my_ind_fin = 0;
		let my_long_str = 0;

		// $("#mytrace").html(function(i,origText){return origText + "</br> Inicio - Barre los valores permitidos: ";});
        my_parametro_Values.allowableValues.forEach(function (valor_permitido) {
			my_valor_lista = valor_permitido.formattedValue;
            // Extracción de datos del string del parametro
		    my_pedazos = ["ND", "ND", "ND", "ND", "ND", "ND", "ND", "ND", "ND", "ND"];
			my_ind_ini = 0;
			my_long_str = my_valor_lista.length;
			este_for_owner:
			for (let i = 0; i < 3 ; i++) {
				if (my_ind_ini >= my_long_str) {
					break este_for_owner;
				}
			    my_ind_fin = my_valor_lista.indexOf(my_sep,my_ind_ini);
				if (my_ind_fin == -1) {
					my_arg1 = my_valor_lista.substring(my_ind_ini);
					my_pedazos[i] = my_arg1;
					my_ind_ini = my_ind_fin;
					break este_for_owner;
				}
				if (my_ind_ini < my_ind_fin) {
					my_arg1 = my_valor_lista.substring(my_ind_ini,my_ind_fin);
					my_pedazos[i] = my_arg1;
					my_ind_ini = my_ind_fin + my_sep.length;
					continue este_for_owner;
				}
			}
			// termina extraccion, lista la tabla de argumentos
			// $("#mytrace").html(function(i,origText){return origText + "</br> ...DesglosaPar_Owner. pedazos: ";});
			// my_pedazos.forEach(function(valor, indice, array) {
				// $("#mytrace").html(function(i,origText){return origText + "</br> ......Indice: " + indice + " Valor: " + valor;});
			// });

			// $("#mytrace").html(function(i,origText){return origText + "</br> ... my_pedazos[0]: " + my_pedazos[0];});
			// $("#mytrace").html(function(i,origText){return origText + "</br> ... my_pedazos[1]: " + my_pedazos[1];});
			// $("#mytrace").html(function(i,origText){return origText + "</br> ... my_pedazos[2]: " + my_pedazos[2];});

			if (var_CodigoTablero == my_pedazos[0]) {
				// $("#mytrace").html(function(i,origText){return origText + "</br> ... Encontro el tablero: " + my_pedazos[0];});
				var_Par_CodigoTablero  = my_pedazos[0];
				var_Par_Owners         = my_pedazos[1];
			}
        });
		// $("#mytrace").html(function(i,origText){return origText + "</br> Fin - Barre los valores permitidos: ";});

		if (var_CodigoTablero != var_Par_CodigoTablero) {
			// $("#mytrace").html(function(i,origText){return origText + "</br> ... NO Encontro el tablero: " +var_CodigoTablero;});
			$('#gafete-mensaje-resultado').text("No encontre el propietario del tablero, codigo: " + var_CodigoTablero);
			var_sw_par_owner = "ERROR: NO ENCONTRADO";
		}
		
		// $("#mytrace").html(function(i,origText){return origText + "</br> ..............";});
		// $("#mytrace").html(function(i,origText){return origText + "</br> fin funcion - DesglosaPar_Owner";});
		// $("#mytrace").html(function(i,origText){return origText + "</br> ::::::::::::::";});
	}  // fin DesglosaPar_Owner

// -------------------------------

    // Busca el parametro relacionado con el soporte al tablero
    function BuscaPar_Sop() {
		// $("#mytrace").html(function(i,origText){return origText + "</br> inicia funcion - BuscaPar_Sop.....";});
		let my_dashboard = tableau.extensions.dashboardContent.dashboard;
		my_dashboard.findParameterAsync(C_PARAMETRO_DATOS_SOP).then(function(param) {
			if (param == undefined) {
				$('#gafete-mensaje-resultado').text("No encontré el parametro, debe llamarse: " + C_PARAMETRO_DATOS_SOP );
				var_sw_par_sop = "ERROR: NO PARAMETRO";
				desDibujaLibroDoctos();
			} else {
				var_sw_par_sop = "OK";
				var_parametro_encontrado = param;
				DesglosaPar_Sop(var_parametro_encontrado);
				if (var_sw_par_sop == "OK") {
					dibujaLibroDoctos();
				} else {
					desDibujaLibroDoctos();
				}								
			}
		}).catch((error) => {
			switch (error.errorCode) {
			case tableau.ErrorCodes.DialogClosedByUser:
			  console.log("Dialog was closed by user");
			  break;
			default:
			  console.error(error.message);
			}
			});
		// $("#mytrace").html(function(i,origText){return origText + "</br> fin funcion - BuscaPar_Sop";});
	}  // fin BuscaPar_Sop
	
    // Separa en varios campos el valor del parametro
    function DesglosaPar_Sop(par) {
		// $("#mytrace").html(function(i,origText){return origText + "</br> inicia funcion - DesglosaPar_Sop.....";});
	    var_Par_CodigoTablero            = "ND";
		var_Par_Soporteadores            = "ND";
        let my_parametro_dataType        = par.dataType;
        let my_parametro_name            = par.name;
        let my_parametro_id              = par.id;
        let my_parametro_Values          = par.allowableValues;
		let my_valor_lista;
		if (par.allowableValues.type != 'list') {
			$('#gafete-mensaje-resultado').text("El parametro esta mal definido, debe tener una LIST");
			var_sw_par_sop = "ERROR: MAL DEFINICION PARAMETRO";
			desDibujaLibroDoctos();
			return;
		}
		let my_pedazos = ["ND", "ND", "ND", "ND", "ND", "ND", "ND", "ND", "ND", "ND"];
		let my_arg1 = "ND";
		let my_sep = C_SEPARADOR_DATOS_QRY;
		let my_ind_busq = 0;
		let my_ind_ini = 0;
		let my_ind_fin = 0;
		let my_long_str = 0;
        my_parametro_Values.allowableValues.forEach(function (valor_permitido) {
			my_valor_lista = valor_permitido.formattedValue;
		    my_pedazos = ["ND", "ND", "ND", "ND", "ND", "ND", "ND", "ND", "ND", "ND"];
			my_ind_ini = 0;
			my_long_str = my_valor_lista.length;
			este_for_sop:
			for (let i = 0; i < 3 ; i++) {
				if (my_ind_ini >= my_long_str) {
					break este_for_sop;
				}
			    my_ind_fin = my_valor_lista.indexOf(my_sep,my_ind_ini);
				if (my_ind_fin == -1) {
					my_arg1 = my_valor_lista.substring(my_ind_ini);
					my_pedazos[i] = my_arg1;
					my_ind_ini = my_ind_fin;
					break este_for_sop;
				}
				if (my_ind_ini < my_ind_fin) {
					my_arg1 = my_valor_lista.substring(my_ind_ini,my_ind_fin);
					my_pedazos[i] = my_arg1;
					my_ind_ini = my_ind_fin + my_sep.length;
					continue este_for_sop;
				}
			}
			// termina extraccion, lista la tabla de argumentos
			if (var_CodigoTablero == my_pedazos[0]) {
				var_Par_CodigoTablero  = my_pedazos[0];
				var_Par_Soporteadores  = my_pedazos[1];
			}
        });
		if (var_CodigoTablero != var_Par_CodigoTablero) {
			$('#gafete-mensaje-resultado').text("No encontre usuarios de soporte del tablero, codigo: " + var_CodigoTablero);
			var_sw_par_sop = "ERROR: NO ENCONTRADO";
		}
		// $("#mytrace").html(function(i,origText){return origText + "</br> fin funcion - DesglosaPar_Sop";});
	}  // fin DesglosaPar_Sop

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

		// $("#mytrace").html(function(i,origText){return origText + "</br> var_CodigoTablero......: " + var_CodigoTablero;});
		// $("#mytrace").html(function(i,origText){return origText + "</br> var_Par_CodigoTablero..: " + var_Par_CodigoTablero;});
		// $("#mytrace").html(function(i,origText){return origText + "</br> var_Par_Owners.........: " + var_Par_Owners;});
		// $("#mytrace").html(function(i,origText){return origText + "</br> var_Par_Soporteadores..: " + var_Par_Soporteadores;});
		// $("#mytrace").html(function(i,origText){return origText + "</br> var_Par_LiegaApex......: " + var_Par_LiegaApex;});


		$("#gafete-ligadinamicalibro").attr("href", var_Par_LiegaApex);
		$('#gafete-propietarios').html(var_Par_Owners);
		$('#gafete-soporteadores').html(var_Par_Soporteadores);

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
		const popupUrl = "./libro_rep_doctos_cfg.html";
		let defaultPayload=var_CodigoTablero;
		tableau.extensions.ui.displayDialogAsync(popupUrl, defaultPayload, { height:300, width:500 }).then((closePayload) => {
			// $("#mytrace").html(function(i,origText){return origText + "</br> inicia funcion - displayDialogAsync";});
			var_sw_proc = "OK"
			Jala_Cfg();
			if (var_sw_proc == "OK") {
				BuscaPar_Liga();
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