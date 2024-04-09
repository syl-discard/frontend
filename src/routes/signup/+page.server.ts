import { redirect } from '@sveltejs/kit';
import { OAuth2Client } from 'google-auth-library';
import { env } from '$env/dynamic/private';
export const actions = {
	OAuth2: async ({}) => {
		const redirectURL = 'http://localhost:5173/oauth';

		const oAuth2Client: OAuth2Client = new OAuth2Client(
			env.GOOGLE_CLIENT_ID,
			env.GOOGLE_CLIENT_SECRET,
			redirectURL
		);

		const authorizeURL = oAuth2Client.generateAuthUrl({
			access_type: 'offline',
			scope: ['https://www.googleapis.com/auth/userinfo.profile openid'],
			prompt: 'consent'
		});

		throw redirect(302, authorizeURL);
	}
};
