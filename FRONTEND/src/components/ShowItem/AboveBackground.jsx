import ItemCard from "../Shopping/ItemCard/ItemCard";

export default function AboveBackground() {
  const helloWorldArray = [];
  // Create only one ItemCard instead of nine
  helloWorldArray.push(<ItemCard key={1} name={1} />);

  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-md-3 g-3">
        {helloWorldArray.map((item, index) => (
          <div className="col" key={index}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
