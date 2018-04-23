<?php
$success = false;
$locationIn = $_POST["location"];
$originalFile = $_POST["original_file"];
if($_FILES["file"]["name"] != '')
{
    $origName = $_FILES["file"]["name"];
    $didOneExistBefore = false;
    $test = explode('.', $_FILES["file"]["name"]);
    $ext = end($test);
    //$name = rand(100, 999) . '.' . $ext;
    $name = $_FILES["file"]["name"];
    $location = '../' . $locationIn . '' . $name;  
    move_uploaded_file($_FILES["file"]["tmp_name"], $location);
    $originalFilePath = '../'.$originalFile;
    if(file_exists('../'.$originalFile))
    {
        $didOneExistBefore = true;
        $res = unlink($originalFilePath);
    }
    //media/map.png
    $success = true;
    //echo '<img src="'.$location.'" height="150" width="225" class="img-thumbnail" />';
}
else{
    $success = false;
}
echo json_encode(array('success' => $success, "locationIn" => $locationIn, "Name" => $origName, "existed" => $didOneExistBefore, "res" => $res));

?>
