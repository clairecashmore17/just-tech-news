const uploader = new Uploader({
  // Get production API keys from Upload.io
  apiKey: "public_FW25au47S9ruZD1ciduXmCQcMLHc",
});
const imgUrl = "";

function uploadImage() {
  uploader
    .open({
      multi: false,
      mimeTypes: ["image/jpeg", "image/png", "image/webp"],
      // editor: {
      //   images: {
      //     cropShape: "circ", // "rect" also supported.
      //     cropRatio: 1 / 1, // "1" is enforced for "circ".
      //   },
      // },
    })
    .then(
      (files) => console.log(files),
      alert(
        files.length === 0
          ? "No image selected!"
          : `Image uploaded!\n\n${files.map((x) => x.fileUrl).join("\n")}`
      ),

      (error) => alert(error)
    );
}

document.querySelector("#upload-btn").addEventListener("click", uploadFiles);
