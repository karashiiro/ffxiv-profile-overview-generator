import React, { useState, useEffect } from "react";
import { characterSearch, profile } from "../../lodestone";

export function ProfilePortrait(props: ProfilePortraitProps) {
	const [portraitLink, setPortraitLink] = useState("");

	useEffect(() => {
		async function fetchPortrait() {
			const results = await characterSearch(props.name, props.world);
			const characterInfo = results.find(
				(result) =>
					result.name.toLowerCase() === props.name.toLowerCase() &&
					result.world.toLowerCase() === props.world.toLowerCase(),
			);
			if (characterInfo == null) throw new Error("Character not found.");

			const characterProfile = await profile(characterInfo.profileId);
			setPortraitLink(characterProfile.portrait);
		}
		fetchPortrait();
	});

	return <img src={portraitLink} alt="" />;
}

export interface ProfilePortraitProps {
	name: string;
	world: string;
}
