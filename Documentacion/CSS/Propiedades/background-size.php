<?php    
    include("../../../Web/devildrey33_Documentacion.php");    
    $Doc = new devildrey33_Documentacion(basename(__FILE__)); $Base = $Doc->Base;
?>
<p>Esta propiedad nos permite especificar el tamaño con el que queremos mostrar la imagen de fondo independientemente de su tamaño original.</p>
<hr />
<h2>Sintaxis</h2>
<pre class='Sintaxis'>background-size: <b>valor</b>;</pre>
<table class='Tabla'>
    <tr>
        <td><b>auto</b></td>
        <td>La imagen no se redimensionara. <b>(valor por defecto)</b></td>
    </tr>
    <tr>
        <td><b>Porcentaje</b></td>
        <td>Podemos especificar 2 valores con el porcentaje relativo al objeto que mostrara el fondo, con el que queremos mostrar la imagen.</td>
    </tr>
    <tr>
        <td><b>Píxeles</b></td>
        <td>Podemos especificar 2 valores en píxeles para definir el tamaño de la imagen del fondo.</td>
    </tr>
    <tr>
        <td><b>cover</b></td>
        <td>La imagen se expandira el máximo posible respetando su proporción aunque alguna parte quede oculta.</td>
    </tr>
    <tr>
        <td><b>contain</b></td>
        <td>La imagen se expandira de forma que se vea completamente en el contenedor respetando su proporción.</td>
    </tr>
</table><br />
