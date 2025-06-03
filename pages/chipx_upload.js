
export default function ChipxUpload() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-green-600 text-white">
      <div className="bg-white bg-opacity-10 p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4">.chipx Module Upload</h1>
        <input className="p-2 rounded text-black mb-2" type="file" />
        <button
          className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded"
          onClick={() => alert('Simulated .chipx file upload!')}
        >
          Upload .chipx Module
        </button>
      </div>
    </main>
  );
}
