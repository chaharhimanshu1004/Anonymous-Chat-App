
import './App.css';
import { useState } from 'react';
import {  useSelector } from 'react-redux'
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import { selectUser,setUserImage } from './slices/userSlice'
import Login from './components/Login';
import { login } from './slices/userSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Modal from './components/Modal';
import Image1 from './images/hacker1.avif'
import Image2 from './images/hacker2.jpeg'
import Image3 from './images/hacker3.jpeg'
import Image4 from './images/hacker4.jpeg'




function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);

  const imageOptions = [Image1, Image2, Image3, Image4];

  useEffect(() => {
    // Check if user information is stored in local storage
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      // Parse the stored user information and dispatch the login action
      const parsedUser = JSON.parse(storedUser);
      dispatch(login({ name: parsedUser.username, uid: parsedUser.userID }));
    }
  }, [dispatch]);



  const handleImageSelect = (imageUrl) => {
    // Set the selected image URL in user component state
    dispatch(setUserImage({ userId: user.uid, imageUrl }));
    // Close the modal
    setModalOpen(false);
  };

  const renderModal = () => {
    return (
      <Modal closeModal={() => setModalOpen(false)}>
        <h2>Select an Image</h2>
        <div className="image-options">
          {imageOptions.map((imageUrl, index) => (
            <img key={index} src={imageUrl} alt={`Image ${index + 1}`} onClick={() => handleImageSelect(imageUrl)} />
          ))}
        </div>
      </Modal>
    );
  };

  


  return (
    
    <div  className='app'>
      {
        user?(
          <>
          <Sidebar/>
          <Chat/>
          </>
        ):(
          <h2><Login/></h2>
        )
      }
      {/* {!user?.imageUrl && modalOpen && renderModal()} */}
      {modalOpen && renderModal()}
      

    </div>
  );
}

export default App;
