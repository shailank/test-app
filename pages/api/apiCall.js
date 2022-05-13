let APIENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT;

  export function ApiCall(url, params) {
    const request = fetch(APIENDPOINT+url, {
        body: JSON.stringify(params),
        headers: {
          'Content-Type': 'application/json',
        },
        method: "POST",
      })
    return request;

  }

