<?php
    $myFile = "../data/campaign.json";
    $stringData = $_GET["data"];    
    // $fh = fopen($myFile, 'w') or die("can't open file");
    // fwrite($fh, $stringData);
    // fclose($fh)
    file_put_contents($myFile, $stringData);
?>