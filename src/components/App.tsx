import { useEffect, useState } from "react";
import ImageGallery from "./ImageGallery/ImageGallery";
import {Toaster, toast} from 'react-hot-toast';
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn";
import Loader from "./Loader/Loader";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import SearchBar from "./SearchBar/SearchBar";
import ImageModal from "./ImageModal/ImageModal";

import { fetchPhotos } from "../photos-api";


interface Photo {
  urls: { regular: string };
  alt_description?: string;
}

export default function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [query, setQueries] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [total_pages, setTotalPages] = useState<number>(1);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<{ url: string; alt: string } | null>(null);

  function openModal(photo:Photo) {
    setSelectedImage({url: photo.urls.regular,
                      alt: photo.alt_description || "Image"});
    setIsOpen(true);
  }
 
  function closeModal() {
    setIsOpen(false);
    setSelectedImage(null);
  }
  
  useEffect(() => {if (query.trim() !== '' && photos.length > 0 && page === total_pages) {
    toast.success('You already downloaded all photos');
  } }, [total_pages, page, query, photos.length]);


  useEffect(() => {if (query.trim() === '') return;
    const getData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const { results, total_pages} = await fetchPhotos(query, page);
        setTotalPages(total_pages);
        setPhotos(prev => [...prev, ...results]);      
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally { setIsLoading(false); }
    }; getData();
  }, [query, page]);

  const handleChangeQuery = (query: string) => { setPhotos([]);
    setQueries(query);
    setPage(1);
    toast.success(`Searching for "${query}"`);
  };
  const handleLoadMore = () => {
      setPage(prev => prev + 1);};

	return (
    <div>
      <Toaster/>
      <SearchBar onChangeQuery={handleChangeQuery} />
      {isLoading && <Loader/>}
      {photos.length > 0 && <ImageGallery photos={photos} onPhotoClick={openModal} />}
      {total_pages > page && <LoadMoreBtn handleLoadMore={handleLoadMore} />}
      {isError && query.trim() !== '' && photos.length === 0 && <ErrorMessage />}
      <ImageModal selectedImage={selectedImage} closeModal={closeModal} modalIsOpen={modalIsOpen}   />
     
    </div>
  );
};

