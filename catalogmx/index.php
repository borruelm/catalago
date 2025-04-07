<?php
require __DIR__ . "/inc/bootstrap.php";
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode('/', $uri);
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
header('Content-Type: application/json');
$method = $_SERVER['REQUEST_METHOD'];
if ($method == "OPTIONS") {
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
header("HTTP/1.1 200 OK");
die();
}

switch ($uri[3]) {
    case "user":
        include PROJECT_ROOT_PATH . "/Controller/Api/UserController.php";
        $objFeedController = new UserController();
        $strMethodName = $uri[4] . 'Action';
        $objFeedController->{$strMethodName}();

        break;
    case "image":
        include PROJECT_ROOT_PATH . "/Controller/Api/ImagesController.php";
        $objFeedController = new ImagesController();
        $strMethodName = $uri[4] . 'Action';
        $objFeedController->{$strMethodName}();

        break;
    case "article":
        include PROJECT_ROOT_PATH . "/Controller/Api/ArticleController.php";
        $objFeedController = new ArticleController();
        $strMethodName = $uri[4] . 'Action';
        $objFeedController->{$strMethodName}();
        
        break;
    default:
        header("HTTP/1.1 404 Not Found");
        exit();
}
?>