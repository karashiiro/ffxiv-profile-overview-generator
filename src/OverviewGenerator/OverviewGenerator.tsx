import React from "react";
import { ProfilePortrait } from "./ProfilePortrait";
import { useParams } from "react-router-dom";

export function OverviewGenerator() {
	const { world, characterName } = useParams();

	return (
		<ProfilePortrait
			{...{
				name: characterName,
				world,
			}}
		/>
	);
}
