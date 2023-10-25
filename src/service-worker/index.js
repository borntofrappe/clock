/// <reference types="@sveltejs/kit" />
/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />
import { build, files, version } from '$service-worker';

const sw = /** @type {ServiceWorkerGlobalScope} */ (/** @type {unknown} */ (self));

const CACHE = `cache-${version}`;

const ASSETS = ['/', ...build, ...files];

sw.addEventListener('install', (event) => {
	const addFilesToCache = async () => {
		const cache = await caches.open(CACHE);
		await cache.addAll(ASSETS);
	};

	event.waitUntil(addFilesToCache());
});

sw.addEventListener('activate', (event) => {
	const deleteOldCaches = async () => {
		for (const key of await caches.keys()) {
			if (key !== CACHE) {
				await caches.delete(key);
			}
		}
	};

	event.waitUntil(deleteOldCaches());
});

sw.addEventListener('fetch', (event) => {
	if (event.request.method !== 'GET') return;

	const respond = async () => {
		const cachedResponse = await caches.match(event.request);

		if (cachedResponse === undefined) {
			const response = await fetch(event.request);
			return response;
		} else {
			return cachedResponse;
		}
	};

	event.respondWith(respond());
});
