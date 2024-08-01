import React from 'react'
import '@/app/seller/new-listing/styles/xx-large.css'

export default function NewListing() {


  return (
    <> 
      <div className="seller-editor">
        <div>
            <b>Add Products</b> here
        </div>
        <hr />

        <div className="seller-editor-cnt">
            
            <section className='item-cnt'>
                <div style={{height: '100%'}}>
                    <div className="input-cnt">
                        <label htmlFor="">Title</label>
                        <textarea placeholder='Write A Product Title Here' name="" id=""> </textarea>
                    </div>

                    <div className="input-cnt">
                        <label htmlFor="">Description (Optional)</label>
                        <textarea placeholder='Write A  Short Description For The Product Here...' name="" id=""> </textarea>
                    </div>
                </div>

                <div className='item-cnt-btm'>
                    <div className="input-cnt">
                        <label htmlFor="">Category</label>
                        <select>
                            <option value=""></option>
                        </select>
                    </div>

                    <div className="input-cnt">
                        <label htmlFor="">Type</label>
                        <select>
                            <option value=""></option>
                        </select>
                    </div>

                    <div className="input-cnt">
                        <label htmlFor="">Gender</label>
                        <select>
                            <option value=""></option>
                        </select>
                    </div>

                    <div className="input-cnt">
                        <label htmlFor="">Sub-Category</label>
                        <select>
                            <option value=""></option>
                        </select>
                    </div>

                    <div className="input-cnt">
                        <label htmlFor="">Size</label>
                        <select>
                            <option value=""></option>
                        </select>
                    </div>

                    <div className="input-cnt">
                        <label htmlFor="">Condition</label>
                        <select>
                            <option value=""></option>
                        </select>
                    </div>

                    <div className="input-cnt">
                        <label htmlFor="">Stock</label>
                        <input type="number" name="" id="" />
                    </div>

                    <div className="input-cnt">
                        <label htmlFor="">Price</label>
                        <input type="number" name="" id="" />
                    </div>
                </div>
            </section>

            <section className='file'>
                <div className=''>
                    <div>
                        <h6>Image Samples</h6>
                    </div>
                </div>
                <div className='file-cnt'>
                    <div className='img-cnt'>
                        <input style={{display: 'none'}} type="file" name="" id="" />
                        <label htmlFor="image0">
                            <div>+</div>
                            <div>Main image</div>
                        </label>
                    </div>
                    <div className='img-cnt'>
                        <input style={{display: 'none'}} type="file" name="" id="image1" />
                        <label htmlFor="image1">
                            <div>+</div>
                            <div>Image</div>
                        </label>
                    </div>
                    <div className='img-cnt'>
                        <input style={{display: 'none'}} type="file" name="" id="image2" />
                        <label htmlFor="image2">
                            <div>+</div>
                            <div>Image</div>
                        </label>
                    </div>
                    <div className='img-cnt'>
                        <input style={{display: 'none'}} type="file" name="" id="image3" />
                        <label htmlFor="image3">
                            <div>+</div>
                            <div>Image</div>
                        </label>
                    </div>
                    <div className='img-cnt'>
                        <input style={{display: 'none'}} type="file" name="" id="image4" />
                        <label htmlFor="image4">
                            <div>+</div>
                            <div>Image</div>
                        </label>
                    </div>
                    <div className='img-cnt'>
                        <input style={{display: 'none'}} type="file" name="" id="image5" />
                        <label htmlFor="image5">
                            <div>+</div>
                            <div>Image</div>
                        </label>
                    </div>
                    <div className='img-cnt'>
                        <input style={{display: 'none'}} type="file" name="" id="image6" />
                        <label htmlFor="image6">
                            <div>+</div>
                            <div>Image</div>
                        </label>
                    </div>

                </div>
            </section>

            
        </div>

        
        <section className="seller-editor-btn-cnt">
            <button>
                Submit
            </button>
        </section>
      </div>
    </>
  )
}
