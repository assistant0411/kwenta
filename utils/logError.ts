import * as Sentry from '@sentry/browser';

export default function logError(err: Error): void {
	// eslint-disable-next-line no-console
	console.error(err);
	Sentry.captureException(err);
}
