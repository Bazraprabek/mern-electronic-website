export const byteImage = (image) => {
  const uint8Array = new Uint8Array(image);

  // Convert the Uint8Array to a base64 string
  const bufferData = btoa(String.fromCharCode.apply(null, uint8Array));
  const imageUrl = `data:image/jpeg;base64,${bufferData}`;
  return imageUrl;
};
