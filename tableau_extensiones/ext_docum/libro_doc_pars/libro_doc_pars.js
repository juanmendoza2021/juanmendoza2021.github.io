'use strict';

/**
Funciones para presentar el LIBRO que liga la documentaicón de Tableau
 */

// Función que contiene todo el codigo
(function () {
	//const C_LIGA_APEX_GAFETE = 'https://apexqa.izzi.mx:9091/ords/edw/r/info_general_tab/entidad?par_codigo=';
	const C_LIGA_APEX_GAFETE = 'https://hlozsi9l4od21gp-mibasedatos01.adb.us-phoenix-1.oraclecloudapps.com/ords/r/miapex01/info_general_tab/entidad?par_codigo=';

	let var_sw_proc = "OK";
	let var_Par_CodigoTablero = "ND";
	let var_Par_Owners  = "ND";
	let var_Par_Soporteadores = "ND";
	let var_Par_LiegaApex = "ND";

	// función que se activa despues de cargar la página
	$(document).ready(function () {
		// $("#mytrace").html(function(i,origText){return origText + "</br> Ready ............";});
		
		let my_url = window.location.href;
		// $("#mytrace").html(function(i,origText){return origText + "</br> ...my_url: " + my_url;});
		
		let my_params = (new URL(document.location)).searchParams;
		// $("#mytrace").html(function(i,origText){return origText + "</br> ...my_params: " + my_params;});
	
		var_Par_CodigoTablero = my_params.get("t");
		var_Par_Owners = my_params.get("p");
		var_Par_Soporteadores = my_params.get("s");
		var_Par_LiegaApex = C_LIGA_APEX_GAFETE + var_Par_CodigoTablero
		
		// $("#mytrace").html(function(i,origText){return origText + "</br> ...var_Par_CodigoTablero: " + var_Par_CodigoTablero;});
		// $("#mytrace").html(function(i,origText){return origText + "</br> ...var_Par_Owners: " + var_Par_Owners;});
		// $("#mytrace").html(function(i,origText){return origText + "</br> ...var_Par_Soporteadores: " + var_Par_Soporteadores;});
		// $("#mytrace").html(function(i,origText){return origText + "</br> ...var_Par_LiegaApex: " + var_Par_LiegaApex;});
		
		dibuja_gafete();
		
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
		$('#gafete-mensaje-resultado').hide();
		$('#gafete-mensaje-espera').hide();
		$('.gafete-contenedor').show();

		// $("#mytrace").html(function(i,origText){return origText + "</br> ..............";});
		// $("#mytrace").html(function(i,origText){return origText + "</br> fin funcion - dibuja_gafete.....";});
		// $("#mytrace").html(function(i,origText){return origText + "</br> ::::::::::::::";});
	} // fin: dibuja_gafete




})();  // fin funcion completa