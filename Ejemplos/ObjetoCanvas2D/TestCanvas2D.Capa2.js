// Constructor 
var TestCanvas2D_Capa2 = function() {
    // Llamo al constructor del ObjetoBanner
    if (Canvas2D.Capa.call(this) === false) { return false; }
    // Se ha creado el canvas, inicio los valores de la animación ... 
};

TestCanvas2D_Capa2.prototype = Object.assign( Object.create(Canvas2D.Capa.prototype), {
    constructor           : TestCanvas2D_Capa2, 
    // Función que se llama al redimensionar el documento
    EventoRedimensionar   : function() {    },
    
    // Función que pinta cada frame de la animación
    Pintar                : function() {    
        this.Context.clearRect(0, 0, this.Padre.Ancho, this.Padre.Alto);    
    console.log("p2");
    }
});
