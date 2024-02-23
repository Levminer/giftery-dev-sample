import { json } from "@sveltejs/kit"

/**
 * Perform a GET request to https://platform.giftery.studio/open/random-color/{number} using the number of the square
 * Return if response is a color HEX code (string)
 * Return red in all other cases
 */
export const GET = async ({ url }) => {
	const baseURL = "https://platform.giftery.studio/open/random-color/"
	const searchParams = new URLSearchParams(url.search)

    // check if number is a valid number
	const number: number | null = searchParams.get("number") ? parseInt(searchParams.get("number") as string) : null

	const response = await fetch(`${baseURL}${number}`)

	if (response.ok) {
		const data = await response.text()

        // check if response is a color HEX code
		if (data.startsWith("#")) {
			return json({ color: data })
		}
	}

    // return red if response is not a color HEX code or if the request failed
	return json({ color: "#ff0000" })
}
