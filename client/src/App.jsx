import { useState } from "react";

const App = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://localhost:7777/profile", {
        method: "POST",
        body: formData,
        // Don't set Content-Type header - the browser will automatically
        // set it to multipart/form-data with the correct boundary
      });

      const result = await response.text();
      console.log(result);
      alert("File uploaded successfully!");
    } catch (err) {
      console.error("Error uploading file:", err);
      alert("Error uploading file");
    }
  };

  return (
    <div>
      <h2>Upload Image</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" name="image" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      <h1>hefsjnfjsdnjsndlvsndv</h1>
    </div>
  );
};
export default App;
