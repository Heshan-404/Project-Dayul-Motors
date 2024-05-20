import ItemCard from "../ItemCard/ItemCard";
import image from "../../../assets/Project Images/Dayul Motors/Categories/Bearing.jpg";

export default function Background(props) {
  const itemData = [
    {
      id: "1",
      name: "Bearing",
      brand: "Bajaj",
      desc: "High-quality bearings for smooth operation",
      price: 3000,
      image: image,
      availableQuantity: 15,
      category: "ABC",
    },
    {
      id: "2",
      name: "Spark Plug",
      brand: "Bajaj",
      desc: "Reliable spark plugs for optimal ignition",
      price: 1500,
      image: image,
      availableQuantity: 20,
      category: "ABC",
    },
    {
      id: "3",
      name: "Oil Filter",
      brand: "Bajaj",
      desc: "Premium oil filters for engine protection",
      price: 800,
      image: image,
      availableQuantity: 10,
      category: "Engine Parts",
    },
    {
      id: "4",
      name: "Motorcycle Helmet",
      brand: "Bajaj",
      desc: "Safe motorcycle helmet",
      price: 5000,
      image: image,
      availableQuantity: 12,
      category: "Safety Gear",
    },
    {
      id: "5",
      name: "Motorcycle Jacket",
      brand: "Bajaj",
      desc: "Protective and comfortable motorcycle jacket",
      price: 3500,
      image: image,
      availableQuantity: 15,
      category: "Safety Gear",
    },
    {
      id: "6",
      name: "Motorcycle Gloves",
      brand: "Bajaj",
      desc: "Durable and grippy motorcycle gloves",
      price: 1200,
      image: image,
      availableQuantity: 15,
      category: "Safety Gear",
    },
    {
      id: "7",
      name: "Motorcycle Gloves",
      brand: "NOK",
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
        <div
          className="container"
          style={{ marginBottom: "200px", marginLeft: "250px", margin: "1px" }}
        >
          <div className="row row-cols-2 row-cols-md-4 g-4">
            {itemData.map((item, index) => (
              <div className="col" key={index}>
                <ItemCard
                  id={item.id}
                  name={item.name}
                  brand={item.brand}
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
        <div className="container" style={{ marginBottom: "400px" }}>
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
                              brand={item.brand}
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
                      brand={item.brand}
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
