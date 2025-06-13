<?php
require 'db.php';

if ($conn->ping()) {
    echo "Conexión exitosa a la base de datos";
} else {
    echo "Error en la conexión: " . $conn->error;
}
