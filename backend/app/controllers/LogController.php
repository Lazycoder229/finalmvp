<?php

class LogController extends Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->call->model("LogModel");
    }

    /**
     * Add a new log entry
     * @param int|null $user_id
     * @param string $action
     * @param string $details
     * @param string $status 'success' | 'error'
     */
public function add()
{
    $input = json_decode(file_get_contents('php://input'), true) ?? $_POST;

    $user_id = $input['user_id'] ?? null;
    $action  = $input['action'] ?? '';
    $details = $input['details'] ?? '';
    $status  = $input['status'] ?? 'success';

    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';

    $this->LogModel->insert([
        'user_id'    => $user_id,
        'action'     => $action,
        'details'    => $details,
        'status'     => $status,
        'ip_address' => $ip,
        'created_at' => date('Y-m-d H:i:s'),
    ]);

    echo json_encode(['message' => 'Log created successfully']);
}

    /**
     * Get all logs
     */
    public function index()
    {
        $logs = $this->LogModel->all();
        echo json_encode($logs);
    }

    /**
     * Get a single log by ID
     * @param int $id
     */
    public function get($id)
    {
        $log = $this->LogModel->find($id);
        echo json_encode($log);
    }

    /**
     * Get logs by user
     * @param int $user_id
     */
    public function byUser($user_id)
    {
        $logs = $this->LogModel->filter(['user_id' => $user_id])->get_all();
        echo json_encode($logs);
    }
}
