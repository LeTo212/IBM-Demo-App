import "./GifsList.css";

const Gif = ({ alt, url }) => {
  return (
    <div className="gif-item">
      <img alt={alt} src={url} />
    </div>
  );
};

const GifsList = ({ gifs }) => {
  const items = gifs.map((itemData) => {
    return (
      <Gif
        key={itemData.id}
        alt={itemData.title}
        url={itemData.images.original.url}
      />
    );
  });
  return <div className="gifs-container">{items}</div>;
};

export default GifsList;
