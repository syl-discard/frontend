import { type Actions } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export const actions: Actions = {
	sendMessage: async ({ request }) => {
		const data: FormData = await request.formData();
		const message = {
			user_id: data.get('userid'),
			server_id: data.get('serverid'),
			message: data.get('message')
		};

		const response: Response = await fetch(env.API_URL + '/message', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(message)
		});

		const json = await response.json();

		if (!response.ok) {
			return failedResponse(json, response.status);
		}

		return successfulResponse(json, response.status);
	},
	getMessage: async ({ request }) => {
		const data: FormData = await request.formData();
		const id = data.get('messageid');

		const response: Response = await fetch(env.API_URL + '/message/' + id, {
			method: 'GET'
		});

		const json = await response.json();

		if (!response.ok) {
			return failedResponse(json, response.status);
		}

		return successfulResponse(json, response.status);
	},
	getMessagesByUser: async ({ request }) => {
		const data: FormData = await request.formData();
		const id = data.get('userid');

		const response: Response = await fetch(
			env.API_URL + '/message/user/' + id,
			{
				method: 'GET'
			}
		);

		const json = await response.json();

		if (!response.ok) {
			return failedResponse(json, response.status);
		}

		return successfulResponse(json, response.status);
	},
	deleteUser: async ({ request }) => {
		const data: FormData = await request.formData();
		const id = data.get('userid');

		const response: Response = await fetch(env.API_URL + '/user/delete', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id: id })
		});

		const json = await response.json();

		if (!response.ok) {
			return failedResponse(json, response.status);
		}

		return successfulResponse(json, response.status);
	}
};

const successfulResponse = (json: unknown, status: number): CustomResponse => {
	return {
		success: true,
		status: status,
		body: JSON.stringify(json)
	};
};

const failedResponse = (json: unknown, status: number): CustomResponse => {
	return {
		success: false,
		status: status,
		body: JSON.stringify(json)
	};
};

type CustomResponse = {
	success: boolean;
	status: number;
	body: string;
};
