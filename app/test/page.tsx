import RecentActivities from "../components/RecentEvents";


export default function Home() {
  
  // const handleSubmit = async (e:any) => {
  //   e.preventDefault();
  //   const response = await fetch('/api/test', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ text: post }),
  //   });
  //   const data = await response.json();
  //   setResult(data.result);
  // };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex items-center justify-center p-5">
    {/* <div className="bg-gray-800 shadow-lg rounded-lg p-8  w-full">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-100">Content Testing</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-4 border border-gray-700 rounded-lg mb-4 bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={post}
          onChange={(e) => setPost(e.target.value)}
          placeholder="Write your post here..."
        />
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Submit
        </button>
      </form>
      {result && (
        <p className={`mt-4 p-4 rounded-lg ${result === 'inappropriate' ? 'bg-red-500 text-red-100' : 'bg-green-500 text-green-100'}`}>
          Moderation Result: {result}
        </p>
      )} */}
      <div className='flex flex-col gap-4'>
        {/* <input type='file' onChange={(e)=>{
          setFile(e.target.files?.[0])
        }} />
        <div className='h-[8px] w-44 border rounded overflow-hidden'>
          <div className='h-full bg-white transition-all duration-200'
          style={{
            width: `${progress}%`
          }}
          >
          </div>
        </div>
        <button className='bg-white text-black p-5 rounded' onClick={ async ()=>{
          if(file){
            const res = await edgestore.publicFiles.upload({
              file,
              onProgressChange: (progress) => {
                setProgress(progress)
              }
            })
            setUrls({
              url: res.url,
              thumbnailUrl: res.thumbnailUrl
            })
          }
          
        }}>
        </button>
        <div className='mt-10 text-green-500 flex flex-col gap-6'>
          {urls?.url && <Link href={urls.url} target='_blank'>{urls.url}</Link>}
          {urls?.thumbnailUrl && <Link href={urls.thumbnailUrl} target='_blank'>{urls.thumbnailUrl}</Link>}
        </div> */}
        <RecentActivities />
      </div>
    </div>
  
  );
}
