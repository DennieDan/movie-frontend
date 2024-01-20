export async function get(url: string) {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Fail to fetch data.");
  }

  return response;

  // const data = (await response.json()) as unknown; // more type-safe than any, this time unknown type, but when fetched we must know -> use as
  // return data;
}
