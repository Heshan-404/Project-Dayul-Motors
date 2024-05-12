import brandOneIcon from "../../../assets/Project Images/Dayul Motors/Brands/Edited/Bajaj.jpg";
import brandTwoIcon from "../../../assets/Project Images/Dayul Motors/Brands/Edited/Nachi.jpg";
export default function CardSet() {
  return (
    <div className="container ps-5 flex-column">
      <div className="row">
        <div className="col-md-3 col-sm-6 ps-md-4 pe-md-4 pt-sm-4 pb-sm-4 ps-sm-4 pe-sm-4">
          <div className="card" style={{ width: "250px", height: "" }}>
            <div className="row align-items-center ">
              <div className="col-6">
                <img src={brandOneIcon} alt="" width={"120px"} />
              </div>
              <div className="col-6">
                <h2>BAJAJ</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-6 ps-md-4 pe-md-4 pt-sm-4 pb-sm-4 ps-sm-4 pe-sm-4">
          <div className="card" style={{ width: "250px", height: "" }}>
            <div className="row align-items-center ">
              <div className="col-6">
                <img src={brandTwoIcon} alt="" width={"120px"} />
              </div>
              <div className="col-6">
                <h2>Nachi</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-6 ps-md-4 pe-md-4 pt-sm-4 pb-sm-4 ps-sm-4 pe-sm-4">
          <div className="card" style={{ width: "250px", height: "" }}>
            <div className="row align-items-center ">
              <div className="col-6">
                <img src={brandOneIcon} alt="" width={"120px"} />
              </div>
              <div className="col-6">
                <h2>BAJAJ</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-6 ps-md-4 pe-md-4 pt-sm-4 pb-sm-4 ps-sm-4 pe-sm-4">
          <div className="card" style={{ width: "250px", height: "" }}>
            <div className="row align-items-center ">
              <div className="col-6">
                <img src={brandTwoIcon} alt="" width={"120px"} />
              </div>
              <div className="col-6">
                <h2>Nachi</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
