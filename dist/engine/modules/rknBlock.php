<?php
	$user_ip = $_SERVER['REMOTE_ADDR'];
	$user_info = file_get_contents("http://api.ipinfodb.com/v3/ip-country/?key=81009420a8715f50a56f3c0f907b9096d8ace8cce7fd6457f2205a41e3d2cebe&format=json&ip=".$user_ip);
	$user_info = json_decode($user_info);
	$user_country = $user_info->countryCode;
	if ($user_country === "RU") {
	header('Location: https://movie-town.ru/zapret-dostupa.html');
	exit();
}
?>