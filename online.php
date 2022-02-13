<?php require_once "SampQueryAPI.php"; 
$server = new SampQueryAPI('45.9.73.204', '1131'); // подключаемся к серверу if ($server->isOnline()) {
  $info = $server->getInfo(); // если сервер онлайн - запрашиваем информацию о нем
  echo "Hostname: " . $info['hostname'] . "
";
  echo "Players: " . $info['players'] . " / " . $info['maxplayers'];
}