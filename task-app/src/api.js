const BASE_URL = "http://localhost:8080";

// Upload assignment pdf
export const uploadFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

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
