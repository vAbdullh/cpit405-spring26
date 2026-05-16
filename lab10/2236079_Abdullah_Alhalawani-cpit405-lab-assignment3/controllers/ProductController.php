<?php
// Student ID: 2236079
// Student Name: Abdullah Alhalawani

require_once '../models/Database.php';
require_once '../models/ProductModel.php';

$database = new Database();
$db = $database->getConnection();
$product = new ProductModel($db);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $action = isset($_POST['action']) ? $_POST['action'] : '';

    if ($action == 'create') {
        $product->name = $_POST['name'];
        $product->description = $_POST['description'];
        $product->price = $_POST['price'];

        if ($product->create()) {
            header("Location: ../views/index.php?msg=ProductCreated");
            exit();
        } else {
            header("Location: ../views/index.php?msg=ErrorCreating");
            exit();
        }
    } elseif ($action == 'delete') {
        $product->id = $_POST['id'];

        if ($product->delete()) {
            header("Location: ../views/index.php?msg=ProductDeleted");
            exit();
        } else {
            header("Location: ../views/index.php?msg=ErrorDeleting");
            exit();
        }
    }
} else {
    header("Location: ../views/index.php");
    exit();
}
?>