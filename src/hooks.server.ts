export const handle = async ({
	event,
	resolve
}: {
	event: unknown;
	resolve: Function;
}) => {
	const response = await resolve(event);
	return response;
};
