import { useEffect } from 'react';
import CerrarBtn from '../img/cerrar.svg';

const Modal = ({ animarModal, setAnimarModal, selectedPost, closeModal }) => {
   useEffect(() => {
      setAnimarModal(true);
   }, [selectedPost]);

   return (
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center z-10">
         <div className="absolute top-4 right-4">
            <img
               src={CerrarBtn}
               alt="cerrar modal"
               className="cursor-pointer w-8 h-8"
               onClick={closeModal}
            />
         </div>

         <div
            className={`bg-white p-6 rounded-lg shadow-lg max-w-lg w-full ${
               animarModal ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
            } transition-all duration-300 ease-in-out`}
         >
            <h2 className="text-2xl font-semibold text-center">
               {selectedPost.text}
            </h2>
            <p className="text-lg mt-2">
               <strong>Publicado por:</strong> {selectedPost.name}
            </p>
            <p className="text-sm text-gray-500">
               <strong>Fecha:</strong>{' '}
               {new Date(selectedPost.date).toLocaleString()}
            </p>
            <p className="mt-4">
               <strong>Interacciones:</strong>{' '}
               {selectedPost.likes +
                  selectedPost.comments +
                  selectedPost.shares}
            </p>
            <p className="mt-2">{selectedPost.description}</p>
         </div>
      </div>
   );
};

export default Modal;
