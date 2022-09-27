import "./GifsGallery.css";

const Gif = ({ alt, url }) => (
  <div className="gifs-gallery-item">
    <img alt={alt} src={url} />
  </div>
);

const GifsGallery = ({ gifs }) => {
  const items = gifs.map((itemData) => {
    return (
      <Gif
        key={itemData.id}
        alt={itemData.title}
        url={itemData.images.original.url}
      />
    );
  });
  return <div className="gifs-gallery">{items}</div>;
};

export default GifsGallery;
