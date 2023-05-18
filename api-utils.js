export async function getData(url) {
  try {
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    const data = responseData.data;
    return data;
  } catch (error) {
    console.error(error);
  }
}
