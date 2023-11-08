const BASE_URL = "http://localhost:8080";

// Upload assignment pdf
export const uploadFile = async (file, startDate, endDate) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("start_date", startDate);
  formData.append("end_date", endDate);

    const response = await fetch(`${BASE_URL}/pdf2break`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("File upload failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Create event
export const createEvent = async (events) => {
  try {
    console.log(events)

    const response = await fetch(`${BASE_URL}/createEvent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ events }),
    });

    if (!response.ok) {
      throw new Error("Failed to create event");
    }

    const data = await response.json();

    alert(data['msg'])

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// TEST
// export const testBackend = async () => {
//     try {
//       const response = await fetch(`${BASE_URL}/test`);
//       if (!response.ok) {
//         throw new Error('Test request failed');
//       }
//       const data = await response.json();
//       return data.msg;
//     } catch (error) {
//       console.error(error);
//       throw error;
//     }
//   };
