class FileUploader{
    constructor(){

    }

    static uploadFileToServer(file,location, orig, cb){
        console.log(file);
        var formData = new FormData();
        formData.append('file',file);
        formData.append('location',location);
        formData.append('original_file',orig);
        $.ajax({
            type: "POST",
            dataType : 'json',
            cache: false,
            contentType: false,
            processData: false,
            url: 'phpscripts/uploadFile.php',
            data: formData,
            success: function (data) {
                console.log(data);
                cb(data);
            },
            error: function() {
            }
        });
    }
}