/**
 * Created by maiquel on 01/08/16.
 */

(function () {
	"use strict";

	$(document).ready(function () {

		var lastId,
			//pega o header
			topMenu = $(".header"),

			//pega a altura do header
			topMenuHeight = topMenu.outerHeight() + 15,

			//pega os itens de menu dentro do header
			menuItems = topMenu.find("a"),

			// Retorna os elementos ancora vinculados a cada item do menu
			scrollItems = menuItems.map(function () {
				var item = $($(this).attr("href"));
				if (item.length) {
					return item;
				}
			});


		// Atribui evento onclick a cada item da lista
		menuItems.click(function (e) {

			//pega o valor do atributo (id do href)
			var href = $(this).attr("href"),

				//verifica se é o primeiro do topo
				//se for o primeiro: define o offset como 0 (topo)
				//se for outro item: define o offset com a distância do topo descontando o header
				offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;

			//anima o baguio
			$('html, body').stop().animate({
				scrollTop: offsetTop
			}, 300);
			e.preventDefault();
		});

		// Seta os botões do menu de acordo com a posição do scroll
		$(window).scroll(function () {
			// Get container scroll position
			var fromTop = $(this).scrollTop() + topMenuHeight;

			// Get id of current scroll item
			var cur = scrollItems.map(function () {
				if ($(this).offset().top < fromTop)
					return this;
			});
			// Get the id of the current element
			cur = cur[cur.length - 1];
			var id = cur && cur.length ? cur[0].id : "";

			if (lastId !== id) {
				lastId = id;
				// Set/remove active class
				menuItems
					.parent().removeClass("active")
					.end().filter("[href='#" + id + "']").parent().addClass("active");
			}
		});
	});
}());