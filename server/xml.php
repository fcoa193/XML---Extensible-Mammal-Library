<?php


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
    header('Access-Control-Allow-Headers: token, Content-Type');
    header('Access-Control-Max-Age: 1728000');
    header('Content-Length: 0');
    header('Content-Type: text/plain');
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

if (isset($_POST["create"]) && $_POST["create"] == "true") {
    $xml->addChild($_POST["tag"]);
    $nana = $_POST["tag"];
    $xml->$nana->addChild("name", $_POST["tag"]);
    foreach ($_POST as $key => $value) {
        if ($key != "tag") {
            if ($key != "create") {
                $xml->$nana->addChild($key, $value);
            }
        }
    }
    $xml->saveXML("./../animal.xml");
}

if (isset($_FILES['image']) && isset($_POST["tag"])) {
    $extension = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
    $newName = $_POST["tag"] . "." . $extension;
    move_uploaded_file($_FILES['image']['tmp_name'], "./../assets/" . $newName);
    $nana = $_POST["tag"];
    $xml->$nana->picture = "./assets/" . $newName;
    $xml->saveXML("./../animal.xml");
}
$xml->saveXML("./../animal.xml");


print_r($_POST["name"]);
if (isset($_POST["update"]) && $_POST["update"] == "true") {
    $balises = $_POST;
    $baliseName = $_POST["name"];

    foreach ($balises as $key => $value) {
        if ($key != $baliseName || $key != "update") {
            $xml->$baliseName->$key = $value;
        }
    }
    $xml->saveXML("./../animal.xml");
}
fclose($file);
