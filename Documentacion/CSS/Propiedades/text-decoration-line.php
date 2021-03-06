<?php    
    include("../../../Web/devildrey33_Documentacion.php");    
    $Doc = new devildrey33_Documentacion(basename(__FILE__)); $Base = $Doc->Base;
?>
<p>Esta propiedad nos permite definir el estilo de las lineas para la decoración del texto.</p>
<hr />
<h2>Sintaxis</h2>
<pre class='Sintaxis'><code style="display:table; float:left; padding-right:20px">text-decoration-line: <i>none</i>;
text-decoration-line: <i>underline</i>;
text-decoration-line: <i>overline</i>;
text-decoration-line: <i>line-through</i>;
text-decoration-line: <i>underline overline</i>;
text-decoration-line: <i>underline overline line-through</i>;
</code>
<code style="display:table; float:right; color:#999">/* 1 valor (desactivado, no se puede combinar) */
/* 1 valor (subrayado) */
/* 1 valor (sobre rallado). */
/* 1 valor (tachado) */
/* 2 valores combinados */
/* 3 valores combinados */
</code></pre>
<table class='devildrey33_Marco'>
    <tr>
        <td><b>none</b></td>
        <td>Sin decoración.</td>
    </tr>
    <tr>
        <td><b>underline</b></td>
        <td>Texto subrayado.</td>
    </tr>
    <tr>
        <td><b>overline</b></td>
        <td>Texto sobre rayado.</td>
    </tr>
    <tr>
        <td><b>line-through</b></td>
        <td>Texto tachado.</td>
    </tr>
</table><br />
