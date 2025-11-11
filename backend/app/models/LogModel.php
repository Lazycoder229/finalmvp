<?php

class LogModel extends Model
{
    protected $table = 'system_logs';
    protected $primaryKey = 'id';
  protected $fillable = ['user_id', 'action', 'details', 'status', 'ip_address', 'created_at'];

}
