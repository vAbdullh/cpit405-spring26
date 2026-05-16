<?php
// Student ID: 2236079
// Student Name: Abdullah Alhalawani

echo "<h1>Lab Assessment</h1>";

function power($base, $exponent)
{
    if ($exponent == 0) {
        return 1;
    }
    $result = 1;
    for ($i = 0; $i < $exponent; $i++) {
        $result *= $base;
    }
    return $result;
}

echo "<h2>1. Power Function Demo</h2>";
echo "<p>2^3 = " . power(2, 3) . "</p>";
echo "<p>5^4 = " . power(5, 4) . "</p>";

echo "<h2>2. Diagram Demo Code</h2>";
echo "<p><em>Diagram image was not provided, but demo code would go here.</em></p>";

echo "<h2>3. Retrieve Database Names</h2>";
$host = 'db';
$username = 'root';
$password = 'root_password';

try {

    $conn = new PDO("mysql:host=$host", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $conn->query("SHOW DATABASES;");
    $databases = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo "<ul>";
    foreach ($databases as $row) {
        echo "<li>" . htmlspecialchars($row['Database']) . "</li>";
    }
    echo "</ul>";

} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage() . "<br>";
    echo "<em>Make sure the database container is running.</em>";
}
?>