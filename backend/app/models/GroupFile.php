<?php
class GroupFile extends Model
{
    protected $table = 'group_files';
    protected $primary_key = 'id';

    // Optional: insert a new file and return its ID
    public function addFile($data)
    {
        return $this->insert($data); // LavaLust insert() returns the inserted ID
    }
}
