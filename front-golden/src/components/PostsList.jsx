import { useEffect, useState } from 'react';
import data from '../data/dataPost.json';
import Modal from './Modal';

const PostsList = () => {
   const [posts, setPosts] = useState([]);
   const [searchText, setSearchText] = useState('');
   const [modal, setModal] = useState(false);
   const [selectedPost, setSelectedPost] = useState({});
   const [animarModal, setAnimarModal] = useState(false);

   useEffect(() => {
      const fetchPosts = () => {
         if (Array.isArray(data.data)) {
            setPosts(data.data);
         } else {
            console.error('Error en el array');
            setPosts([]);
         }
      };

      fetchPosts();
   }, []);

   const filteredPosts = posts.filter((post) =>
      post.text.toLowerCase().includes(searchText.toLowerCase())
   );

   const handlePostActive = (post) => {
      setSelectedPost(post);
      setModal(true);
      setTimeout(() => {
         setAnimarModal(true);
      }, 500);
   };

   const closeModal = () => {
      setAnimarModal(false);
      setTimeout(() => {
         setModal(false);
      }, 500);
   };

   return (
      <div className="space-y-8">
         <h1 className="text-3xl font-bold text-center uppercase my-4">
            Listado de Publicaciones Golden
         </h1>

         <div className="text-center mb-6">
            <input
               type="text"
               placeholder="Buscar publicaciones, según texto"
               value={searchText}
               onChange={(e) => setSearchText(e.target.value)}
               className="p-2 border border-gray-300 rounded-lg w-1/2"
            />
         </div>

         <div className="container mx-auto px-16 space-y-8">
            {filteredPosts.length === 0 ? (
               <p className="text-center text-lg text-gray-500">
                  No se encontraron resultados.
               </p>
            ) : (
               filteredPosts.map((post) => (
                  <div
                     key={post.id}
                     className="space-y-2 relative bg-gray-100 p-6 rounded-lg shadow-lg"
                  >
                     <button
                        onClick={() => handlePostActive(post)}
                        className="absolute -top-5 -left-5 text-white uppercase font-bold bg-orange-400 w-12 h-12 rounded-full flex items-center justify-center"
                     >
                        +
                     </button>
                     <p className="text-xl font-bold pt-5">{post.text}</p>
                     <p className="text-gray-600">
                        Publicado por{' '}
                        <span className="font-bold">{post.name}</span> el{' '}
                        {new Date(post.date).toLocaleString()}
                     </p>
                     <p className="font-black text-2xl text-indigo-700">
                        {post.likes + post.comments + post.shares}{' '}
                        <span className="text-gray-700 text-xl">
                           Interacciones
                        </span>
                     </p>
                  </div>
               ))
            )}
         </div>

         {modal && (
            <Modal
               setModal={setModal}
               animarModal={animarModal}
               setAnimarModal={setAnimarModal}
               selectedPost={selectedPost}
               closeModal={closeModal}
            />
         )}
      </div>
   );
};

export default PostsList;
