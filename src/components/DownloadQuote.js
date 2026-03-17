import html2canvas from "html2canvas";

export const downloadQuote = async (previewRef) => {
  const canvas = await html2canvas(previewRef.current);

  const image = canvas.toDataURL("image/jpeg");

  const link = document.createElement("a");
  link.href = image;
  link.download = "quote.png";
  link.click();
};
