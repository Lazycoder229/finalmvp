<?php
class AnnouncementController extends Controller {
    public function __construct() {
        parent::__construct();
        $this->call->model("AnnouncementModel");

        // CORS headers
        header("Access-Control-Allow-Origin: http://localhost:5173");
        header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
        header("Content-Type: application/json");

        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            http_response_code(200);
            exit();
        }
    }

    // GET /api/announcements?role=student
    public function index() {
        $role = $_GET['role'] ?? null;
        try {
            $announcements = $this->AnnouncementModel->getAllByRole($role);
            echo json_encode($announcements);
        } catch (\Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    // POST /api/announcements
    public function create() {
        $input = json_decode(file_get_contents('php://input'), true);

        if (!$input || empty($input['created_by']) || empty($input['title']) || empty($input['description'])) {
            http_response_code(400);
            echo json_encode(['error' => 'created_by, title, and description are required']);
            return;
        }

        // Optional fields
        $data = [
            'created_by'   => $input['created_by'],
            'title'        => $input['title'],
            'description'  => $input['description'],
            'target_role'  => $input['target_role'] ?? null,
            'expiry_date'  => $input['expiry_date'] ?? null,
            'created_at'   => date('Y-m-d H:i:s')
        ];

        $id = $this->AnnouncementModel->insertAnnouncement($data);

        if ($id) {
            echo json_encode(['message' => 'Announcement created successfully', 'id' => $id]);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to create announcement']);
        }
    }

    // DELETE /api/announcements/:id
    public function delete($id) {
        $result = $this->AnnouncementModel->delete($id);
        if ($result) {
            echo json_encode(['message' => 'Announcement deleted successfully']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to delete announcement']);
        }
    }
}
