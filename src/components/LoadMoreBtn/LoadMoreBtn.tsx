import css from "./LoadMoreBtn.module.css"

interface LoadMoreBtnProps {
  handleLoadMore: () => void;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ handleLoadMore }) => {
   
  return (
      <div className={css.loadMoreButtonContainer}>
          <button className={css.loadMoreButton} onClick={handleLoadMore}>Load more</button>
      </div>
  )
}

export default LoadMoreBtn