import Webcam from "react-webcam";
import { useRef, useState, useEffect } from "react";
const App = () => {
  const videoref = useRef(null);
  const photoref = useRef(null);

  const [hasphoto, sethasphoto] = useState(false);

  const getvideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 1920, height: 1080 }
      })
      .then(stream => {
        let video = videoref.current;
        video.srcObject = stream;
        video.play();
      })
      .catch(err => {
        console.error(err);
      })
  }

  const takephoto = () => {
    const width = 414;
    const height = width / (16 / 9);

// let image_address= photoref.current.getScreenshot;
// console.log(image_address);
    

    let video = videoref.current;
    let photo = photoref.current;
    photo.width = width;
    photo.height = height;

    let ctx = photo.getContext('2d');
    ctx.drawImage(video, 0, 0, width, height);
    sethasphoto(true);
    
  }
  const closephoto = () => {
    let photo = photoref.current;
    let ctx = photo.getContext('2d');

    ctx.clearRect(0, 0, photo.width, photo.height);
    
    sethasphoto(false);
  }
  useEffect(() => {
    getvideo();
  }, [videoref]);

  return (
    <>

      <div className="camera">
        <video ref={videoref}></video>
        <button
        // onClick={takephoto} >
          onClick={()=>{takephoto()}} > 
         SNAP!</button>
      </div>

      <div className={'result ' + (hasphoto ? 'hasphoto' : '')}>
        <canvas ref={photoref}></canvas>
        <button onClick={closephoto} >CLOSE!</button>
      </div>

    </>
  )
};
export default App;









// const webref =useRef(null)
// let image_capture = "httpsL;';'";
// const   showimage = () =>{
//  image_capture = console.log(webref.current.getScreenshot());
// }





{/* <p>asdfgh</p>
<Webcam ref={webref }/>
<button onClick={()=>{
  showimage()
}}>show image in console</button> */}