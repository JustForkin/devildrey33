<?php    
    include("../../../Web/devildrey33_Documentacion.php");    
    $Doc = new devildrey33_Documentacion(basename(__FILE__)); $Base = $Doc->Base;
?>
<p>Esta propiedad nos permite especificar si este elemento es flotante, y hacia que lado apunta.</p>
<hr />
<h2>Sintaxis</h2>
<pre class='Sintaxis'>float: Valor;</pre>
<table class='Tabla'>
    <tr>
        <td><b>none</b></td>
        <td>El objeto se tratara normalmente. <b>(valor por defecto)</b></td>
    </tr>
    <tr>
        <td><b>left</b></td>
        <td>El objeto se convierte en flotante, y se alinea hacia la izquierda.</td>
    </tr>
    <tr>
        <td><b>right</b></td>
        <td>El objeto se convierte en flotante, y se alinea hacia la derecha.</td>
    </tr>
    <tr>
        <td><b>inherit</b></td>
        <td>Se heredara el estilo de su objeto padre.
        	<div class='nota'>Este valor no se soporta en IE7, y en IE8 requiere la declaración de un <code>!DOCTYPE</code>.</div>
        </td>
    </tr>
</table><br />
