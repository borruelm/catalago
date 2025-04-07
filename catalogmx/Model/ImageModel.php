<?php
require_once PROJECT_ROOT_PATH . "/Model/Database.php";

class ImageModel extends Database
{

    public function getAllActiveImages($articleId): array{
        return $this->select("SELECT name, content FROM article_images where active = 1 and article_id = {$articleId} ORDER BY id asc", []);        
    }

    public function getAllImages($articleId): array{
        return $this->select("SELECT * FROM article_images where article_id = {$articleId} ORDER BY id asc", []);        
    }

    public function updateImageStatus($id, $activeUpd): bool{
        return $this->executeQry("UPDATE article_images SET active = {$activeUpd} WHERE id={$id}", []);
    }

    public function createImage($articleId, $imgName, $imgContent): bool{
        return $this->executeQry("INSERT INTO article_images( article_id, name, content, created_by, active) values ({$articleId}, '{$imgName}', '', 1,1)", []);
    }
}
