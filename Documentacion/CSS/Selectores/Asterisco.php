<?php    
    include("../../../Web/devildrey33_Documentacion.php");    
    $Doc = new devildrey33_Documentacion(basename(__FILE__)); $Base = $Doc->Base;
?>
<p>Este selector hace referencia a todas las etiquetas del documento.</p>
<p>Se suele utilizar para resetear estilos, ya que por defecto cada navegador tiene sus estilos, que no tienen porque coincidir con otros navegadores.</p>
<div class='nota'>Personalmente prefiero evitar el tener que resetear todos los estilos del documento, y prefiero hacer-lo para cada etiqueta individualmente.</div><br />
<hr />
<h2>Sintaxis</h2>
<pre class='Sintaxis'>* { };</pre>
