import React from 'react'
import '@/app/seller/listing/styles/xx-large.css'

export default function Listing() {
  return (
    <>
      <div className="seller-listing">
        <div>
            <b>Manage your products</b> here
        </div>
        <hr />
        <div className="seller-listing-cnt">
            <header>
                
                <div>
                    Posted Aug 30, 2024
                </div>
                <div>
                    Active
                </div>
            </header>
            <section>
                <ul>
                    <li>

                        <div className="top">
                            <div className="product-thumbnail"></div>
                            <div className="product-title">
                                
                            </div>
                            <div className="product-price"></div>
                        </div>

                        <div className="btm">
                            <div className="product-stock">
                                20 in stock
                            </div>
                            |
                            <div className="product-orders">
                                12 orders placed
                            </div>
                            |
                            <div className="product-views">
                                36 Views
                            </div>
                            |
                            <div className="product-reviews">
                                123 reviews
                            </div>
                        </div>

                    </li>
                </ul>
            </section>
            <footer>

            </footer>
        </div>
      </div>
    </>
  )
}
