<?php    
    include("../../../Web/devildrey33_Documentacion.php");    
    $Doc = new devildrey33_Documentacion(basename(__FILE__)); $Base = $Doc->Base;
?>
<p>Este selector nos permite especificar que queremos seleccionar un elemento que está dentro de otro elemento.</p>
<p>Estos elementos pueden ser etiquetas, clases, ID's, o cualquier tipo de selector permitido.</p>
<div class='nota'>El elemento2 puede estar dentro de varios elementos dentro del elemento1, es decir podemos tener un "<code>div</icode" con una "<code>tabla</code>" dentro, y que esta tabla tenga una etiqueta "<code>p</code>".</div><br />
<hr />
<h2>Sintaxis</h2>
<pre class='Sintaxis'><i>.Elemento #Elemento</i> { };</pre>
