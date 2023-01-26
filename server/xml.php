<?php 

    

    $file = fopen("./../animal_copy.xml", "r+");
    $xmlDoc = "";
    while (($buffer = fgets($file, 4096)) !== false) { 
        $xmlDoc .= $buffer;
    }

    $xml = simplexml_load_string($xmlDoc);


    
    if ($_POST["delete"] == "true" && isset($_POST["tagSource"])) {
        unset($xml->$_POST["tagSource"]);
        $xml->saveXML("./../test.xml");
    }

    fclose($file);
?>