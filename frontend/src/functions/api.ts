const baseURL = process.env.NEXT_PUBLIC_API_URL;

export async function httpGet(url: string) {
  const normalizedUrl = urlNormalize(`${baseURL}/${url}`);
  console.log(normalizedUrl);
  const response = await fetch(normalizedUrl);
  return response.json();
}

export async function httpPost(url: string, data: any) {
  const normalizedUrl = urlNormalize(`${baseURL}/${url}`);
  console.log(normalizedUrl);
  const response = await fetch(normalizedUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function httpPut(url: string, data: any) {
  const normalizedUrl = urlNormalize(`${baseURL}/${url}`);
  console.log(normalizedUrl);
  const response = await fetch(normalizedUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function httpDelete(url: string) {
  const normalizedUrl = urlNormalize(`${baseURL}/${url}`);
  console.log(normalizedUrl);
  const response = await fetch(normalizedUrl, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`Failed to delete resource at ${normalizedUrl}`);
  }
  return response.json();
}

function urlNormalize(url: string) {
  const protocolo = url.split("://")[0];
  const restante = url.split("://")[1];
  return `${protocolo}://${restante.replaceAll(/\/{2,}/g, "/")}`;
}
