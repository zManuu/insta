import { logger, store, router } from '@/main'
import config from '@shared/config.json'

async function fetch<T>(
  httpMethod: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  urlParams?: string[],
  body?: BodyInit
): Promise<T | undefined> {

  store.commit('setFetching', true)
  const fullUrl = `http://${config.webserver.host}:${config.webserver.port}/${url}${urlParams ? '/' + urlParams.join('/') : ''}`

  logger.log('Fetching $0', fullUrl)

  const req = await window.fetch(fullUrl, {
    method: httpMethod,
    body: body
  })

  store.commit('setFetching', false)

  if (!req.ok) {
    logger.log('Fetch errored: url: $0, status: $1', fullUrl, req.status)

    if (req.status == 403 && url != 'login') {
      // user isn't authenticated
      router.push('/login')
      return undefined
    }

    return undefined
  }

  // Check the content type of the response.
  const contentType = req.headers.get('Content-Type')
  if (contentType && contentType.includes('application/json')) {
    // If the response is JSON, parse it as such.
    const res = await req.json()
    return res as T
  } else {
    // Otherwise, return the response body as plain text.
    const res = await req.text()
    return res as unknown as T
  }
}



export {
  fetch
}