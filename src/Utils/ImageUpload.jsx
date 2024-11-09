import { BsCamera } from 'react-icons/bs';

const ImageUpload = ({ selectedImage, setSelectedImage, label }) => {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
    }
  };

  return (
    <div className="flex justify-center items-center col-span-1">
      <div
        style={{
          width: '150px',
          height: '150px',
          borderRadius: '50%',
        }}
        className="rounded-full flex items-center justify-between border-dashed border-2"
      >
        {selectedImage ? (
          <label htmlFor="upload" className="mx-auto">
            <img
              style={{
                width: '130px',
                height: '130px',
                borderRadius: '50%',
              }}
              className="mx-auto my-auto object-cover cursor-pointer"
              src={selectedImage}
              alt=""
            />
            <input
              id="upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        ) : (
          <label
            or="upload"
            id="image-preview"
            className="max-w-xs  bg-[#f0f0f0] border-gray-400 items-center mx-auto text-center cursor-pointer justify-center flex text-gray-500"
            style={{
              width: '130px',
              height: '130px',
              borderRadius: '50%',
            }}
          >
            <input id="upload" type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
            <label htmlFor="upload" className="cursor-pointer flex flex-col items-center">
              <BsCamera size={30} />
              <h5 className="mb-2 text-lg font-medium tracking-tight text-gray-500">
                {label}
              </h5>
              <span id="filename" className="text-gray-500 bg-gray-200 z-50"></span>
            </label>
          </label>
        )}
      </div>
    </div>
  );
};

export default ImageUpload
