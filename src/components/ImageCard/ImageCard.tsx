import css from "./ImageCard.module.css";


interface ImageCardProps {
  imageUrl: string;
  description: string;
  onClick?: () => void; 
}

const ImageCard: React.FC<ImageCardProps> = ({ imageUrl, description, onClick }) => {
  return (
    <div onClick={onClick}><img className={css.imageCard} src={imageUrl} alt={description}/></div>
  )
}

export default ImageCard

