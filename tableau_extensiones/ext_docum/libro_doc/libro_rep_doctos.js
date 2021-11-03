'use strict';

/**
Funciones para presentar el LIBRO que liga la documentaicón de Tableau
 */

// Función que contiene todo el codigo
(function () {
	// const table = $('#parameterTable');
	// const tableBody = table.children('tbody');
	const C_LIGAAPEXREPODOCTOS = 'https://apexqa.izzi.mx:9091/ords/edw/r/info_general_tab/entidad?par_codigo=';
	const C_CODIGO_SIN_INFO = 'SIN_INFORMACION';
	const C_SETCODIGOTABLERO = 'CFG_CODIGO_TABLERO';
	const C_PARAMETRO_DATOS_TAB = 'par_libro_datos';
	// const datasourcesSettingsKey = 'selectedDatasources';
	// let selectedDatasources = [];
	// var varPayload = " ";

	var var_parametro_encontrado;
	var var_sw_proc = "OK";

	var var_DashboardName = "ND";
	var var_CodigoTablero = "ND";
	var var_Par_CodigoTablero = "ND";
	var var_Par_Propietarios  = "ND";
	var var_Par_Soporteadores = "ND";
	var var_Par_LiegaApex = "ND";

	// función que se activa despues de cargar la página
	$(document).ready(function () {
		// $("#mytrace").html(function(i,origText){return origText + "</br> Ready ............";});
		tableau.extensions.initializeAsync({ 'configure':configure }).then(function () {
			// $("#mytrace").html(function(i,origText){return origText + "</br> inicia funcion - initializeAsync ";});
			Jala_Cfg();
			if (var_sw_proc == "OK") {
				BuscaParametro();
			} else {
				desDibujaLibroDoctos();
			}
			// $("#mytrace").html(function(i,origText){return origText + "</br> termina funcion - initializeAsync ";});
		}, function () { console.log('Error while Initializing: ' + err.toString()); });
		// $("#mytrace").html(function(i,origText){return origText + "</br> ..............";});
		// $("#mytrace").html(function(i,origText){return origText + "</br> fin funcion - ready";});
		// $("#mytrace").html(function(i,origText){return origText + "</br> ::::::::::::::";});
	});

    // Busca el parámetro dentro del tablero, debe ser un nombre fijo
    function BuscaParametro() {
		// $("#mytrace").html(function(i,origText){return origText + "</br> ..............";});
		// $("#mytrace").html(function(i,origText){return origText + "</br> inicia funcion - BuscaParametro.....";});
		// $("#mytrace").html(function(i,origText){return origText + "</br> ..............";});

		let my_dashboard = tableau.extensions.dashboardContent.dashboard;

		my_dashboard.findParameterAsync(C_PARAMETRO_DATOS_TAB).then(function(param) {
			if (param == undefined) {
				// $("#mytrace").html(function(i,origText){return origText + "</br> ... NO ENCONTRE el parametro" ;});
				$('#gafete-mensaje-resultado').text("No encontré el parametro, debe llamarse: " + C_PARAMETRO_DATOS_TAB );
				var_sw_proc = "ERROR: NO PARAMETRO";
				desDibujaLibroDoctos();
			} else {
				var_parametro_encontrado = param;
				// $("#mytrace").html(function(i,origText){return origText + "</br> ... SI esta ";});
				// $("#mytrace").html(function(i,origText){return origText + "</br> ... parametro encontrado 2: " + var_parametro_encontrado.name;});
				DesglosaParametro(var_parametro_encontrado);
				if (var_sw_proc == "OK") {
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
		// $("#mytrace").html(function(i,origText){return origText + "</br> ..............";});
		// $("#mytrace").html(function(i,origText){return origText + "</br> fin funcion - BuscaParametro";});
		// $("#mytrace").html(function(i,origText){return origText + "</br> ::::::::::::::";});
	}  // fin BuscaParametro

    // Separa en varios campos el valor del parametro
    function DesglosaParametro(par) {
		// $("#mytrace").html(function(i,origText){return origText + "</br> ..............";});
		// $("#mytrace").html(function(i,origText){return origText + "</br> inicia funcion - DesglosaParametro.....";});
		// $("#mytrace").html(function(i,origText){return origText + "</br> ..............";});

		var_Par_CodigoTablero = "ND";
		var_Par_Propietarios  = "ND";
		var_Par_Soporteadores = "ND";
		var_Par_LiegaApex     = "ND";

        let my_parametro_dataType        = par.dataType;
        let my_parametro_name            = par.name;
        let my_parametro_id              = par.id;
        let my_parametro_Values          = par.allowableValues;
		let my_valor_lista;

		// $("#mytrace").html(function(i,origText){return origText + "</br> par dataType........: " + my_parametro_dataType;});
		// $("#mytrace").html(function(i,origText){return origText + "</br> par name............: " + my_parametro_name;});
		// $("#mytrace").html(function(i,origText){return origText + "</br> par id..............: " + my_parametro_id;});
		// $("#mytrace").html(function(i,origText){return origText + "</br> par allowableValues.: " + my_parametro_Values;});
		// $("#mytrace").html(function(i,origText){return origText + "</br> allowableValues.type: " + par.allowableValues.type;});

		if (par.allowableValues.type != 'list') {
			// $("#mytrace").html(function(i,origText){return origText + "</br> *** Error en definicion del parametro...";});
			$('#gafete-mensaje-resultado').text("El parametro esta mal definido, debe tener una LIST");
			var_sw_proc = "ERROR: MAL DEFINICION PARAMETRO";
			desDibujaLibroDoctos();
			return;
		}

		let my_pedazos = ["ND", "ND", "ND", "ND", "ND", "ND", "ND", "ND", "ND", "ND"];
		let my_arg1 = "ND";
		let my_sep = "<>";
		let my_ind_busq = 0;
		let my_ind_ini = 0;
		let my_ind_fin = 0;
		let my_long_str = 0;
		let my_num_lista = 0;

		// $("#mytrace").html(function(i,origText){return origText + "</br> Inicio - Barre los valores permitidos: ";});
        my_parametro_Values.allowableValues.forEach(function (valor_permitido) {
			my_num_lista++;
			my_valor_lista = valor_permitido.formattedValue;
			// $("#mytrace").html(function(i,origText){return origText + "</br> ... elemento lista...............: " + my_num_lista;});
			// $("#mytrace").html(function(i,origText){return origText + "</br> ... valor: " + my_valor_lista;});
            // Extracción de datos del string del parametro
			my_ind_ini = 0;
			my_long_str = my_valor_lista.length;
			este_for:
			for (let i = 0; i < 7 ; i++) {
				if (my_ind_ini >= my_long_str) {
					break este_for;
				}
			    my_ind_fin = my_valor_lista.indexOf(my_sep,my_ind_ini);
				if (my_ind_fin == -1) {
					my_arg1 = my_valor_lista.substring(my_ind_ini);
					my_pedazos[i] = my_arg1;
					my_ind_ini = my_ind_fin;
					break este_for;
				}
				if (my_ind_ini < my_ind_fin) {
					my_arg1 = my_valor_lista.substring(my_ind_ini,my_ind_fin);
					my_pedazos[i] = my_arg1;
					my_ind_ini = my_ind_fin + my_sep.length;
					continue este_for;
				}
			}
			// termina extraccion, lista la tabla de argumentos
			// $("#mytrace").html(function(i,origText){return origText + "</br> ...Desglose. pedazos: ";});
			// my_pedazos.forEach(function(valor, indice, array) {
				// $("#mytrace").html(function(i,origText){return origText + "</br> ......Indice: " + indice + " Valor: " + valor;});
			// });

			// $("#mytrace").html(function(i,origText){return origText + "</br> ... my_pedazos[0]: " + my_pedazos[0];});
			// $("#mytrace").html(function(i,origText){return origText + "</br> ... my_pedazos[1]: " + my_pedazos[1];});
			// $("#mytrace").html(function(i,origText){return origText + "</br> ... my_pedazos[2]: " + my_pedazos[2];});

			if (var_CodigoTablero == my_pedazos[0]) {
				// $("#mytrace").html(function(i,origText){return origText + "</br> ... Encontro el tablero: " + my_pedazos[0];});
				var_Par_CodigoTablero = my_pedazos[0];
				var_Par_Propietarios  = my_pedazos[1];
				var_Par_Soporteadores = my_pedazos[2];
				var_Par_LiegaApex     = my_pedazos[3];
			}
        });
		// $("#mytrace").html(function(i,origText){return origText + "</br> Fin - Barre los valores permitidos: ";});

		if (var_CodigoTablero != var_Par_CodigoTablero) {
			// $("#mytrace").html(function(i,origText){return origText + "</br> ... NO Encontro el tablero: " +var_CodigoTablero;});
			$('#gafete-mensaje-resultado').text("El tablero no esta dentro del parametro, codigo: " + var_CodigoTablero);
			var_sw_proc = "ERROR: NO ESTA EL TABLERO EN PARAMETRO";
			desDibujaLibroDoctos();
		}

		// $("#mytrace").html(function(i,origText){return origText + "</br> ...var_CodigoTablero.......: " + var_CodigoTablero;});
		// $("#mytrace").html(function(i,origText){return origText + "</br> ...var_Par_CodigoTablero: " + var_Par_CodigoTablero;});
		// $("#mytrace").html(function(i,origText){return origText + "</br> ...var_Par_Propietarios.: " + var_Par_Propietarios;});
		// $("#mytrace").html(function(i,origText){return origText + "</br> ...var_Par_Soporteadores: " + var_Par_Soporteadores;});
		// $("#mytrace").html(function(i,origText){return origText + "</br> ...var_Par_LiegaApex....: " + var_Par_LiegaApex;});

		// $("#mytrace").html(function(i,origText){return origText + "</br> ..............";});
		// $("#mytrace").html(function(i,origText){return origText + "</br> fin funcion - DesglosaParametro";});
		// $("#mytrace").html(function(i,origText){return origText + "</br> ::::::::::::::";});
	}  // fin DesglosaParametro



	// Funcion para ocultar el dibujo, solo deja los mensajes
	function desDibujaLibroDoctos() {
		// $("#mytrace").html(function(i,origText){return origText + "</br> ..............";});
		// $("#mytrace").html(function(i,origText){return origText + "</br> inicia funcion - desDibujaLibroDoctos.....";});


		$('#gafete-mensaje-resultado').show();
		$('#gafete-mensaje-espera').hide();
		$('.gafete-contenedor').hide();

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
		// $("#mytrace").html(function(i,origText){return origText + "</br> var_Par_Propietarios...: " + var_Par_Propietarios;});
		// $("#mytrace").html(function(i,origText){return origText + "</br> var_Par_Soporteadores..: " + var_Par_Soporteadores;});
		// $("#mytrace").html(function(i,origText){return origText + "</br> var_Par_LiegaApex......: " + var_Par_LiegaApex;});


		$("#gafete-ligadinamicalibro").attr("href", var_Par_LiegaApex);
		$('#gafete-propietarios').html(var_Par_Propietarios);
		$('#gafete-soporteadores').html(var_Par_Soporteadores);

		$('#gafete-mensaje-resultado').hide();
		$('#gafete-mensaje-espera').hide();
		$('.gafete-contenedor').show();

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
				BuscaParametro();
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