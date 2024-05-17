import ItemCard from "../ItemCard/ItemCard";
import image from "../../../assets/Project Images/Dayul Motors/Categories/Bearing.jpg";

export default function Background(props) {
  const itemData = [
    {
      id: "1",
      name: "Bearing",
      desc: "High-quality bearings for smooth operation",
      price: 3000,
      image: image,
      availableQuantity: 15,
      category: "ABC",
    },
    {
      id: "2",
      name: "Spark Plug",
      desc: "Reliable spark plugs for optimal ignition",
      price: 1500,
      image: image,
      availableQuantity: 20,
      category: "ABC",
    },
    {
      id: "3",
      name: "Oil Filter",
      desc: "Premium oil filters for engine protection",
      price: 800,
      image: image,
      availableQuantity: 10,
      category: "Engine Parts",
    },
    {
      id: "4",
      name: "Motorcycle Helmet",
      desc: "Stylish and safe motorcycle helmet",
      price: 5000,
      image: image,
      availableQuantity: 12,
      category: "Safety Gear",
    },
    {
      id: "5",
      name: "Motorcycle Jacket",
      desc: "Protective and comfortable motorcycle jacket",
      price: 3500,
      image: image,
      availableQuantity: 15,
      category: "Safety Gear",
    },
    {
      id: "6",
      name: "Motorcycle Gloves",
      desc: "Durable and grippy motorcycle gloves",
      price: 1200,
      image: image,
      availableQuantity: 15,
      category: "Safety Gear",
    },
    {
      id: "7",
      name: "Motorcycle Gloves",
      desc: "Durable and grippy motorcycle gloves",
      price: 1200,
      image: image,
      availableQuantity: 15,
      category: "Safety Gear",
    },
    // Add more items as needed...
  ];

  var noCategory;
  if (props.cat === undefined) {
    noCategory = true;
  } else {
    noCategory = false;
  }

  var countSameCategory = 0;
  itemData.map((item, index) => (
    <>
      {!noCategory && <>{item.category == props.cat && countSameCategory++}</>}
    </>
  ));
  return (
    <>
      {noCategory && (
        <div className="container" style={{ marginBottom: "200px" }}>
          <div className="row row-cols-1 row-cols-md-3 g-3">
            {itemData.map((item, index) => (
              <div className="col" key={index}>
                <ItemCard
                  id={item.id}
                  name={item.name}
                  desc={item.desc}
                  price={item.price}
                  image={item.image} // Pass the image prop
                />
              </div>
            ))}
          </div>
        </div>
      )}
      {!noCategory && (
        <div className="container" style={{ marginBottom: "200px" }}>
          <div className="row row-cols-1 row-cols-md-3 g-3">
            {itemData.map((item, index) => (
              <div className="col" key={index}>
                {countSameCategory > 3 && (
                  <>
                    {item.category == props.cat && (
                      <>
                        {item.id != props.id && (
                          <>
                            <ItemCard
                              id={item.id}
                              name={item.name}
                              desc={item.desc}
                              price={item.price}
                              image={item.image} // Pass the image prop
                            />
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
                {countSameCategory <= 3 && (
                  <div className="col" key={index}>
                    <ItemCard
                      id={item.id}
                      name={item.name}
                      desc={item.desc}
                      price={item.price}
                      image={item.image} // Pass the image prop
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
