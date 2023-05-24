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

export async function postData(url, postData) {
  try {
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    const responseData = await response.json();
    const data = responseData.data;
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function putData(url, putData) {
  try {
    const response = await fetch(url, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(putData),
    });

    const responseData = await response.json();
    const data = responseData.data;
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteData(url) {
  try {
    const response = await fetch(url, {
      method: "DELETE",
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
