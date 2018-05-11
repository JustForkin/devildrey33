<p>El selector <code>nth-child</code> se puede utilizar de varias maneras, pero siempre pensando en una estructura de arból en la que queremos buscar elementos con ciertas caracteristicas agrupandolos por su nodo padre.</p>
<p>El mas sencillo es es el de posición, si por ejemplo quieres apuntar a la segunda etiqueta 'p' que pertenecen a objetos con una clase especifica, puedes utilizar <code>.ClaseEspecifica > p:nth-child(2) { ... }</code>.</p>
<p>Luego tenemos los valores '<code>even</code>' (pares) y '<code>odd</code>' (impares), que por ejemplo se utilizan en tablas con muchos datos para cambiar el color del fondo de las celdas, y asi poder diferenciar mejor las filas y columnas.</p>
<p>Tambien se puede utilizar una fórmula para obtener elementos en una posición multiple del valor especificado. </p>
<p>Y por último se puede utilizar para seleccionar N elementos empezando desde el primero. </p>
<hr />
<h2>Sintaxis</h2>

<pre class='Sintaxis'><code style="display:table; float:left; padding-right:20px">:nth-child( <i>Posición</i> ) { };
:nth-child( <i>even | odd</i> ) { };
:nth-child( <i>A</i>n+<i>B</i> ) { };
:nth-child( <i>-</i>n+<i>B</i> ) { };
</code>
<code style="display:table; float:right; color:#999">/* Posición única. */
/* pares / impares. */
/* Multiples de 'A' + 'B'. */
/* Desde el primer hijo hasta 'B'. */
</code>
</pre>

<pre class='Sintaxis'></pre>

<table class='devildrey33_Marco'>
    <tr>
        <td class='TD_Sintaxis'><b>Posición</b></td>
        <td class='TD_Sintaxis'>Especifica el elemento, los elementos empiezan desde 1. Solo se permiten posiciones mayores que 0.</td>
    </tr>
    <tr>
        <td class='TD_Sintaxis'><b>even</b></td>
        <td class='TD_Sintaxis'>Elementos pares (2, 4, 6, 8, etc...).</td>
    </tr>
    <tr>
        <td class='TD_Sintaxis'><b>odd</b></td>
        <td class='TD_Sintaxis'>Elementos impares (1, 3, 5, 7, etc...).</td>
    </tr>
    <tr>
        <td class='TD_Sintaxis'><b><i>A</i>n+<i>B</i></b></td>
        <td class='TD_Sintaxis'>Fórmula : la 'A' es el avance, y la 'B' es el inicio (por defecto 0). Para la 'A' no se permiten números negativos, para la 'B' si que se permiten números negativos.
        	<div class='nota'>Por ejemplo podemos crear una formúla que escoja los multiples de 3 sumandole 1 (3n+1), y esto resultaria en que se elegirian los objetos 1, 4, 7, 10, etc..</div>
        </td>
    </tr>
    <tr>
        <td class='TD_SintaxisU'><b>-n+<i>B</i></b></td>
        <td class='TD_SintaxisU'>Selecciona 'B' elementos empezando por el primero. El valor 'B' no puede ser negativo.</td>
    </tr>
</table>

<hr />
<h2>Compatibilidad</h2>
<p>Esta propiedad es soportada por todos los navegadores compatibles con CSS3.</p>