<?php
$botToken = "5724701539:AAGzkhFn_yotffCNKQn2smt3Lt0TbpSB_lY";
$chatID = "623165387";

$message = $_POST['text'];

$url = "https://api.telegram.org/bot$botToken/sendMessage";
$data = array(
  'chat_id' => $chatID,
  'text' => $message
);

$options = array(
  'http' => array(
    'method' => 'POST',
    'header' => 'Content-Type: application/x-www-form-urlencoded',
    'content' => http_build_query($data)
  )
);

$context = stream_context_create($options);
$result = file_get_contents($url, false, $context);

// if ($result === false) {
//   echo "error";
// } else {
//   echo "success";
// }

?>
