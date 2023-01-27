<?php


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
    header('Access-Control-Allow-Headers: token, Content-Type');
    header('Access-Control-Max-Age: 1728000');
    header('Content-Length: 0');
    header('Content-Type: text/plain');
    die();
}

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$file = fopen("./../animal.xml", "r+");
$xmlDoc = "";
while (($buffer = fgets($file, 4096)) !== false) {
    $xmlDoc .= $buffer;
}

$xml = simplexml_load_string($xmlDoc);

if (isset($_POST["delete"]) && $_POST["delete"] == "true" && isset($_POST["source"])) {
    $nana = $_POST["source"];

    unset($xml->$nana);
    $xml->saveXML("./../animal.xml");
}
print_r($_POST);
if (isset($_POST["update"]) && $_POST["update"] == "true" && isset($_POST["source"])) {
    
}
fclose($file);
