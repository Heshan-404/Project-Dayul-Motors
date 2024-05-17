import logo from "../../assets/Project Images/Dayul Motors/Dayul Motors logo/Artboard 1.png";
import callIcon from "../../assets/Project Images/Dayul Motors/HomePage/phone-call.png";
import emailIcon from "../../assets/Project Images/Dayul Motors/HomePage/email.png";
import faceBookIcon from "../../assets/Project Images/Dayul Motors/HomePage/facebook.png";

export default function Footer() {
  return (
    <footer className="footer" style={{ backgroundColor: "#141313" }}>
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-sm-12 mb-4">
            <a
              href="/"
              className="d-flex align-items-center mb-3 link-body-emphasis text-decoration-none"
            >
              <img src={logo} alt="" width={"100px"} />
              <div className="fs-2 text-white ms-3 ms-md-5">Dayul Motors</div>
            </a>
            <p className="text-white mb-3">
              For business inquiries, contact us.
            </p>
            <ul className="list-unstyled">
              <li className="mb-2">
                <img src={callIcon} width={"20px"} alt="" />
                <span className="ms-2 text-white">077-777-7777</span>
              </li>
              <li className="mb-2">
                <img src={emailIcon} width={"20px"} alt="" />
                <a
                  className="ms-2 text-white"
                  href="mailto:dayul.motors@gmail.com"
                >
                  dayul.motors@gmail.com
                </a>
              </li>
              <li className="mb-2">
                <img src={callIcon} width={"20px"} alt="" />
                <span className="ms-2 text-white">No:43 Galle Road</span>
              </li>
              <li>
                <img src={faceBookIcon} width={"20px"} alt="" />
                <a
                  className="ms-2 text-white"
                  href="https://facebook.com/dayul_motors"
                >
                  Dayul_Motors
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-2 col-sm-6 d-none d-md-block mb-4">
            {" "}
            {/* Hide on sm screens */}
            <h5 className="fw-bold fs-3 text-white">Brands</h5>
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

          <div className="col-md-2 col-sm-6 d-none d-md-block mb-4">
            {" "}
            {/* Hide on sm screens */}
            <h5 className="fw-bold fs-3 text-white">Categories</h5>
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

          <div className="col-md-4 col-sm-12 mb-4">
            <h5 className="fw-bold fs-3 text-white">Links</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <a href="/home" className="nav-link p-0 text-white">
                  Home
                </a>
              </li>
              <li className="nav-item mb-2">
                <a href="/Sign-in" className="nav-link p-0 text-white">
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
        </div>

        <div className="row mt-5">
          <div className="col text-center">
            <p className="text-white mb-0">
              © {new Date().getFullYear()} Dayul Motors. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .footer {
          padding: 50px 0;
        }

        .footer a {
          transition: color 0.3s ease;
        }

        .footer a:hover {
          color: #ffd700; /* Gold yellow color */
        }

        @media (max-width: 768px) {
          .col-md-4,
          .col-md-2 {
            flex: 0 0 100%;
            max-width: 100%;
          }

          .mb-4 {
            margin-bottom: 20px;
          }

          /* Hide Brands and Categories on sm screens */
          .d-none {
            display: none;
          }
          .d-md-block {
            display: block;
          }
        }
      `}</style>
    </footer>
  );
}
