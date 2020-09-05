import cheerio from "cheerio";

/**
 * Search for a FFXIV character on the Lodestone.
 * @param name The name of the character to search for.
 * @param world The world name of the character to search for.
 */
export function characterSearch(name: string, world: string): Promise<CharacterSearchResult[]> {
	return new Promise((resolve) => {
		const results: CharacterSearchResult[] = [];

		fetch(getSearchLink(name.replace(" ", "+"), world))
			.then((data) => data.text())
			.then((html) => {
				const $ = cheerio.load(html);
				$(".entry__link").each((i, element) => {
					const worldDc = $(element)
						.find(".entry__world")
						.text()
						.replace(/[()]/gm, "")
						.split(/\s+/gm);
					const world = worldDc[0];
					const dataCenter = worldDc[1];

					const profileLink = $(element).attr("href")!;
					const profileId = parseInt(
						profileLink.substring("/lodestone/character/".length, profileLink.lastIndexOf("/")),
					);

					results[i] = {
						name: $(element).find(".entry__name").text(),
						world,
						dataCenter,
						profileImage: $(element).find(".entry__chara__face img").attr("src")!,
						profileLink,
						profileId,
						lang: $(element).find(".entry__chara__lang").text(),
					};
				});

				resolve(results);
			});
	});
}

export interface CharacterSearchResult {
	name: string;
	world: string;
	dataCenter: string;
	profileImage: string;
	profileLink: string;
	profileId: number;
	lang: string;
}

/**
 * Search for a character on the Lodestone. All three regions' websites are on the same Japanese server, so it doesn't matter which link we template into.
 * @param name The character name to search for.
 * @param world The world of the character.
 */
function getSearchLink(name: string, world: string) {
	return `https://na.finalfantasyxiv.com/lodestone/character/?q=${name}&worldname=${world}&classjob=&race_tribe=&blog_lang=ja&blog_lang=en&blog_lang=de&blog_lang=fr&order=`;
}
