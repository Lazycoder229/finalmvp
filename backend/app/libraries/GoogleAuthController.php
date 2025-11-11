<?php

use Google\Client;
use Google\Service\Classroom;
require_once __DIR__ . '/../../vendor/autoload.php';

class GoogleAuthController extends Controller
{
    public $client;

    public function __construct()
    {
        if (!session_id()) session_start();

        // Initialize Google Client via your library
        $googleClientLib = new GoogleClient(); // LavaLust library wrapper
        $this->client = $googleClientLib->getClient();

        // Set redirect URI (matches Google Cloud)
        $this->client->setRedirectUri('http://localhost:3000/auth/google/callback');

        // Add required scopes
        $this->client->addScope([
            Classroom::CLASSROOM_COURSES,
            Classroom::CLASSROOM_ROSTERS,
            Classroom::CLASSROOM_COURSEWORK_STUDENTS
        ]);

        $this->client->setAccessType('offline');
    }
public function redirect() {
    // Store pending session data in PHP session
    if (!session_id()) session_start();

    if (isset($_GET['title'], $_GET['session_date'], $_GET['duration'], $_GET['user_id'])) {
        $_SESSION['pending_session'] = [
            'title' => $_GET['title'],
            'session_date' => $_GET['session_date'],
            'duration' => $_GET['duration'],
            'user_id' => $_GET['user_id']
        ];
    }

    $authUrl = $this->client->createAuthUrl();
    header("Location: $authUrl"); // Browser follows redirect
    exit;
}

  public function callback() {
    if (!session_id()) session_start();
    
    $token = $this->client->fetchAccessTokenWithAuthCode($_GET['code']);
    $_SESSION['google_token'] = $token;

    // Now save session data
    if (isset($_SESSION['pending_session'])) {
        $sessionData = $_SESSION['pending_session'];
        // Save $sessionData to your database
        unset($_SESSION['pending_session']);
    }

    header("Location: /dashboard"); // Back to React
    exit;
}


    /**
     * Create a Google Classroom course
     * @param string $title
     * @return string Link to Classroom
     * @throws Exception
     */
    public function createCourse($title)
    {
        if (!isset($_SESSION['google_token'])) {
            throw new \Exception("Google token not found. Authenticate first.");
        }

        $this->client->setAccessToken($_SESSION['google_token']);
        $service = new Classroom($this->client);

        // Create course
        $course = new \Google\Service\Classroom\Course([
            'name' => $title,
            'section' => 'PeerConnect Mentoring',
            'description' => 'Mentor session',
            'room' => 'Virtual'
        ]);

        $createdCourse = $service->courses->create($course);

        return "https://classroom.google.com/c/" . $createdCourse->id;
    }
}
