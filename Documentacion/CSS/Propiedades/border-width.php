<?php    
    include("../../../Web/devildrey33_Documentacion.php");    
    $Doc = new devildrey33_Documentacion(basename(__FILE__)); $Base = $Doc->Base;
?>
<p>Esta propiedad nos permite especificar el tamaño del borde para el objeto.</p>
<hr />
<h2>Sintaxis</h2>
<pre class='Sintaxis'><code style="display:table; float:left; padding-right:20px">border-color: <i>valor</i>;
border-width: <i>TopBottom LeftRight</i>;
border-width: <i>Top LeftRight Bottom</i>;
border-width: <i>Top Left Bottom Right</i>;
</code>
<code style="display:table; float:right; color:#999">/* 1 valor para todos los costados. */
/* 2 valores : arriba y abajo, derecha y izquierda. */
/* 3 valores : arriba, derecha y izquierda, abajo.*/
/* 4 valores : arriba, derecha, abajo, izquierda. */
</code></pre>
<div class='nota'>Podemos especificar hasta 4 valores (uno por cada costado).<br />
Si especificamos solo un valor, se aplicará a los 4 costados.<br />
Si especificamos 2 valores, el primer valor se asignará a <i>top</i> / <i>bottom</i>, y el segundo valor a <i>left</i> / <i>right</i>.<br />
Si especificamos 3 valores, el primer valor se asignará al <i>top</i>, el segundo al <i>right</i>, y el tercero al <i>bottom</i>.<br />
Si especificamos 4 valores, el primer valor se asignará al <i>top</i>, el segundo al <i>right</i>, y el tercero al <i>bottom</i>, y el cuarto al <i>left</i>.<br />
</div><br />
<table class='Tabla'>
    <tr>
        <td><b>thin</b></td>
        <td>Especifica un borde pequeño.</td>
    </tr>
    <tr>
        <td><b>medium</b></td>
        <td>Especifica un borde medio. <b>(Utilizada por defecto)</b></td>
    </tr>
    <tr>
        <td><b>thick</b></td>
        <td>Especifica un borde espeso.</td>
    </tr>
    <tr>
        <td><b><i>tamaño</i></b></td>
        <td>Permite definir el tamaño del borde. Para más información consulta la <a href="/Doc/CSS/Unidades/" target="_blank" title='px, ex, em, %, cm, mm, in, pt, pc'>Referencia CSS : Unidades</a>.</td>
    </tr>
    <tr>
        <td><b>inherit</b></td>
        <td>Se heredara el estilo de su objeto padre. <div class='nota'>Este valor no está soportado en IE7 e inferiores. Para IE8 se necesita definir un <i>!DOCTYPE</i></div></td>
    </tr>
</table><br />