<?php
    $success = false;
    $sessionFile = $_POST["sessionFileName"];   
    $sessionFile = "../".$sessionFile; 
    $sessionData = $_POST["sessionData"];
    if (!$data = file_put_contents($sessionFile, $sessionData)) {
        $success = false;
    } else {
        $success = true;        
    }
    echo json_encode(array('success' => $success));
?>
