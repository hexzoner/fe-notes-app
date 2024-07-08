const voiceUrl = `https://gen-ai-wbs-consumer-api.onrender.com/api/v1/audio/speech`;
const AI_MODE = "production";

export default async function textToSpeech(message, audioRef) {
  // const ref = document.createElement("audio");
  const ref = audioRef;
  // document.querySelector("body").appendChild(ref);
  // setAudioRef(ref);
  try {
    if (!prompt) throw new Error("Prompt is required");
    const res = await fetch(voiceUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json ",
        Authorization: "c9y7k5aewfsbd7skbofped",
        provider: "open-ai",
        mode: AI_MODE,
      },
      body: JSON.stringify({
        model: "tts-1",
        voice: "nova",
        input: message,
      }),
    });
    if (!res.ok) throw new Error(await res.json());
    // Create a new MediaSource and set the audio source to the URL
    const mediaSource = new MediaSource();

    // ref.setAttribute("src", URL.createObjectURL(mediaSource));
    ref.src = URL.createObjectURL(mediaSource);

    // Add an event listener to the MediaSource to handle the sourceopen event
    mediaSource.addEventListener("sourceopen", async () => {
      // Create a new SourceBuffer and set the MIME type to audio/mpeg
      const sourceBuffer = mediaSource.addSourceBuffer("audio/mpeg");
      // Get the reader from the response body
      const reader = res.body.getReader();
      // Create a queue to store the chunks of data. This is because appendBuffer can only be called when the source buffer is not updating
      const queue = [];
      // Create a function to process the queue
      const processQueue = () => {
        // If the source buffer is not updating and the queue is not empty
        if (!sourceBuffer.updating && queue.length > 0) {
          // Shift the first chunk from the queue
          const chunk = queue.shift();
          // Append the chunk to the source buffer
          sourceBuffer.appendBuffer(chunk);
        }
      };
      // After the updateend event is fired, check the queue
      sourceBuffer.addEventListener("updateend", () => processQueue());

      let result;
      // While the reader is not done
      while (!(result = await reader.read()).done) {
        // If the result is done, end the stream
        if (result.done) return mediaSource.endOfStream();
        // Push the next chunk to the queue
        queue.push(result.value);
        // Process the queue
        processQueue();
      }
    });
    // Play the audio
    // ref.current.play();
    ref.play();
  } catch (error) {
    console.error(error);
  }
}
