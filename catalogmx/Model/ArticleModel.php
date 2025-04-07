<?php
require_once PROJECT_ROOT_PATH . "/Model/Database.php";

class ArticleModel extends Database
{
    public function getAllArticles(): array{
        return $this->select("SELECT * FROM articles where active = 1 ORDER BY id asc", []);        
    }

    public function getArticleDetails($articleId): array{
        return $this->select("SELECT * FROM articles where active = 1 and id ='{$articleId}'", []);        
    }

    public function getArticleImages($article_id): array{
        return $this->select("SELECT * FROM article_images where active = 1  and article_id = {$article_id} ORDER BY id asc", 
        []);        
    }

    public function getArticles($id): array{
        return [];
        
    }

    public function deleteArticles($id): bool
    {
        return $this->executeQry("UPDATE articles SET active = 0 WHERE id={$id}", []);
    }

    public function restoreArticles($id): bool{
        return false;
    }

}