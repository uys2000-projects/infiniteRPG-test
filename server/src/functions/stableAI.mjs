import axios from "axios";
import FormData from "form-data";
import fs from "node:fs";

/**
 *
 * @param {string} prompt
 * @returns
 */
export default async function runImage(prompt) {
  console.log(prompt);
  const formData = {
    prompt: prompt.join(", "),
    output_format: "jpeg",
  };

  const response = await axios.postForm(
    `https://api.stability.ai/v2beta/stable-image/generate/sd3`,
    axios.toFormData(formData, new FormData()),
    {
      validateStatus: undefined,
      responseType: "arraybuffer",
      headers: {
        Authorization: `Bearer ${process.env.API_STABILITYAI}`,
        Accept: "image/*",
      },
    }
  );
  console.log(`Bearer ${process.env.API_STABILITYAI}`);
  console.log(response.status);
  fs.writeFileSync("./lighthouse.jpeg", Buffer.from(response.data));
  return Buffer.from(response.data);
}
