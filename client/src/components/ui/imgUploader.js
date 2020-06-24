import React, { useEffect, useState } from 'react';
import { storage } from '../../firebase';

function ImgUploader(props) {
    const [imageAsFile,setImgAsFile] = useState(null);

    useEffect(()=>{
        console.log("UseEffect: ", imageAsFile);
    },[imageAsFile])

    const uploadHandler = function(){
        storage.child(Date.now()+imageAsFile.name).put(imageAsFile).then(async function(snapshot) {

            await snapshot.ref.getDownloadURL().then(function(downloadURL) {
                console.log(downloadURL,"HERE");
                
                props.update(downloadURL);
                props.cancel();
            });
    }).catch(Err=>{
        console.log(Err);
    })}

    return (
        <React.Fragment>
             <div className="backdropAlert"></div>
             <div className="custAlert shadow">
                 <div className="p-5">
                     <h4 className="mb-4" >Upload Image</h4>

                    {imageAsFile?
                    <div className="mb-2">
                        <img src={URL.createObjectURL(imageAsFile)} style={{width:"100px",border:"1px solid #888",padding:"10px"}}  />
                    </div>:null}
                 <div className="custom-file">
                    <input type="file" accept="image/*" className="custom-file-input" onChange={(e)=>setImgAsFile(e.target.files[0])} id="customFile"/>
                    <label className="custom-file-label" for="customFile">Upload File</label>
                    </div>
                 </div>
                 <div className="mb-3" >
                    <button className="splBtn btn btn-outline-cancel mr-2" onClick={props.cancel}> Cancel </button>
                    <button className="splBtn btn btn-outline-grad mr-2" onClick={uploadHandler}> Upload </button>
                 </div>
                 
             </div>
        </React.Fragment>
    )
}



export default ImgUploader;
