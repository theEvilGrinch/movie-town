<!DOCTYPE html>
<html lang="ru" prefix="og: http://ogp.me/ns#" id="top">
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="HandheldFriendly" content="true">
	{headers}
	<meta name="theme-color" content="#ffffff">
	<meta name="msapplication-TileColor" content="#00aba9">
	<link rel="manifest" href="https://movie-town.ru/site.webmanifest">
	<link rel="icon" type="image/x-icon" href="https://movie-town.ru/favicon.ico">
	<link rel="icon" type="image/png" sizes="16x16" href="https://movie-town.ru/favicon-16x16.png">
	<link rel="icon" type="image/png" sizes="32x32" href="https://movie-town.ru/favicon-32x32.png">
	<link rel="apple-touch-icon" sizes="180x180" href="https://movie-town.ru/apple-touch-icon.png">
	<link rel="mask-icon" href="https://movie-town.ru/safari-pinned-tab.svg" color="#5bbad5">
	<link rel="preload" href="{THEME}/style.css" as="style">
	<link rel="preload" href="{THEME}/js/script.js" as="script">
	<link rel="preload" href="{THEME}/fonts/opensans.woff2" as="font" type="font/woff2" crossorigin="anonymous">
	<link rel="preload" href="{THEME}/fonts/opensanssemibold.woff2" as="font" type="font/woff2" crossorigin="anonymous">
	<link rel="preload" href="{THEME}/fonts/fontawesome.woff2" as="font" type="font/woff2" crossorigin="anonymous">
	<link rel="stylesheet" href="{THEME}/style.css">
	<script>
		(function (m, e, t, r, i, k, a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
						m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
		(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
		ym(56180761, "init", {
			clickmap: false,
			accurateTrackBounce: true
		});
	</script>
</head>

<body>
[news=13,14,21,24,27,33,36,42,62]
{include file="/engine/modules/rknBlock.php"}
[/news]

<header class="main-header">
	[available=cat]
	<h1>{category-title}</h1>
	[/available]

	[available=main|tags]
	<h1>Онлайн кинотеатр Мувитаун</h1>
	[/available]

	<a rel="nofollow" href="/" class="main-header__logo-link" title="Перейти на главную страницу"> <span>На главную</span> </a>

	<form id="q_search" method="post">
		<div class="q_search">
			<label for="story">Поиск по сайту</label> <input id="story" name="story" placeholder="Поиск по сайту..." type="search">
			<button class="q_search_btn" type="submit" title="Найти">
				<span class="title_hide">Найти</span>
			</button>
		</div>
		<input type="hidden" name="do" value="search"> <input type="hidden" name="subaction" value="search">
	</form>

	<nav class="main-header__menu">
		<ul>
			<li><a href="https://movie-town.ru/filmy/">Фильмы</a></li>
			<li><a href="https://movie-town.ru/serialy/">Сериалы</a></li>
			<li><a href="https://movie-town.ru/multfilmy/">Мультфильмы</a></li>
			<li><a href="https://movie-town.ru/novinki/">Новинки</a></li>
		</ul>
	</nav>

	{include file="main-header__menu-mobile.tpl"}

	{include file="main-header__seo-text.tpl"}

	[available=main|cat|tags]
	<section class="main-header__slider">
		<h2>Новинки кино</h2>
		<!--noindex-->
		<span class="main-header__slider-arrow-left" title="Предыдущий слайд"></span> <span class="main-header__slider-arrow-right" title="Следующий слайд"></span>
		<!--/noindex-->
		<ul class="main-header__slider-wrapper">
			{custom category="9" template="main-header__slider" order="date" sort="desc" from="0" limit="12" cache="yes"}
		</ul>
	</section>
	[/available]
</header>

<div class="main-content">
	<main>
		{info}
		<!--noindex-->
		<div class="main__a-ads-wrapper">
			<iframe data-aa="1266774" src="//acceptable.a-ads.com/1266774?size=Adaptive&title_color=31a8cb&link_color=31a8cb" scrolling="no" allowtransparency="true"></iframe>
		</div>
		<!--/noindex-->    [available=main]
		<h2>Последние добавленные на сайте</h2>
		[/available]

		[available=cat]

		[not-category=9]
		<h2>Категория {category-title}</h2>
		[/not-category]

		[category=9]
		<h2>Последние добавленные новинки</h2>
		[/category]

		[/available]

		[not-available=main|tags]
		{speedbar}
		[/not-available]

		[tags=биография]<h2>Жанр биография</h2>[/tags] [tags=боевик]<h2>Жанр боевик</h2>[/tags] [tags=детектив]<h2>Жанр детектив</h2>[/tags] [tags=драма]<h2>Жанр драма</h2>[/tags] [tags=комедия]<h2>Жанр комедия</h2>[/tags] [tags=приключения]<h2>Жанр приключения</h2>[/tags] [tags=триллер]<h2>Жанр триллер</h2>[/tags] [tags=ужасы]<h2>Жанр ужасы</h2>[/tags] [tags=фантастика]<h2>Жанр фантастика</h2>[/tags]

		[not-available=static|search|showfull]
		<!--noindex-->
		<div class="main-content__sort-wrapper">
			<span class="main-content__sort-label">Тип сортировки (Фильтр)</span> [sort]{sort}[/sort]
		</div>
		<!--/noindex-->		[/not-available]
		{content}
	</main>

	<!--noindex-->
	<aside class="main-content__aside">

		<section class="main-content__aside-genre">
			<h2>Жанры</h2>
			{tags}
		</section>

		<!--noindex-->
		<div class="main-content__aside_a-ads-300-wrapper">
			<iframe data-aa="1266779" src="//ad.a-ads.com/1266779?size=300x250&title_color=31a8cb&link_color=31a8cb" scrolling="no" allowtransparency="true"></iframe>
		</div>
		<!--/noindex-->

		<section class="main-content__aside-popular">
			<h2>Самые популярные</h2>
			<ul>
				{custom template="main__aside-popular" order="reads" from="0" limit="7" cache="yes"}
			</ul>
		</section>

	</aside>
	<!--/noindex-->
</div>

<footer>
	<ul class="main-footer__links-list">
		<li>
			<a rel="nofollow" target="_blank" href="https://movie-town.ru/informacija-dlja-pravoobladatelej.html">Правообладателям</a>
		</li>
		<li>
			<a rel="nofollow" href="mailto:mail@movie-town.ru">Контакты</a>
		</li>
	</ul>
	[not-available=static]
	<div class="ya-share2" data-services="collections,vkontakte,facebook,odnoklassniki,moimir,twitter,reddit,linkedin,telegram" data-size="m"></div>
	[/not-available]
	<p>
		2019 Онлайн кинотеатр Киногородок (Мувитаун) | movie-town.ru </p>
	<a rel="nofollow" href="#top" class="go-to-top"></a>
</footer>

{jsfiles}
{AJAX}

<script src="{THEME}/js/script.js"></script>

[available=showfull]
<script src="{THEME}/js/lightbox.js"></script>
<script src="{THEME}/js/yohoho.js"></script>
[/available]
</body>
</html>