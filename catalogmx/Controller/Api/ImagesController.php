<?php
class ImagesController extends BaseController
{
    /**
     * Summary of fetchImages
     * @param mixed $imageModel
     * @return array all images and active only
     */
    private function fetchImages($imageModel)
    {
        $imgArray = [];

        $imgData = null;
        if ($_GET["all"]) {
            $imgData = $imageModel->getAllImages($_GET["id"]);
        } else {
            $imgData = $imageModel->getAllActiveImages($_GET["id"]);
        }

        foreach ($imgData as $image) {
            $newImageRecord = [];
            $newImageRecord["id"] = $image["id"];
            $newImageRecord["name"] = $image["name"];
            $newImageRecord["content"] = base64_encode($image["content"]);
            $newImageRecord["active"] = $image["active"];
            array_push($imgArray, $newImageRecord);
        }

        $this->sendOutput(
            json_encode($imgArray),
            array('Content-Type: application/json', 'HTTP/1.1 200 OK')
        );
    }

    /**
     * Summary of updateImageActive
     * @param mixed $imageModel {id and status}
     * @return void
     */
    private function updateImageActive($imageModel)
    {
        //pull body
        $entityBody = file_get_contents('php://input');
        $jsonContent = json_decode($entityBody);
        $responseArr = [];


        if ($imageModel->updateImageStatus($jsonContent->id, $jsonContent->status))
            array_push($responseArr, array("deleted" => "yes"));
        else
            array_push($responseArr, array("deleted" => "no"));


        $this->sendOutput(
            json_encode($responseArr[0]),
            array('Content-Type: application/json', 'HTTP/1.1 201 OK', 'Access-Control-Allow-Origin: *')
        );
    }

    /**
     * Summary of newImageActive
     * @param mixed $imageModel -> we are storing new images to an article
     * @return void
     */
    private function newImageActive($imageModel)
    {
        //pull body
        $entityBody = file_get_contents('php://input');
        $jsonContent = json_decode($entityBody);
        $responseArr = [];

        if ($imageModel->createImage($jsonContent->articleId, $jsonContent->fileName, $jsonContent->fileContent))
            array_push($responseArr, array("created" => "yes"));
        else
            array_push($responseArr, array("created" => "no"));


        $this->sendOutput(
            json_encode($responseArr[0]),
            array('Content-Type: application/json', 'HTTP/1.1 201 OK', 'Access-Control-Allow-Origin: *')
        );
    }


    /**
     * "/image/features" Endpoint - Get list of users
     */

    public function featuresAction()
    {
        try {
            $imageModel = new ImageModel();
            $requestMethod = $_SERVER["REQUEST_METHOD"];
            switch (strtoupper($requestMethod)) {
                case 'PUT': {
                    $this->newImageActive($imageModel);

                    break;
                }
                case 'POST': {
                    $this->updateImageActive($imageModel);
                    break;
                }
                case 'GET':
                default: {
                    $this->fetchImages($imageModel);
                    break;
                }
            }
        } catch (Error $error) {
            echo $error;
        }

    }
}
