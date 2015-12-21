/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$Lab = new function() {
    /* Temporizador para actualizar el resultado */
//    this.Lab_Temporizador     = 0;
    /* Objeto que contiene el codemirror */
    this.Editor  = new Object;
    /* Path del archivo que se está editando */
    this.Archivo = "";
    /* Determina si se ha modificado el código */
    this.Original = "";
    /* Forzar vista */
    this.ForzarVista = "-1";
    
    /* Función que inicializa el laboratorio */
    this.Iniciar = function() {
        console.log("Lab.Iniciar", this.Archivo);
        $("#MarcoNavegacion .Lab_Archivo").off("click").on("click", function() { $Lab.ClickArchivo($(this)); });
        $("#MarcoNavegacion .Lab_Directorio").off("click").on("click", function() { $Lab.ClickDirectorio($(this)); });
        $(".Lab_Archivo > a").off("click").on("click", function(e) {  e.preventDefault(); });
        
        this.Editor = CodeMirror.fromTextArea(document.getElementById('Lab_Codigo'), {
            mode                : 'text/html',
            indentUnit          : 4,
            fixedGutter         : false,
            lineNumbers         : true,
            autoCloseTags       : true,
            autoCloseBrackets   : true,
            matchTags           : { bothTags : true },
            
            extraKeys           : { "Ctrl-S" : function(instance) { 
                                    if (typeof $Admin !== "undefined") { $Admin.Lab_Guardar();                                             }
                                    else                               { $Base.MostrarMensaje("No tienes permiso para guardar archivos."); }
                                  }}
            /*theme : "monokay",
            theme : "ambiance"/*,
            theme : "devildrey33"/*,
            onChange: function() {
                    clearTimeout(delay);
                    delay = setTimeout(updatePreview, 100);
            }*/
        });
        
        this.Editor.on("change", function(cm, change) {
            $Lab.ActualizarResultado();
            if ($Lab.Original !== $Lab.Editor.getValue()) { $("body").attr({ "modificado" : "true" });  }
            else                                          { $("body").attr({ "modificado" : "false" }); }
        });
        
        this.Original = $("#Lab_Codigo").val();
        this.AjustarVista(this.ForzarVista, false);
        this.ActualizarResultado();
        
//        this.CargarArchivo();  
    };
    
    
    /* Función para expandir / contraer directorios en el explorador del laboratorio */
    this.ClickDirectorio = function(Objeto) {
        console.log("Lab.ClickDirectorio", Objeto);
        Animacion = Objeto.next();
        Directorio = Animacion.find("ul");
        // Asigno la altura en pixeles del directorio por abrir
        var Altura = Animacion.css("height");
        var AltoPadre = 0;
        if (parseInt(Altura) === 0)   { Animacion.css({ "height" : Directorio.height()});   AltoPadre = Directorio.height();  }
        else                          { Animacion.css({ "height" : 0 });                    AltoPadre = -Directorio.height();  }

        Padre = Objeto.parent().parent().parent();
        while (Padre !== null) {
            if (Padre.attr("class") !== "Lab_Directorio_Animacion") break;
            Padre.css({ "height" : Padre.height() + AltoPadre });
            Padre = Padre.parent().parent().parent();
        }
    };
    
    
    /* Función que controla cuando se hace click en un archivo del explorador, para cargarlo en el labotatorio. */
    this.ClickArchivo = function(Objeto, Dest) {
        console.log("Lab_ClickArchivo", Objeto);
        var Rec = Objeto;
        var Ret = Rec.find("span").html();

        while (Rec !== null) {
            Rec = Rec.parent().parent().parent().prev();
            if (Rec.attr("class") !== "Lab_Directorio") break;
            Ret = Rec.find("span").html() + "/" + Ret;
        }
        Ret = "Ejemplos/" + Ret;
        if (Dest) { $Admin.LabExplorar_CargarPreview(Ret); }
        else      { this.CargarArchivo(Ret); }
    };
    
    /* Función para cargar un archivo */
    this.CargarArchivo = function(Archivo, ID) {
        $Base.Cargando("TRUE");
        var nopush = false;
        console.log("Lab.CargarArchivo", Archivo);
        if (Archivo === undefined) { Archivo = this.Archivo; nopush = true; }
        if (ID === undefined)      { ID = -1; }        
        $Base.PeticionAjax = $.post("/cmd/LabAbrirEjemplo.cmd",  { "Archivo" : Archivo, "ID" : ID }, function(data) {
            Datos = JSON.parse(data);            
            if      (Datos["Ret"] === 404) { $Base.MostrarErrorAjax(404, false); }
            else if (Datos["Ret"] === 403) { $Base.MostrarErrorAjax(403, false); }
            else                           { 
                // Laboratorio principal
                if (Datos["ID"] === -1) {
                    $Lab.Original = Datos["Datos"];
                    $Lab.Editor.setValue(Datos["Datos"]);  
                    $Lab.AjustarVista(Datos["Vista"]);  
                    URL = "/Lab/" + Datos["Archivo"];
                    $("#MarcoNavegacionLab").attr({"archivo" : Datos["Archivo"]});
                    if (nopush === false) {
                        $Base.Entrada = $Base.IdentificarEntrada(URL, URL);    
                        $Base.Entrada["Titulo"] = "Lab : " + Datos["Archivo"];
                        window.history.pushState($Base.Entrada, document.title, URL);
                        /* Pongo el scroll arriba DESPUES de identificar la URL y haber guardado el scroll para el historial */
                        $(window).scrollTop(0);
                        document.title = $Base.Entrada["Titulo"];
                    }
                    $("body").attr({ "modificado" : "false" });
                }
                // Instancia de un minilab
                else {
                    $Lab.MiniLab_Editores[Datos["ID"]].setValue(Datos["Datos"]);
                    $Lab.MiniLab_ActualizarResultado(Datos["ID"]);
                }
                $Base.Cargando("FALSE");

            }        
        });
    };
    
    

    /* Se utilizan los siguientes espacios en el LocalStorage :
            Lab_AbiertoExplorador   :   Guarda el estado abierto/oculto para el explorador
            Lab_AnchoExplorador     :   Guarda el ancho en pixeles del explorador cuado está abierto

            Lab_BarraPosC           :   Posición para la barra en vista de columnas.
            Lab_BarraPosF           :   Posición para la barra en vista de filas.
     *
     **/  
    this.AjustarVista = function(NuevaVista, Guardar) {
        if (document.getElementById("Lab_Barra1") === null) { return; }
        // -1 Por defecto, 0 Mixta columnas, 1 Mixta filas, 2 Código, 3 Preview
        if (NuevaVista === "-1") { 
            NuevaVista = (typeof(localStorage["Lab_Vista"]) === "undefined")? "0" : localStorage["Lab_Vista"]; 
        }
        else { 
            if (typeof(Guardar) === "undefined") { 
                localStorage["Lab_Vista"] = NuevaVista; 
            }
            else {
                if (Guardar === true) { 
                    localStorage["Lab_Vista"] = NuevaVista; 
                }
            }
        }
        if (typeof $("#BarraPrincipal").css("zoom") === "undefined") { Zoom = 1; }
        else                                                         { Zoom = $("#BarraPrincipal").css("zoom"); }
        if (Zoom === "normal") Zoom = 1;
        console.log("$Lab.AjustarVista", NuevaVista, Zoom);
        AnchoMenu = $("#BarraPrincipal").outerWidth() * Zoom;
        Ancho = window.innerWidth - (AnchoMenu * 2);
        Alto = window.innerHeight;
        AnchoBarra1 = parseInt($("#Lab_Barra1").outerWidth());
        //AnchoExplorador = parseInt(localStorage["Lab_AnchoExplorador"]);
        switch (NuevaVista) {
            case "0" : $("#BarraNavegacion_Lab_IconoVer").attr({ "ver" : "filas" });    break; // Mixto Filas
            case "1" : $("#BarraNavegacion_Lab_IconoVer").attr({ "ver" : "columnas" }); break; // Mixto Columnas
            case "2" : $("#BarraNavegacion_Lab_IconoVer").attr({ "ver" : "codigo" });   break; // Código
            case "3" : $("#BarraNavegacion_Lab_IconoVer").attr({ "ver" : "preview" });  break; // Preview                
        }


        for (i = 1; i < 5; i++) {
            $("#BarraNavegacion_LabMarcoVer > div:nth-child(" + i + ")").css({ display : (i - 1 === parseInt(NuevaVista))? "none" : "block" });
        }

        switch (NuevaVista) {
            case "0" : // Mixto Filas
                $(".CodeMirror").css({ "display" : "block" });
                PosBarra = Math.round((Alto - 6) / 2);
/*                if (undefined === localStorage["Lab_BarraPosF"]) { PosBarra = Math.round((Alto - 6) / 2); }
                else                                             { PosBarra = parseInt(localStorage["Lab_BarraPosF"]); }*/

                $("#Lab_Barra1").css({  top : PosBarra, left : AnchoMenu,  height : 4, width : Ancho, display : "block", cursor : "ns-resize" });
                $("#Lab_Barra1").draggable({  /*                       El contenedor del drag sera el marco de navegación, OJO porque en la vista de columnas no debe ser asi */
                    axis: "y",  cursor : "ns-resize",   containment : "#MarcoNavegacion",
                    start : function(event, ui) {   $("#Lab_ParcheIframe").css({ "display" : "block" });    $Lab.DragFilas(false); },
                    drag  : function(event, ui) {                                                           $Lab.DragFilas(false); },
                    stop  : function(event, ui) {   $("#Lab_ParcheIframe").css({ "display" : "none" });     $Lab.DragFilas(true);  }
                });
                $("#Lab_Preview").css({ left : AnchoMenu, width : Ancho + 1, display : "block" });
                this.DragFilas(false);
                break;
            case "1" : // Mixto columnas
                $(".CodeMirror").css({ "display" : "block" });
                PosBarra = Math.round((Ancho - 6) / 2);
//                if (undefined === localStorage["Lab_BarraPosF"]) { PosBarra = Math.round((Ancho - 6) / 2); } // El 6 son los pixeles que ocupa la barra
  //              else                                             { PosBarra = parseInt(localStorage["Lab_BarraPosC"]); }

    //            AnchoParte = Math.round((Ancho - 6) / 2); // El 6 son los pixeles que ocupa la barra
                $("#Lab_Barra1").css({  top : 0, left  : PosBarra + AnchoMenu,  height : Alto, width  : 4, display : "block", cursor : "ew-resize" });
                $("#Lab_Barra1").draggable({  /*                       El contenedor del drag sera el MarcoNavegacionLab */
                    axis: "x",  cursor : "ew-resize",   containment : "#MarcoNavegacionLab",
                    start : function(event, ui) {   $("#Lab_ParcheIframe").css({ "display" : "block" });    $Lab.DragColumnas(false); },
                    drag  : function(event, ui) {                                                           $Lab.DragColumnas(false); },
                    stop  : function(event, ui) {   $("#Lab_ParcheIframe").css({ "display" : "none" });     $Lab.DragColumnas(true);  }
                });
                $("#Lab_Preview").css({ height : Alto + 1, left : PosBarra + AnchoMenu + 4, top : 0, display : "block" });
                this.DragColumnas(false);
                break;
            case "2" : // Código
                $("#Lab_Barra1").css({  display : "none" });
                $("#Lab_Preview").css({ display : "none" });
                this.Editor.setSize( Ancho,  Alto );
                $(".CodeMirror").css({ "display" : "block" });
                break;
            case "3" : // PreView
                $("#Lab_Barra1").css({  display : "none" });
                $("#Lab_Preview").css({ display : "block", top : 0, left : AnchoMenu, height : Alto, width : Ancho });
                $(".CodeMirror").css({ "display" : "none" });
                break;
        }
    };
    
    /* Función que controla cuando se arrastra el separador de la vista de filas */
    this.DragFilas = function(GuardarDatos) {
        if (document.getElementById("Lab_Barra1") === null) { return; }
        if (typeof $("#BarraPrincipal").css("zoom") === "undefined") { Zoom = 1; }
        else                                                         { Zoom = $("#BarraPrincipal").css("zoom"); }
        AltoBarra = $("#Lab_Barra1").outerHeight();
        AnchoMenu = $("#BarraPrincipal").outerWidth() * Zoom;
        Ancho = window.innerWidth - (AnchoMenu * 2);
        Alto = $(window).outerHeight();
        PosBarra = $("#Lab_Barra1").offset().top;

        this.Editor.setSize(Ancho, PosBarra); 
//        $("#MarcoNavegacionLab > .CodeMirror").css({ "left" :  AnchoMenu });
        
        $("#Lab_Preview").css({ "top" :  PosBarra + AltoBarra, "height" : (Alto - (PosBarra + AltoBarra)) });

/*        if (GuardarDatos === true && PosBarra > 0 && PosBarra < $(window).outerHeight()) {
            localStorage["Lab_BarraPosF"] = PosBarra;
        }*/
    };


    /* Calculos para el drag para la vista de columnas */
    this.DragColumnas = function(GuardarDatos) {
        if (document.getElementById("Lab_Barra1") === null) { return; }
        if (typeof $("#BarraPrincipal").css("zoom") === "undefined") { Zoom = 1; }
        else                                                         { Zoom = $("#BarraPrincipal").css("zoom"); }
        AnchoMenu = $("#BarraPrincipal").outerWidth() * Zoom;
        AnchoBarra = $("#Lab_Barra1").outerWidth();
        Alto = $(window).outerHeight();
        Ancho = window.innerWidth - (AnchoMenu);

        //        Ancho = $(window).outerWidth();
        PosBarra = $("#Lab_Barra1").offset().left;
        this.Editor.setSize(((PosBarra - AnchoMenu) > 0) ? PosBarra - AnchoMenu : 0,  Alto); 
//        $("#MarcoNavegacionLab > .CodeMirror").css({ "left" :  PosBarra + AnchoBarra });
    //    console.log("Alto " + Alto + " " + PosBarra +)
        $("#Lab_Preview").css({ "left" :  PosBarra + AnchoBarra, "width" : (Ancho - (PosBarra + AnchoBarra)) });

/*        if (GuardarDatos === true && PosBarra > AnchoMenu && PosBarra < $(window).outerWidth()) {
            localStorage["Lab_BarraPosC"] = PosBarra - AnchoMenu;
        }*/
    };
    

    /* Función que actualiza el marco del resultado */
    this.ActualizarResultado = function() {
        var previewFrame = document.getElementById('Lab_Preview');
        var preview =  previewFrame.contentDocument ||  previewFrame.contentWindow.document;
        preview.open();
        var Codigo = this.Editor.getValue();
        preview.write(Codigo);
        preview.close();    
    };
    
    
    
    this.AsignarCodigoPreview = function(Codigo) {
        var previewFrame = document.getElementById('Lab_Explorar_Preview');
        var preview =  previewFrame.contentDocument ||  previewFrame.contentWindow.document;
        preview.open();
        preview.write(Codigo);
        preview.close();    
    };












    this.MiniLab_Editores = [];

    /***********/
    /* MiniLab */
    /***********/
    this.MiniLab_Iniciar = function() {
        // Inicio los codemirrors
        console.log("Lab.MiniLab_Iniciar");
        this.MiniLab_Editores = [];
        MiniLabs = document.getElementsByClassName("MiniLab_Codigo");        
        for (var i = 0; i < MiniLabs.length; i++) {
            Archivo = MiniLabs[i].parentNode.getAttribute("archivo");
            this.MiniLab_Editores[i] = CodeMirror.fromTextArea(MiniLabs[i], {
                mode                : 'text/html',
                indentUnit          : 4,
                fixedGutter         : false,
                lineNumbers         : true,
                autoCloseTags       : true,
                autoCloseBrackets   : true,
                matchTags           : { bothTags : true }                
            });
            this.MiniLab_Editores[i].PosObjeto = i;
            this.MiniLab_Editores[i].on("change", function(cm, change) {
                $Lab.MiniLab_ActualizarResultado(cm.PosObjeto);
            });
            this.CargarArchivo(Archivo, i);
        }
        
        // Enlazo los botones de las vistas
        $(".MiniLab_VerCodigo").off("click").on("click", function(event) { 
            this.parentNode.setAttribute("ver", "codigo");
            ID = this.parentNode.getAttribute("id").replace("MiniLab_", "");
            $Lab.MiniLab_Editores[ID].refresh();
        });
        $(".MiniLab_VerPreview").off("click").on("click", function(event) { 
            this.parentNode.setAttribute("ver", "preview");
        });
        $(".MiniLab_VerMixto").off("click").on("click", function(event) { 
            this.parentNode.setAttribute("ver", "mixto");
            ID = this.parentNode.getAttribute("id").replace("MiniLab_", "");
            $Lab.MiniLab_Editores[ID].refresh();
        });
        
        // Inicio los botones para multiples ejemplos
        $(".MiniLab_ContenedorBotones > label").off("click").on("click", function(event){ 
            Raiz = $(this).parent().parent();
            Raiz.find(".MiniLab[oculto='false']").attr({ "oculto" : "true" });
            Actual = Raiz.find(".MiniLab:nth-child(" + $(this).html() + ")");
            Actual.attr({ "oculto" : "false" });
            $Lab.MiniLab_Editores[Actual.attr("id").replace("MiniLab_", "")].refresh();
        });
    };

    /* Función que actualiza el marco del resultado */
    this.MiniLab_ActualizarResultado = function(ID) {
        console.log("Lab.MiniLab_ActualizarResultado", ID);
        var previewFrame = document.getElementById('MiniLab_' + ID).getElementsByClassName("MiniLab_Preview")[0];
//        var previewFrame = document.getElementById('Lab_Preview');
        var preview =  previewFrame.contentDocument ||  previewFrame.contentWindow.document;
        preview.open();
        var Codigo = this.MiniLab_Editores[ID].getValue();
        preview.write(Codigo);
        preview.close();    
    };


    
};


// Al cambiar el tamaño de la ventana, actualizo la vista del laboratorio
$(window).resize(function() {
    $Lab.AjustarVista("-1");
});

    








