<?php

require_once '../config/db.php';

class AuthController {
    private $conn;

    public function __construct() {
        $database = new Database();
        $this->conn = $database->getConnection();
    }

    public function login($nombre) {
        session_start();

        $nombre = trim($nombre);

        // Buscar si ya existe un jugador con ese nombre
        $query = "SELECT * FROM players WHERE Nombre = ? LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("s", $nombre);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $user = $result->fetch_assoc();
            $_SESSION['user_id'] = $user['player_id'];
            $_SESSION['usuario'] = $user['Nombre'];
            header("Location: ../dashboard/index.php");
            exit();
        } else {
            // Si no existe, se registra automáticamente
            $query = "INSERT INTO players (Nombre, activa) VALUES (?, 1)";
            $stmt = $this->conn->prepare($query);
            $stmt->bind_param("s", $nombre);
            $stmt->execute();

            if ($stmt->affected_rows > 0) {
                $userId = $this->conn->insert_id;
                $_SESSION['user_id'] = $userId;
                $_SESSION['usuario'] = $nombre;
                header("Location: ../dashboard/index.php");
                exit();
            } else {
                $_SESSION['mensaje'] = 'error_crear_usuario';
                header("Location: ../index.php");
                exit();
            }
        }
    }
}
if (isset($_GET['logout'])) {
    session_start();
    session_destroy();
    header("Location: ../index.php");
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['nombre']) && !empty(trim($_POST['nombre']))) {
        $authController = new AuthController();
        $authController->login($_POST['nombre']);
    } else {
        session_start();
        $_SESSION['mensaje'] = 'error_nombre_vacio';
        header("Location: ../index.php");
        exit();
    }
} else {
    header("Location: ../index.php");
    exit();
}