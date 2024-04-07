import { redirect } from '@sveltejs/kit';
import { OAuth2Client } from 'google-auth-library';
import { env } from '$env/dynamic/private';

async function getUserData(accessToken: string) {
	const response = await fetch(
		`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`
	);
	const data = await response.json();
	console.log('data', data);
}

export const GET = async ({ url }: { url: URL }) => {
	const redirectURL = 'http://localhost:5173/oauth';
	const code = (await url.searchParams.get('code')) ?? '';

	try {
		const oAuth2Client = new OAuth2Client(
			env.GOOGLE_CLIENT_ID,
			env.GOOGLE_CLIENT_SECRET,
			redirectURL
		);

		const response = await oAuth2Client.getToken(code);
		oAuth2Client.setCredentials(response.tokens);
		console.info('Tokens acquired.');

		const user = oAuth2Client.credentials;
		console.log('credentials', user);

		await getUserData(user.access_token ?? '');
	} catch (error) {
		console.error('Error logging in with Google', error);
	}

	throw redirect(303, '/');
};
