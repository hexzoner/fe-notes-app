const imageUrl = `https://gen-ai-wbs-consumer-api.onrender.com/api/v1/images/generations`;
const AI_MODE = "production";

export default function generateImageAI(promptToGenerate, setImage, setGenerating, setGeneratingLocal) {
  return new Promise((resolve, reject) => {
    setGenerating(true);
    setGeneratingLocal(true);
    const requestBody = {
      prompt: promptToGenerate,
      n: 1,
      size: "256x256",
      // size: "278x192",
    };

    //   setGenerating(true);
    fetch(imageUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "c9y7k5aewfsbd7skbofped",
        mode: AI_MODE,
        provider: "open-ai",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        //   setGenerating(false);
        //   console.log(response);
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        //   console.log("Generated Image URLs:", data[0].url);
        //   setGeneratedImage(data[0].url);
        setGenerating(false);
        setGeneratingLocal(false);
        setImage(data[0].url);
        resolve(data[0].url);
        // Handle the generated image URLs (data.data contains the images)
      })
      .catch((error) => {
        setGenerating(false);
        setGeneratingLocal(false);
        console.error("There has been a problem with your fetch operation:", error);
        reject(error);
      });
  });
}
