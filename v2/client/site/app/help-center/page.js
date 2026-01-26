import React from 'react'
import './styles/xxl.css'
import logo from "../../public/logo.png"

export default function Page() {
  return (
    <div>
      <header>
        <img
          src={logo.src}
          style={{ height: '100px', width: '100px' }}
          alt="Dorm Deals Logo"
        />

        <div className="input-cnt">
          <input
            type="search"
            placeholder="Search for help topics or questions"
          />
          <button>Search</button>
        </div>

        <h1 style={{ color: '#fff', fontSize: '4vh', fontWeight: '500' }}>
          Dorm Deals Help Center
        </h1>
      </header>

      {/* Overview Section */}
      <section>
        <div className="header">Overview</div>

        <ul className="overview">
          <li className="overview-links">
            <a href="#one">How to buy items on Dorm Deals</a>
          </li>
          <li className="overview-links">
            <a href="#two">How to sell items on Dorm Deals</a>
          </li>
          <li className="overview-links">
            <a href="#three">Delivery options and expected timelines</a>
          </li>
          <li className="overview-links">
            <a href="#four">How to return an item</a>
          </li>
          <li className="overview-links">
            <a href="#five">Reporting a product or listing</a>
          </li>
          <li className="overview-links">
            <a href="#six">Dispute resolution process</a>
          </li>
          <li className="overview-links">
            <a href="#seven">Return and refund policy</a>
          </li>
        </ul>
      </section>

      {/* Content Section */}
      <section className="content">
        <section id="one">
          <div className="sub-header">Buying on Dorm Deals</div>
          <article>
            <p>
              Dorm Deals allows buyers to browse listings posted by verified
              sellers within their campus community. To purchase an item,
              select a product, review the details carefully, and follow the
              checkout process provided on the platform.
            </p>
          </article>
        </section>

        <section id="two">
          <div className="sub-header">Selling on Dorm Deals</div>
          <article>
            <p>
              Sellers can list items by creating a product listing that includes
              accurate descriptions, images, and pricing. Sellers are expected
              to comply with platform guidelines and ensure items listed are
              lawful and accurately represented.
            </p>
          </article>
        </section>

        <section id="three">
          <div className="sub-header">Delivery Options and Timelines</div>
          <article>
            <p>
              Delivery methods may vary depending on the seller and location.
              Estimated delivery timelines will be displayed during checkout.
              Dorm Deals does not guarantee delivery times but works to support
              smooth transactions between buyers and sellers.
            </p>
          </article>
        </section>

        <section id="four">
          <div className="sub-header">Returns and Item Issues</div>
          <article>
            <p>
              If you receive an item that does not match its description or is
              defective, you may request a return according to the seller’s
              stated return conditions and Dorm Deals’ platform policies.
            </p>
          </article>
        </section>

        <section id="five">
          <div className="sub-header">Reporting a Product</div>
          <article>
            <p>
              Users may report listings that appear misleading, prohibited, or
              in violation of platform guidelines. Reported items are reviewed
              to ensure compliance with Dorm Deals policies.
            </p>
          </article>
        </section>

        <section id="six">
          <div className="sub-header">Dispute Resolution</div>
          <article>
            <p>
              In the event of a dispute between buyers and sellers, Dorm Deals
              provides a resolution process aimed at facilitating fair outcomes.
              Users are encouraged to communicate clearly and provide relevant
              information when submitting disputes.
            </p>
          </article>
        </section>

        <section id="seven">
          <div className="sub-header">Return and Refund Policy</div>
          <article>
            <p>
              Return and refund eligibility depends on the seller’s terms and
              applicable platform rules. Refunds, when approved, are processed
              according to the original payment method used.
            </p>
          </article>
        </section>
      </section>
    </div>
  )
}
