import logo from "../../assets/Project Images/Dayul Motors/Dayul Motors logo/Artboard 1.png";
import callIcon from "../../assets/Project Images/Dayul Motors/HomePage/phone-call.png";
import emailIcon from "../../assets/Project Images/Dayul Motors/HomePage/email.png";
import faceBookIcon from "../../assets/Project Images/Dayul Motors/HomePage/facebook.png";
export default function Footer() {
  return (
    <>
      <div
        className="ms-4 me-4 ps-5 pe-5 pt-5"
        style={{ backgroundColor: "#141313" }}
      >
        <footer className="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 border-top">
          <div className="col mb-3">
            <a
              href="/"
              className="d-flex align-items-center mb-3 link-body-emphasis text-decoration-none"
            >
              <img src={logo} alt="" width={"100px"} />
              <div className="fs-2 text-white ms-5">Dayul Motors</div>
            </a>
            <p className="text-white">For business inquiries, contact us.</p>
            <div className="mb-3">
              <img src={callIcon} width={"20px"} alt="" />{" "}
              <span className="m-3 text-white">077-777-7777</span>
            </div>
            <div className="mb-3">
              <img src={emailIcon} width={"20px"} alt="" />{" "}
              <a
                className="m-3 text-white"
                href="mailto:dayul.motors@gmail.com"
              >
                dayul.motors@gmail.com
              </a>
            </div>
            <div className="mb-3">
              <img src={callIcon} width={"20px"} alt="" />{" "}
              <span className="m-3 text-white">No:43 Galle Road</span>
            </div>
            <div className="mb-3">
              <img src={faceBookIcon} width={"20px"} alt="" />{" "}
              <a
                className="m-3 text-white"
                href="https://facebook.com/dayul_motors"
              >
                Dayul_Motors
              </a>
            </div>
          </div>

          <div className="col mb-3"></div>

          <div className="col mb-3">
            <h5 className="fw-bold fs-3" style={{ color: "#6DFF85" }}>
              Brands
            </h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-white">
                  Home
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-white">
                  Features
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-white">
                  Pricing
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-white">
                  FAQs
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-white">
                  About
                </a>
              </li>
            </ul>
          </div>

          <div className="col mb-3">
            <h5 className="fw-bold fs-3" style={{ color: "#6DFF85" }}>
              Categories
            </h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-white">
                  Home
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-white">
                  Features
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-white">
                  Pricing
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-white">
                  FAQs
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 text-white">
                  About
                </a>
              </li>
            </ul>
          </div>

          <div className="col mb-3">
            <h5 className="fw-bold fs-3" style={{ color: "#6DFF85" }}>
              Links
            </h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="/home" className="nav-link p-0 text-white">
                  Home
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="/Sing-in" className="nav-link p-0 text-white">
                  Sign-in
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="/Sign-up" className="nav-link p-0 text-white">
                  Sign-up
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="/shop" className="nav-link p-0 text-white">
                  Shop
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="/Contact-Us" className="nav-link p-0 text-white">
                  Contact US
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="/cart" className="nav-link p-0 text-white">
                  Cart
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </>
  );
}
