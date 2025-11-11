<?php
defined('PREVENT_DIRECT_ACCESS') OR exit('No direct script access allowed');

require_once __DIR__ . '/../../vendor/autoload.php';



use Google\Client;
use Google\Service\Classroom;

class GoogleClient
{
    public $client;

    public function __construct()
    {
        $this->client = new Client();
        $this->client->setApplicationName('Your App Name');
        $this->client->setScopes([Classroom::CLASSROOM_COURSES]);
        // Set credentials, etc.
        $this->client->setAuthConfig(__DIR__ . '/../../credentials.json'); 
    }
public function getClient() {
    return $this->client;
}

    public function createCourse($title)
    {
        $service = new Classroom($this->client);
        $course = new \Google\Service\Classroom\Course([
            'name' => $title,
            'section' => 'Section 1',
            'ownerId' => 'me',
            'courseState' => 'PROVISIONED'
        ]);

        $course = $service->courses->create($course);
        return $course->alternateLink;
    }
}
