import axios from "axios";
import { useState } from "react";

interface Photo {
  title: string | undefined;
  image: any;
}

function App() {
  const [photo, setPhoto] = useState<Photo>({
    title: "",
    image: null,
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(e);
    const formData = new FormData();
    formData.append("photo", photo.image);

    const response = await axios.post(
      "http://localhost:3000/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response);
  };
  return (
    <div className="App">
      <div className="w-100vw h-100vh flex flex-col items-center">
        <h1 className="mb-4">Sube tu foto a la nube!</h1>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col items-center gap-2"
        >
          <input
            type="file"
            name="photo"
            onChange={(e) => {
              console.log(e);
              setPhoto({
                title: e.target?.files?.[0].name,
                image: e.target?.files?.[0],
              });
              console.log(photo);
            }}
          />
          <button>send</button>
        </form>
      </div>
    </div>
  );
}

export default App;
