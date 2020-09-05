import cheerio from "cheerio";

export function profile(id: number): Promise<Profile> {
	return new Promise((resolve) => {
		fetch(`https://eu.finalfantasyxiv.com/lodestone/character/${id}/`)
			.then((data) => data.text())
			.then((html) => {
				const $ = cheerio.load(html);

				resolve({
					portrait: $(".character__detail__image").find(".js__image_popup").attr("href")!,
				});
			});
	});
}

export interface Profile {
	portrait: string;
}
