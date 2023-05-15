export async function getAllPeople() {
  const url = "http://localhost:5206/Person/GetAll";

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

export async function getSchools() {
  const url = "http://localhost:5206/School/All";

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
