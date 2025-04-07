<?php
class Utils
{
    public function getBody(){
        echo "1";
        return json_decode(file_get_contents('php://input'), true);
    }

}