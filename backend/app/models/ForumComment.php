<?php
class ForumComment extends Model
{
    protected $table = 'forum_comments';
    protected $primaryKey = 'id';
    protected $allowedFields = ['answer_id', 'user_id', 'content', 'created_at'];
}