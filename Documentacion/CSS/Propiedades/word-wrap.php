<?php    
    include("../../../Web/devildrey33_Documentacion.php");    
    $Doc = new devildrey33_Documentacion(basename(__FILE__)); $Base = $Doc->Base;
?>
<p>Esta propiedad nos permite especificar si se deben cortar forzosamente las palabras que excedan el ancho del objeto.</p>
<hr />
<h2>Sintaxis</h2>
<pre class='Sintaxis'>word-wrap: <b>valor</b>;</pre>
<table class='Tabla'>
    <tr>
        <td style='width:100px'><b>normal</b></td>
        <td>No se cortaran las palabras por esta norma. (valor por defecto)
        	<div class='nota'>De todas formas una palabra podria llegar a ser cortada dependiendo del valor de <a href="word-break" target="_blank">word-break</a>.</div>
        </td>
    </tr>
    <tr>
        <td><b>break-word</b></td>
        <td>Permite cortar las palabras si exceden el ancho del contenedor.</td>
    </tr>
</table><br />
