import ItemCard from "../ItemCard/ItemCard";

export default function Background() {
  const helloWorldArray = [];
  for (let i = 0; i < 9; i++) {
    helloWorldArray.push(<ItemCard key={i} name={i} />);
  }
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
