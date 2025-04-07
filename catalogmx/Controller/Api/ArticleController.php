<?php
include "Utils.php";

class ArticleController extends BaseController
{

    //get Articles
    private function fetchArticles($articleModel): void
    {
        $articleId = $_GET["id"];
        $responseData = null;
        if ($articleId > 0) {
            $arrArticles = $articleModel->getArticleDetails($articleId);
            $responseData = json_encode($arrArticles);
        } else {
            $arrArticles = $articleModel->getAllArticles();
            $responseData = json_encode($arrArticles);
           
        }
        $this->sendOutput(
            $responseData,
            array('Content-Type: application/json', 'HTTP/1.1 200 OK')
        );

    }

    // save or update article
    private function saveArticles($articleModel)
    {
        //pull body
        $entityBody = file_get_contents('php://input');
        $jsonContent = json_decode($entityBody);

        print_r($jsonContent);

    }

    // soft delete article
    private function deleteArticles($articleModel, $id)
    {
        $responseArr = [];

        if ($articleModel->deleteArticles($id))
            array_push($responseArr, array("deleted" => "yes"));
        else
            array_push($responseArr, array("deleted" => "no"));

        $this->sendOutput(
            $responseArr,
            array('Content-Type: application/json', 'HTTP/1.1 201 OK', 'Access-Control-Allow-Origin: *')
        );
    }
    private function restoreArticles($id)
    {

        echo 'a restaurar! ' . $id;

    }

    /**
     * "/article/feature" Endpoint - Get list of users
     */
    public function featuresAction()
    {
        try {
            $articleModel = new ArticleModel();
            $requestMethod = $_SERVER["REQUEST_METHOD"];

            switch (strtoupper($requestMethod)) {
                case 'POST':
                    $this->saveArticles($articleModel);
                    break;
                case 'DELETE':
                    $this->deleteArticles(
                        $articleModel,
                        $_GET["id"]
                    );
                    break;
                case 'PATCH':
                    $this->restoreArticles($_GET["id"]);
                    break;
                case 'GET':
                default: {
                    $this->fetchArticles($articleModel);
                    break;
                }
            }
        } catch (Error $error) {
            echo $error;
        }
    }
}
