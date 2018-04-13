<?php
    $success = false;
    $myFile = "../data/campaign.json";
    $stringData = $_GET["data"];        
    if (!$data = file_put_contents($myFile, $stringData)) {
        $success = false;
    } else {
        $success = true;        
    }
    echo json_encode(array('success' => $success));
?>
