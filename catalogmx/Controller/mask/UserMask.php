<?php
class UserMask
{
    public function exec($action){
        echo "A1";
        require PROJECT_ROOT_PATH . "/Controller/Api/UserController.php";
        $userFeedController = new UserController();
        $strMethodName = $action . 'Action';
        $userFeedController->{$strMethodName}();
    }
}